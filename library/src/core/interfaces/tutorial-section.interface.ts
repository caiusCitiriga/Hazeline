import { ITetherConstraint } from 'tether';
import { HazelineCSSRules } from './css-rules.interface';
import { HazelineTutorialStep } from './tutorial-step.interface';


export interface HazelineTutorialSection {
    id: string;
    steps: HazelineTutorialStep[];

    globalStyling?: HazelineGlobalStyles;
}

export interface HazelineGlobalStyles {
    lightbox?: HazelineLightboxOptions;
    endTutorialBtnCSS?: HazelineCSSRules;
    overlay?: HazelineOverlayCommonOptions;
    endTutorialBtnHoverCSS?: HazelineCSSRules;
}

export interface HazelineLightboxOptions {
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
        classes?: { [className: string]: boolean | string };
    };
}

export interface HazelineOverlayCommonOptions {
    background?: string;
}