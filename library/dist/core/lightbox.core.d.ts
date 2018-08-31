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
    lightboxCSS?: CSSRules;
    paragraphCSS?: CSSRules;
    elementSelector: string;
    controlButtonsCSS?: {
        next?: CSSRules;
        prev?: CSSRules;
    };
    controlButtonsWrapperCSS?: CSSRules;
    text: string;
    disableNext?: boolean;
    disablePrev?: boolean;
}
export interface LigthboxControls {
    next: HTMLElement;
    prev: HTMLElement;
}
