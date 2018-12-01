import { filter, tap, switchMap, take, debounceTime, delay } from 'rxjs/operators';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';

import { HazelineOptions } from './interfaces/hazeline-options.interface';
import { HazelineTutorialSection } from './interfaces/tutorial-section.interface';
import { HazelineTutorialSectionStatuses } from './enums/tutorial-section-statuses.enum';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';

import { HazelineElementManager } from './element-manager.core';
import { HazelineOverlayRenderer } from './overlay-renderer.core';
import { HazelineLightboxRenderer, HazelineEventTrigger } from './lightbox-renderer.core';

export class HazelineRunner {

    private _$onScrollEventsStream = new Subject<boolean>();
    private _$runWhenSectionStepsArePopulated = new Subject<boolean>();
    private _$sectionStatus = new BehaviorSubject<HazelineTutorialSectionStatus>(null);

    private elementManager: HazelineElementManager;
    private overlayRenderer: HazelineOverlayRenderer;
    private lightboxRenderer: HazelineLightboxRenderer;

    private currentSectionStepIdx = 0;
    private previousSectionStepIdx = 0;
    private currentSection: HazelineTutorialSection;

    private bodyOverflowsBackup = {
        x: undefined,
        y: undefined,
        overflow: undefined
    };

    private isFirstStep: boolean;
    private isLastStep: boolean;
    private thisStepUsesTextualOverlay: boolean;
    private previousStepUsedTextualOverlay: boolean;

    public constructor(
        lightbox: HazelineLightboxRenderer,
        renderer: HazelineOverlayRenderer,
        elementManager: HazelineElementManager
    ) {
        this.lightboxRenderer = lightbox;
        this.overlayRenderer = renderer;
        this.elementManager = elementManager;

        this._$runWhenSectionStepsArePopulated
            .pipe(
                take(1),
                tap(() => {
                    this.startResponsiveListeners();
                    this.startNextPrevButtonClicks();
                    this.actualWindowScrollEvtListener();
                })
            ).subscribe();
    }

    public endTutorial(): void {
        this.overlayRenderer.dispose();
        this.lightboxRenderer.dispose(true);
        this.lightboxRenderer.disposeTextualOverlay(true);
        window.removeEventListener('resize', this.windowResizeEvtListener);
        window.removeEventListener('scroll', this.windowScrollEventThrottler);
    }

    public runSection(section: HazelineTutorialSection): Observable<HazelineTutorialSectionStatus> {
        if (!this.sectionCanBeRan(section)) {
            return this._$sectionStatus;
        }

        this.isFirstStep = this.currentSectionStepIdx === 0;
        this.isLastStep = (section.steps.length - 1) === this.currentSectionStepIdx;
        this.thisStepUsesTextualOverlay = this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox;
        this.previousStepUsedTextualOverlay = this.currentSectionStepIdx === 0
            ? false
            : this.currentSection.steps[this.previousSectionStepIdx].useOverlayInsteadOfLightbox

        this.applyCustomOptionsIfAny(section.globalOptions);
        this.applyCustomOptionsIfAny(this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions, true);

        const wrapElementsDimensions = this.elementManager
            .getWrappingElementsDimensions(section.steps[this.currentSectionStepIdx].elementSelector);

        if (!this.isFirstStep && !this.thisStepUsesTextualOverlay) {
            this.lightboxRenderer.disposeTextualOverlay();
            try {
                this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);

            } catch (e) {
                this.overlayRenderer.wrapElement(wrapElementsDimensions);
            }
        }

