import { Observable } from 'rxjs';
import { HazelineTutorialStep } from './interfaces/tutorial-step.interface';
import { HazelineLightboxOptions } from './interfaces/hazeline-options.interface';
export declare class HazelineLightboxRenderer {
    private _$nextStepRequired;
    private _$prevStepRequired;
    private tether;
    private lightboxWrp;
    private lightboxTextWrp;
    private lightboxNextBtn;
    private lightboxPrevBtn;
    private lightboxControlsWrp;
    private ligthboxOptions;
    private prevBtnClickEvtListener;
    private nextBtnClickEvtListener;
    private prevBtnMouseLeaveEvtListener;
    private prevBtnMouseEnterEvtListener;
    private nextBtnMouseLeaveEvtListener;
    private nextBtnMouseEnterEvtListener;
    $nextStepRequired(): Observable<boolean>;
    $prevStepRequired(): Observable<boolean>;
    dispose(): void;
    placeLightbox(target: HTMLElement, sectionStep: HazelineTutorialStep, isLastStep?: boolean): void;
    setDynamicOptions(opts: HazelineLightboxOptions): void;
    setGlobalOptions(opts: HazelineLightboxOptions): void;
    updateLightboxPlacement(target: HTMLElement): void;
    private applyTexts;
    private attachNextEventListeneres;
    private createLightbox;
    private styleWholeLigthboxElement;
}
//# sourceMappingURL=lightbox-renderer.core.d.ts.map