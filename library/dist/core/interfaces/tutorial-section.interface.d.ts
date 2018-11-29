import { ITetherConstraint } from 'tether';
import { HazelineCSSRules } from './css-rules.interface';
import { HazelineTutorialStep } from './tutorial-step.interface';
export interface HazelineTutorialSection {
    id: string;
    steps: HazelineTutorialStep[];
    globalStyling?: GlobalStyles;
}
export interface GlobalStyles {
    lightbox?: HazelineLightboxOptions;
}
export interface HazelineLightboxOptions {
    ligthboxWrapperCSS?: HazelineCSSRules;
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
//# sourceMappingURL=tutorial-section.interface.d.ts.map