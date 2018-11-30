import { filter, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { HazelineTutorialSectionStatuses } from './enums/tutorial-section-statuses.enum';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';
import { HazelineTutorialSection } from './interfaces/tutorial-section.interface';

import { HazelineElementManager } from './element-manager.core';
import { HazelineOverlayRenderer } from './overlay-renderer.core';
import { HazelineLightboxRenderer } from './lightbox-renderer.core';
import { HazelineOptions } from './interfaces/hazeline-options.interface';

export class HazelineRunner {

    private lightbox: HazelineLightboxRenderer;
    private elementManager: HazelineElementManager;
    private overlayRenderer: HazelineOverlayRenderer;
    private _$sectionStatus = new BehaviorSubject<HazelineTutorialSectionStatus>(null);

    private currentSectionStepIdx = 0;
    private currentSection: HazelineTutorialSection;

    private windowResizeEvtListener = () => {
        const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStepIdx].elementSelector);
        if (this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
            this.lightbox.updateTextualOverlayPlacement();
        } else {
            this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            this.lightbox.updateLightboxPlacement(HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStepIdx].elementSelector));
        }
    };

    private windowScrollEvtListener = () => {
        const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStepIdx].elementSelector);
        if (this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
            this.lightbox.updateTextualOverlayPlacement();
        } else {
            this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            this.lightbox.updateLightboxPlacement(HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStepIdx].elementSelector));
        }
    };

    public constructor(
        lightbox: HazelineLightboxRenderer,
        renderer: HazelineOverlayRenderer,
        elementManager: HazelineElementManager
    ) {
        this.lightbox = lightbox;
        this.overlayRenderer = renderer;
        this.elementManager = elementManager;
        this.startNextPrevButtonClicks();
    }

    public endTutorial(): void {
        this.lightbox.dispose(true);
        this.overlayRenderer.dispose();
        this.lightbox.disposeTextualOverlay(true);
        window.removeEventListener('resize', this.windowResizeEvtListener);
        window.removeEventListener('scroll', this.windowScrollEvtListener);
    }

    public runSection(section: HazelineTutorialSection): Observable<HazelineTutorialSectionStatus> {
        this.currentSection = section;
        if (!this.currentSection) {
            this._$sectionStatus.next({
                status: HazelineTutorialSectionStatuses.errored,
                runningSection: section,
                runningStepInSection: null
            });

            return this._$sectionStatus;
        }

        const isFirstStep = this.currentSectionStepIdx === 0;
        const isLastStep = (section.steps.length - 1) === this.currentSectionStepIdx;
        const thisStepUsesTextualOverlay = this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox;
        const previousStepUsedTextualOverlay = this.currentSectionStepIdx === 0
            ? false
            : this.currentSection.steps[this.currentSectionStepIdx - 1].useOverlayInsteadOfLightbox

        this.applyCustomOptionsIfAny(section.globalOptions);
        this.applyCustomOptionsIfAny(this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions, true);

        const wrapElementsDimensions = this.elementManager
            .getWrappingElementsDimensions(section.steps[this.currentSectionStepIdx].elementSelector);

        if (!isFirstStep && !thisStepUsesTextualOverlay) {
            if (previousStepUsedTextualOverlay) {
                this.lightbox.disposeTextualOverlay();
                this.overlayRenderer.wrapElement(wrapElementsDimensions);
            } else {
                this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            }
        }

        if (thisStepUsesTextualOverlay) {
            if (!previousStepUsedTextualOverlay) {
                this.overlayRenderer.dispose();
            };

            const sub = this.lightbox
                .placeTextOverlay(this.currentSection.steps[this.currentSectionStepIdx], isLastStep)
                .subscribe(() => sub.unsubscribe());
        } else {
            this.lightbox.placeLightbox(
                HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStepIdx].elementSelector),
                section.steps[this.currentSectionStepIdx],
                isLastStep);
        }

        this._$sectionStatus.next({
            runningSection: section,
            status: HazelineTutorialSectionStatuses.started,
            runningStepInSection: section.steps[this.currentSectionStepIdx]
        });

        this.startResponsiveListeners();
        this.overlayRenderer.placeEndTutorialButton();
        return this._$sectionStatus;
    }

    private applyCustomOptionsIfAny(options: HazelineOptions, isDynamicOptions = false): void {
        if (!options) {
            return;
        }

        if (options.lightbox && isDynamicOptions) {
            this.lightbox.setLightboxDynamicOptions(options.lightbox);
        }
        if (options.lightbox && !isDynamicOptions) {
            this.lightbox.setLightboxGlobalOptions(options.lightbox);
        }
        if (options.textualOverlay && isDynamicOptions) {
            this.lightbox.setTextualOverlayDynamicOptions(options.textualOverlay);
        }
        if (options.textualOverlay && !isDynamicOptions) {
            this.lightbox.setTextualOverlayGlobalOptions(options.textualOverlay);
        }
        if (options.overlay && isDynamicOptions) {
            this.overlayRenderer.setDynamicOptions(options.overlay);
        }
        if (options.overlay && !isDynamicOptions) {
            this.overlayRenderer.setGlobalOptions(options.overlay);
        }
    }

    private startNextPrevButtonClicks(): void {
        this.lightbox.$nextStepRequired()
            .pipe(
                filter(res => !!res),
                filter(() => {
                    if (this.currentSectionStepIdx === (this.currentSection.steps.length - 1)) {
                        this._$sectionStatus.next({
                            runningSection: null,
                            runningStepInSection: null,
                            status: HazelineTutorialSectionStatuses.ended
                        });
                        return false;
                    }

                    return true;
                }),
                tap(() => this.currentSectionStepIdx++),
                tap(() => this.overlayRenderer.removeEndTutorialButton()),
                tap(() => this.runSection(this.currentSection)),
            ).subscribe();

        this.lightbox.$prevStepRequired()
            .pipe(
                filter(res => !!res),
                filter(() => this.currentSectionStepIdx === 0 ? false : true),
                tap(() => this.currentSectionStepIdx--),
                tap(() => this.runSection(this.currentSection)),
            ).subscribe();

        this.overlayRenderer.$premartureEndRequired()
            .pipe(
                filter(res => !!res),
                tap(() => {
                    this._$sectionStatus.next({
                        runningSection: null,
                        runningStepInSection: null,
                        status: HazelineTutorialSectionStatuses.ended
                    });
                    this._$sectionStatus.complete();
                })
            )
            .subscribe();
    }

    private startResponsiveListeners(): void {
        window.addEventListener('resize', this.windowResizeEvtListener);
        window.addEventListener('scroll', this.windowScrollEvtListener);
    }

}