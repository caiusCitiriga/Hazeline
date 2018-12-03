import { Observable } from 'rxjs';
import { HazelineTutorialStep } from './interfaces/tutorial-step.interface';
import { HazelineLightboxOptions, HazelineTextualOverlayOptions } from './interfaces/hazeline-options.interface';
export declare class HazelineLightboxRenderer {
    private _$eventTrigger;
    private tether;
    private lightboxWrp;
    private lightboxTextWrp;
    private lightboxNextBtn;
    private lightboxPrevBtn;
    private lightboxControlsWrp;
    private lightboxNextBtnOriginalDisplayMode;
    private lightboxPrevBtnOriginalDisplayMode;
    private textualOverlay;
    private textualOverlayParagraph;
    private ligthboxOptions;
    private textualOverlayOptions;
    private customNextBtnClickEvtListener;
    private customPrevBtnClickEvtListener;
    private nextBtnClickEvtListener;
    private prevBtnClickEvtListener;
    private prevBtnMouseLeaveEvtListener;
    private prevBtnMouseEnterEvtListener;
    private nextBtnMouseLeaveEvtListener;
    private nextBtnMouseEnterEvtListener;
    $eventTriggered(): Observable<{
        type: HazelineEventTrigger;
    }>;
    attachCustomNextEventListenerOnElement(opts: CustomEventListenerOpts): void;
    detachCustomEventsListeners(opts: CustomEventListenerDetachOpts): void;
    disableNextPrevBtns(): void;
    dispose(detachListeners?: boolean): void;
    disposeTextualOverlay(detachListeners?: boolean, fadeOutBeforeRemoving?: boolean): Observable<boolean>;
    enableNextPrevBtns(): void;
    hideLightbox(): void;
    showLightbox(): void;
    placeLightbox(target: HTMLElement, sectionStep: HazelineTutorialStep, isLastStep?: boolean): void;
    placeTextOverlay(sectionStep: HazelineTutorialStep, isLastStep?: boolean): Observable<boolean>;
    setLightboxDynamicOptions(opts: HazelineLightboxOptions): void;
    setTextualOverlayDynamicOptions(opts: HazelineTextualOverlayOptions): void;
    setLightboxGlobalOptions(opts: HazelineLightboxOptions): void;
    setTextualOverlayGlobalOptions(opts: HazelineTextualOverlayOptions): void;
    updateLightboxPlacement(target: HTMLElement, step: HazelineTutorialStep, isLastStep?: boolean): void;
    updateTextualOverlayPlacement(): void;
    private applyTexts;
    private attachNextPrevEventsListeneres;
    private detachNextPrevEventsListeneres;
    private attachNextPrevHoverModesEventsListeners;
    private detachNextPrevHoverModesEventsListeners;
    private createLightbox;
    private createLightboxButtons;
    private createLightboxWrappers;
    private setButttonsIds;
    private setWrappersIds;
    private styleWholeLigthboxElement;
}
export declare enum HazelineEventTrigger {
    next = 0,
    previous = 1
}
export interface CustomEventListenerOpts {
    event: string;
    element: HTMLElement;
    step: HazelineTutorialStep;
    listener: (evt: Event, step: HazelineTutorialStep, element: HTMLElement) => Promise<boolean>;
}
export interface CustomEventListenerDetachOpts {
    event: string;
    element: HTMLElement;
}
//# sourceMappingURL=lightbox-renderer.core.d.ts.map