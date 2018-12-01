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
    private textualOverlay;
    private textualOverlayParagraph;
    private ligthboxOptions;
    private textualOverlayOptions;
    private nextBtnClickEvtListener;
    private prevBtnClickEvtListener;
    private prevBtnMouseLeaveEvtListener;
    private prevBtnMouseEnterEvtListener;
    private nextBtnMouseLeaveEvtListener;
    private nextBtnMouseEnterEvtListener;
    $eventTriggered(): Observable<{
        type: HazelineEventTrigger;
    }>;
    dispose(detachListeners?: boolean): void;
    disposeTextualOverlay(detachListeners?: boolean, fadeOutBeforeRemoving?: boolean): Observable<boolean>;
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
//# sourceMappingURL=lightbox-renderer.core.d.ts.map