        if (this.thisStepUsesTextualOverlay) {
            if (!this.previousStepUsedTextualOverlay) {
                this.lightboxRenderer.dispose();
                this.overlayRenderer.hideCurrentOverlays();
                this.overlayRenderer.removeEndTutorialButton();
            }

            const fadeOutBeforeRemoving = !this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions.textualOverlay.disableBgFadeIn;
            this.lightboxRenderer.disposeTextualOverlay(false, fadeOutBeforeRemoving)
                .pipe(switchMap(() =>
                    this.lightboxRenderer.placeTextOverlay(this.currentSection.steps[this.currentSectionStepIdx], this.isLastStep))
                ).subscribe();
        } else {
            try {
                this.lightboxRenderer.updateLightboxPlacement(
                    HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStepIdx].elementSelector),
                    section.steps[this.currentSectionStepIdx],
                    this.isLastStep);
            } catch {
                this.lightboxRenderer.placeLightbox(
                    HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStepIdx].elementSelector),
                    section.steps[this.currentSectionStepIdx],
                    this.isLastStep);
            }
        }

        this._$sectionStatus.next({
            runningSection: section,
            status: HazelineTutorialSectionStatuses.started,
            runningStepInSection: section.steps[this.currentSectionStepIdx]
        });

        this.overlayRenderer.placeEndTutorialButton();
        this.previousSectionStepIdx = this.currentSectionStepIdx;
        return this._$sectionStatus;
    }

    private actualWindowScrollEvtListener(): void {
        this._$onScrollEventsStream
            .pipe(
                filter(() => {
                    if (this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
                        this.lightboxRenderer.updateTextualOverlayPlacement();
                        return false;
                    }

                    return true;
                }),
                tap(() => this.lightboxRenderer.hideLightbox()),
                tap(() => this.overlayRenderer.hideCurrentOverlays()),
                delay(500),
                tap(() => this.overlayRenderer.dispose()),
                tap(() => {
                    const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStepIdx].elementSelector);
                    this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
                }),
                tap(() => this.lightboxRenderer.updateLightboxPlacement(
                    HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStepIdx].elementSelector),
                    this.currentSection.steps[this.currentSectionStepIdx],
                    this.isLastStep
                )),
                tap(() => this.lightboxRenderer.showLightbox()),
            ).subscribe();
    };

    private applyCustomOptionsIfAny(options: HazelineOptions, isDynamicOptions = false): void {
        if (!options) {
            return;
        }

        if (options.overlay && !isDynamicOptions) {
            this.overlayRenderer.setGlobalOptions(options.overlay);
        }
        if (options.overlay && isDynamicOptions) {
            this.overlayRenderer.setDynamicOptions(options.overlay);
        }
        if (options.lightbox && !isDynamicOptions) {
            this.lightboxRenderer.setLightboxGlobalOptions(options.lightbox);
        }
        if (options.lightbox && isDynamicOptions) {
            this.lightboxRenderer.setLightboxDynamicOptions(options.lightbox);
        }
        if (options.textualOverlay && !isDynamicOptions) {
            this.lightboxRenderer.setTextualOverlayGlobalOptions(options.textualOverlay);
        }
        if (options.textualOverlay && isDynamicOptions) {
            this.lightboxRenderer.setTextualOverlayDynamicOptions(options.textualOverlay);
        }
    }

    private startNextPrevButtonClicks(): void {
        let isNextStepRequired = undefined;
        this.lightboxRenderer.$eventTriggered()
            .pipe(
                tap(eventTrigger => {
                    isNextStepRequired = eventTrigger.type === HazelineEventTrigger.next ? true : false;
                    return eventTrigger;
                }),
                filter(res => !!res),
                filter(() => {
                    //  If we've reached the last step
                    if (isNextStepRequired && this.currentSectionStepIdx === (this.currentSection.steps.length - 1)) {
                        this._$sectionStatus.next({
                            runningSection: null,
                            runningStepInSection: null,
                            status: HazelineTutorialSectionStatuses.ended
                        });
                        return false;
                    }

                    return true;
                }),
                tap(() => isNextStepRequired ? this.currentSectionStepIdx++ : this.currentSectionStepIdx--),
                tap(() => this.overlayRenderer.removeEndTutorialButton()),
                filter(() => !!this.currentSection.steps && !!this.currentSection.steps.length),
                switchMap(() => of(this.currentSection.steps[this.currentSectionStepIdx].delayBeforeStart)),
                tap(dealyAmount => {
                    if (!dealyAmount) {
                        this.runSection(this.currentSection);
                        return false;
                    }
                    return true;
                }),
                filter(applyDelay => !!applyDelay),
                switchMap(() => {
                    this.overlayRenderer.dispose(); // TODO try to hide instead
                    this.lightboxRenderer.dispose();
                    this.lightboxRenderer.disposeTextualOverlay();

                    const message = this.currentSection.steps[this.currentSectionStepIdx].delayText;
                    const textColor = this.currentSection.steps[this.currentSectionStepIdx].delayTextColor;
                    return this.overlayRenderer.placeWaitForDelayOverlay(message, textColor);
                }),
                switchMap(() => {
                    const timeoutPassed = new Subject<boolean>();
                    setTimeout(() => {
                        this.overlayRenderer.removeWaitForDelayOverlay();
                        // TODO remember to show back
                        timeoutPassed.next(true);
                    }, this.currentSection.steps[this.currentSectionStepIdx].delayBeforeStart)

                    return timeoutPassed;
                }),
                tap(() => this.runSection(this.currentSection))
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
                }),
                tap(() => this.overlayRenderer.removeEndTutorialButton()),
            ).subscribe();
    }

    private sectionCanBeRan(section: HazelineTutorialSection): boolean {
        this.currentSection = section;
        this._$runWhenSectionStepsArePopulated.next(true);
        if (!this.currentSection) {
            this._$sectionStatus.next({
                status: HazelineTutorialSectionStatuses.errored,
                runningSection: section,
                runningStepInSection: null
            });
            return false;
        }

        return true;
    }

    private startResponsiveListeners(): void {
        window.addEventListener('resize', this.windowResizeEvtListener);
        window.addEventListener('scroll', this.windowScrollEventThrottler);
    }

    private windowResizeEvtListener = () => {
        const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStepIdx].elementSelector);
        if (this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
            this.lightboxRenderer.updateTextualOverlayPlacement();
        } else {
            this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            this.lightboxRenderer.updateLightboxPlacement(
                HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStepIdx].elementSelector),
                this.currentSection.steps[this.currentSectionStepIdx],
                this.isLastStep
            );;
        }
    };

    private windowScrollEventThrottler = () => {
        this._$onScrollEventsStream.next(true);
    }

}