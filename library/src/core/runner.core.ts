import { filter, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { HazelineTutorialSection, HazelineGlobalStyles } from './interfaces/tutorial-section.interface';
import { HazelineTutorialSectionStatuses } from './enums/tutorial-section-statuses.enum';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';

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
        this.applyCustomStylesIfAny(section.globalStyling);

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

    private applyCustomStylesIfAny(styles: HazelineGlobalStyles): void {
        if (!styles) {
            return;
        }

        if (styles.lightbox) {
            this.lightbox.applyStyles(styles.lightbox);
        }
        if (styles.overlay) {
            this.overlayRenderer.applyStyles(styles.overlay);
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
                tap(() => console.log('Loading next step'))
            ).subscribe();

        this.lightbox.$prevStepRequired()
            .pipe(
                filter(res => !!res),
                filter(() => this.currentSectionStep === 0 ? false : true),
                tap(() => this.currentSectionStep--),
                tap(() => this.runSection(this.currentSection)),
                tap(() => console.log('Loading previous step'))
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
        window.addEventListener('resize', () => {
            const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStep].elementSelector);
            this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            this.lightbox.updateLightboxPlacement(HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStep].elementSelector));
        });

        window.addEventListener('scroll', () => {
            const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStep].elementSelector);
            this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            this.lightbox.updateLightboxPlacement(HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStep].elementSelector));
        });
    }

}