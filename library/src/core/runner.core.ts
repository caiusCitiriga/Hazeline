import { filter, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { HazelineTutorialSectionStatuses } from './enums/tutorial-section-statuses.enum';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';
import { HazelineTutorialSection, HazelineGlobalOptions } from './interfaces/tutorial-section.interface';

import { HazelineLightbox } from './lightbox.core';
import { HazelineOverlayRenderer } from './renderer.core';
import { HazelineElementManager } from './element-manager.core';

export class HazelineRunner {

    private lightbox: HazelineLightbox;
    private elementManager: HazelineElementManager;
    private overlayRenderer: HazelineOverlayRenderer;
    private _$sectionStatus = new BehaviorSubject<HazelineTutorialSectionStatus>(null);

    private currentSectionStep = 0;
    private currentSection: HazelineTutorialSection;

    private windowResizeEvtListener = () => {
        const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStep].elementSelector);
        this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
        this.lightbox.updateLightboxPlacement(HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStep].elementSelector));
    };

    private windowScrollEvtListener = () => {
        const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStep].elementSelector);
        this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
        this.lightbox.updateLightboxPlacement(HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStep].elementSelector));

    };

    public constructor(
        lightbox: HazelineLightbox,
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
        if (!section) {
            this._$sectionStatus.next({
                status: HazelineTutorialSectionStatuses.errored,
                runningSection: section,
                runningStepInSection: null
            });

            return this._$sectionStatus;
        }

        this.currentSection = section;
        this.applyCustomOptionsIfAny(section.globalStyling);

        const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(section.steps[this.currentSectionStep].elementSelector);
        if (this.currentSectionStep > 0) {
            this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
        } else {
            this.overlayRenderer.wrapElement(wrapElementsDimensions);
            this._$sectionStatus.next({
                runningSection: section,
                status: HazelineTutorialSectionStatuses.started,
                runningStepInSection: section.steps[this.currentSectionStep]
            });
        }

        this.lightbox.placeLightbox(
            HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStep].elementSelector),
            section.steps[this.currentSectionStep],
            (section.steps.length - 1) === this.currentSectionStep
        );

        this.startResponsiveListeners();
        return this._$sectionStatus;
    }

    private applyCustomOptionsIfAny(options: HazelineGlobalOptions): void {
        if (!options) {
            return;
        }

        if (options.lightbox) {
            this.lightbox.setOptions(options.lightbox);
        }
        if (options.overlay) {
            this.overlayRenderer.setOptions(options.overlay);
        }
    }

    private startNextPrevButtonClicks(): void {
        this.lightbox.$nextStepRequired()
            .pipe(
                filter(res => !!res),
                filter(() => {
                    if (this.currentSectionStep === (this.currentSection.steps.length - 1)) {
                        this._$sectionStatus.next({
                            runningSection: null,
                            runningStepInSection: null,
                            status: HazelineTutorialSectionStatuses.ended
                        });
                        return false;
                    }

                    return true;
                }),
                tap(() => this.currentSectionStep++),
                tap(() => this.runSection(this.currentSection)),
            ).subscribe();

        this.lightbox.$prevStepRequired()
            .pipe(
                filter(res => !!res),
                filter(() => this.currentSectionStep === 0 ? false : true),
                tap(() => this.currentSectionStep--),
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