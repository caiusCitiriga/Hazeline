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
        this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
        this.lightbox.updateLightboxPlacement(HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStepIdx].elementSelector));
    };

    private windowScrollEvtListener = () => {
        const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStepIdx].elementSelector);
        this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
        this.lightbox.updateLightboxPlacement(HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStepIdx].elementSelector));

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
        this.lightbox.dispose();
        this.overlayRenderer.dispose();
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

        const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(section.steps[this.currentSectionStepIdx].elementSelector);
        if (this.currentSectionStepIdx > 0) {
            this.applyCustomOptionsIfAny(this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions, true);
            this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
        } else {
            this.applyCustomOptionsIfAny(section.globalOptions);
            //  if the tutorial has only one step apply the dynamic options too
            if (this.currentSection.steps.length - 1 === this.currentSectionStepIdx) {
                this.applyCustomOptionsIfAny(this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions, true);
            }

            this.overlayRenderer.wrapElement(wrapElementsDimensions);
            this._$sectionStatus.next({
                runningSection: section,
                status: HazelineTutorialSectionStatuses.started,
                runningStepInSection: section.steps[this.currentSectionStepIdx]
            });
        }

        this.lightbox.placeLightbox(
            HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStepIdx].elementSelector),
            section.steps[this.currentSectionStepIdx],
            (section.steps.length - 1) === this.currentSectionStepIdx
        );

        this.startResponsiveListeners();
        return this._$sectionStatus;
    }

    private applyCustomOptionsIfAny(options: HazelineOptions, isDynamicOptions = false): void {
        if (!options) {
            return;
        }

        if (options.lightbox && isDynamicOptions) {
            this.lightbox.setDynamicOptions(options.lightbox);
        }
        if (options.lightbox && !isDynamicOptions) {
            this.lightbox.setGlobalOptions(options.lightbox);
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