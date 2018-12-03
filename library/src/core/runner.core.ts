import { Observable, BehaviorSubject, of, Subject, from } from 'rxjs';
import { filter, tap, switchMap, take, debounceTime, delay } from 'rxjs/operators';

import { HazelineElementsDefaults } from './consts/elements-defaults.const';

import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineTutorialSectionStatuses } from './enums/tutorial-section-statuses.enum';

import { HazelineOptions } from './interfaces/hazeline-options.interface';
import { HazelineTutorialSection } from './interfaces/tutorial-section.interface';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';

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

        if (!this.currentSection.steps[this.currentSectionStepIdx].onBeforeStart) {
            this.currentSection.steps[this.currentSectionStepIdx].onBeforeStart = () => new Promise(res => res());
        }

        let wrapElementsDimensions: HazelineWrappingElementsDimensions;
        from(this.currentSection.steps[this.currentSectionStepIdx].onBeforeStart())
            .pipe(
                tap(() => {
                    this.isFirstStep = this.currentSectionStepIdx === 0;
                    this.isLastStep = (section.steps.length - 1) === this.currentSectionStepIdx;
                    this.thisStepUsesTextualOverlay = this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox;
                    this.previousStepUsedTextualOverlay = this.currentSectionStepIdx === 0
                        ? false
                        : this.currentSection.steps[this.previousSectionStepIdx].useOverlayInsteadOfLightbox

                }),
                tap(() => {
                    this.applyCustomOptionsIfAny(section.globalOptions);
                    this.applyCustomOptionsIfAny(this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions, true);
                }),
                tap(() => wrapElementsDimensions = this.getWrappingDimensions()),
                tap(() => {
                    if (!this.isFirstStep && !this.thisStepUsesTextualOverlay) {
                        this.lightboxRenderer.disposeTextualOverlay();
                        this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
                    }
                }),
                tap(() => {
                    if (this.thisStepUsesTextualOverlay) {
                        if (!this.previousStepUsedTextualOverlay) {
                            this.lightboxRenderer.dispose();
                            this.overlayRenderer.hideCurrentOverlays();
                            this.overlayRenderer.removeEndTutorialButton();
                        }

                        let fadeOutBeforeRemoving = true;
                        if (this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions.textualOverlay) {
                            fadeOutBeforeRemoving = !this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions.textualOverlay.disableBgFadeIn;
                        }

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
                }),
                tap(() => {
                    if (this.currentSection.steps[this.currentSectionStepIdx].nextStepCustomTrigger) {
                        if (this.currentSection.steps[this.currentSectionStepIdx].nextStepCustomTrigger.disableDefaultNextPrevBtns) {
                            this.lightboxRenderer.disableNextPrevBtns();
                        }

                        this.lightboxRenderer.attachCustomNextEventListenerOnElement({
                            step: this.currentSection.steps[this.currentSectionStepIdx],
                            event: this.currentSection.steps[this.currentSectionStepIdx].nextStepCustomTrigger.event,
                            listener: this.currentSection.steps[this.currentSectionStepIdx].nextStepCustomTrigger.callback,
                            element: HazelineElementManager.getElementBySelector<HTMLElement>(this.currentSection.steps[this.currentSectionStepIdx].elementSelector),
                        });
                    }
                }),
                tap(() => this._$sectionStatus.next({
                    runningSection: section,
                    status: HazelineTutorialSectionStatuses.started,
                    runningStepInSection: section.steps[this.currentSectionStepIdx]
                })),
                tap(() => this.overlayRenderer.placeEndTutorialButton()),
                tap(() => this.previousSectionStepIdx = this.currentSectionStepIdx)
            ).subscribe();

        return this._$sectionStatus;
    }

    private actualWindowScrollEvtListener(): void {
        const lightboxObj = document.getElementById(HazelineElementsIds.lightbox) as HTMLDivElement;
        let lightboxTransitionPropsBackup;
        if (!!lightboxObj) {
            lightboxTransitionPropsBackup = lightboxObj.style.transition;
        }

        this._$onScrollEventsStream
            .pipe(
                debounceTime(5),
                filter(() => {
                    if (this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
                        this.lightboxRenderer.updateTextualOverlayPlacement();
                        return false;
                    }

                    return true;
                }),
                tap(() => {
                    if (!!lightboxObj) {
                        lightboxObj.style.transition = 'none';
                    }
                }),
                tap(() => this.overlayRenderer.dispose()),
                tap(() => {
                    const wrapElementsDimensions = this.getWrappingDimensions();
                    this.overlayRenderer.wrapElement(wrapElementsDimensions);
                }),
                tap(() => this.lightboxRenderer.updateLightboxPlacement(
                    HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStepIdx].elementSelector),
                    this.currentSection.steps[this.currentSectionStepIdx],
                    this.isLastStep
                )),
                tap(() => this.lightboxRenderer.showLightbox()),
                delay(500),
                tap(() => {
                    if (!!lightboxObj) {
                        lightboxObj.style.transition = lightboxTransitionPropsBackup;
                    }
                })
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

    private getWrappingDimensions(): HazelineWrappingElementsDimensions {
        const dynamicOverlayOpts = this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions
            ? !!this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions.overlay ? this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions.overlay : {}
            : {};

        const globalOverlayOpts = this.currentSection.globalOptions
            ? !!this.currentSection.globalOptions.overlay ? this.currentSection.globalOptions.overlay : {}
            : {};

        const mergedOptions = Object.assign({}, HazelineElementsDefaults.overlay, globalOverlayOpts, dynamicOverlayOpts);

        return this.elementManager
            .getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStepIdx].elementSelector, mergedOptions);
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
                tap(() => {
                    if (!this.currentSection.steps[this.currentSectionStepIdx].onBeforeEnd) {
                        this.currentSection.steps[this.currentSectionStepIdx].onBeforeEnd = () => new Promise(res => res());
                    }
                }),
                switchMap(() => from(this.currentSection.steps[this.currentSectionStepIdx].onBeforeEnd())),
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
                tap(() => {
                    if (this.currentSection.steps[this.currentSectionStepIdx].nextStepCustomTrigger) {
                        if (this.currentSection.steps[this.currentSectionStepIdx].nextStepCustomTrigger.disableDefaultNextPrevBtns) {
                            this.lightboxRenderer.enableNextPrevBtns();
                        }

                        this.lightboxRenderer.detachCustomEventsListeners({
                            event: this.currentSection.steps[this.currentSectionStepIdx].nextStepCustomTrigger.event,
                            element: HazelineElementManager.getElementBySelector<HTMLElement>(this.currentSection.steps[this.currentSectionStepIdx].elementSelector)
                        });
                    }
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
        const wrapElementsDimensions = this.getWrappingDimensions();
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