import { CSSRules } from '../interfaces/css-rules';
import { Observable } from 'rxjs';
export declare class HazelineLightbox {
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
    onNextBtnClick: () => void;
    onPrevBtnClick: () => void;
    showLightbox(opts: LightboxOptions): Observable<boolean>;
    private setStylesIfAny;
    private update;
    private setOptions;
    private buildLightbox;
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
//# sourceMappingURL=lightbox.core.d.ts.map