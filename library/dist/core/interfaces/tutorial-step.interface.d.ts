import { HazelineOptions } from './hazeline-options.interface';
export interface HazelineTutorialStep {
    text: string;
    delayText?: string;
    delayTextColor?: string;
    elementSelector: string;
    delayBeforeStart?: number;
    dynamicOptions?: HazelineOptions;
    useOverlayInsteadOfLightbox?: boolean;
    onBeforeEnd?: () => Promise<boolean>;
    onBeforeStart?: () => Promise<boolean>;
}
//# sourceMappingURL=tutorial-step.interface.d.ts.map