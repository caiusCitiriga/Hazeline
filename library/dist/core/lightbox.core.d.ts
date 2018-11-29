import { HazelineTutorialStep } from './interfaces/tutorial-step.interface';
import { HazelineLightboxOptions } from './interfaces/tutorial-section.interface';
import { Observable } from 'rxjs';
export declare class HazelineLightbox {
    private _$nextStepRequired;
    private _$prevStepRequired;
    private tether;
    private lightboxWrp;
    private lightboxTextWrp;
    private lightboxNextBtn;
    private lightboxPrevBtn;
    private lightboxControlsWrp;
    private ligthboxOptions;
    private nextBtnText;
    private prevBtnText;
    private lightboxText;
    $nextStepRequired(): Observable<boolean>;
    $prevStepRequired(): Observable<boolean>;
    applyStyles(lightboxOpts: HazelineLightboxOptions): void;
    placeLightbox(target: HTMLElement, sectionStep: HazelineTutorialStep): void;
    updateLightboxPlacement(target: HTMLElement): void;
    private applyTexts;
    private attachNextPrevClickListeners;
    private createLightbox;
    private styleWholeLigthboxElement;
}
//# sourceMappingURL=lightbox.core.d.ts.map