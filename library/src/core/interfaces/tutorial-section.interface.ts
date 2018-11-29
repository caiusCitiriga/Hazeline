import { HazelineTutorialStep } from './tutorial-step.interface';
import { CSSRules } from './css-rules.interface';

export interface HazelineTutorialSection {
    id: string;
    steps: HazelineTutorialStep[];

    globalStyling?: GlobalStyles;
}

export interface GlobalStyles {
    lightbox: CSSRules;
}