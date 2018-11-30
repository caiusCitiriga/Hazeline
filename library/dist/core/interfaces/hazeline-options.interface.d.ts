import { ITetherConstraint } from 'tether';
import { HazelineCSSRules } from './css-rules.interface';
export interface HazelineOptions {
    overlay?: HazelineOverlayOptions;
    lightbox?: HazelineLightboxOptions;
}
export interface HazelineOverlayOptions {
    closeBtnText?: string;
    overlayCSS?: HazelineCSSRules;
    endTutorialBtnCSS?: HazelineCSSRules;
    endTutorialBtnHoverCSS?: HazelineCSSRules;
}
export interface HazelineLightboxOptions {
    nextBtnText?: string;
    prevBtnText?: string;
    lastStepNextBtnText?: string;
    lightboxWrapperCSS?: HazelineCSSRules;
    lightboxNextBtnCSS?: HazelineCSSRules;
    lightboxPrevBtnCSS?: HazelineCSSRules;
    lightboxTextWrapperCSS?: HazelineCSSRules;
    lightboxControlsWrapperCSS?: HazelineCSSRules;
    lightboxPrevBtnHoverCSS?: HazelineCSSRules;
    lightboxNextBtnHoverCSS?: HazelineCSSRules;
    positioning?: {
        offset?: string;
        attachment?: string;
        classPrefix?: string;
        targetOffset?: string;
        targetAttachment?: string;
        constraints?: ITetherConstraint[];
        classes?: {
            [className: string]: boolean | string;
        };
    };
}
//# sourceMappingURL=hazeline-options.interface.d.ts.map