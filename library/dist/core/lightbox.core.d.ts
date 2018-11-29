import { Observable } from 'rxjs';
import { HazelineTutorialStep } from './interfaces/tutorial-step.interface';
import { HazelineLightboxOptions } from './interfaces/tutorial-section.interface';
export declare class HazelineLightbox {
    private _$nextStepRequired;
    private _$prevStepRequired;
    private tether;
    private lightboxWrp;
    private lightboxTextWrp;
    private lightboxNextBtn;
    private lightboxPrevBtn;
    private lightboxControlsWrp;
    private lightboxText;
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
    setOptions(lightboxOpts: HazelineLightboxOptions): void;
    updateLightboxPlacement(target: HTMLElement): void;
    private applyTexts;
    private attachNextEventListeneres;
    private createLightbox;
    private styleWholeLigthboxElement;
}
//# sourceMappingURL=lightbox.core.d.ts.map