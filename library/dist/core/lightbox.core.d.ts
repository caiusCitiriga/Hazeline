import { CSSRules } from '../interfaces/css-rules';
import { Observable } from 'rxjs';
export declare class HazelineLightbox {
    onNextBtnClick: () => void;
    onPrevBtnClick: () => void;
    private lightbox;
    private controlsWrapper;
    private lightboxParagraph;
    private lightboxControls;
    private ligthboxID;
    private paragraphID;
    private nextControlBtnID;
    private prevControlBtnID;
    private controlsWrapperID;
    private nextBtnText;
    private prevBtnText;
    private paragraphText;
    private disablePrevBtn;
    private disableNextBtn;
    private lightboxCSS;
    private lightboxParagraphCSS;
    private lightboxControlsWrapperCSS;
    private lightboxControlButtonsCSS;
    private currentElementCoordinates;
    init(opts: LightboxOptions): void;
    showLightbox(): Observable<boolean>;
    destroy(): void;
    fadeOut(): void;
    fadeIn(): void;
    private setStylesIfAny;
    private update;
    private setOptions;
    private buildLightbox;
    private updateLightboxPosition;
    private attachParagraph;
    private buildParagraph;
    private attachControlButtons;
    private buildLigthboxControls;
    private buildControlsWrapper;
    private applyStyles;
}
export interface LightboxOptions {
    text: string;
    disableNext?: boolean;
    disablePrev?: boolean;
    lightboxCSS?: CSSRules;
    paragraphCSS?: CSSRules;
    elementSelector: string;
    controlButtonsWrapperCSS?: CSSRules;
    placement?: LightboxPlacement | string;
    controlButtonsCSS?: {
        next?: CSSRules;
        prev?: CSSRules;
    };
}
export interface LigthboxControls {
    next: HTMLElement;
    prev: HTMLElement;
}
export declare enum LightboxPlacement {
    LEFT = 0,
    RIGHT = 1,
    ABOVE = 2,
    BELOW = 3
}
//# sourceMappingURL=lightbox.core.d.ts.map