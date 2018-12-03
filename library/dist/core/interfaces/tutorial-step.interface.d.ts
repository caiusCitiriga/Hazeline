import { HazelineOptions } from './hazeline-options.interface';
export interface HazelineTutorialStep {
    text: string;
    delayText?: string;
    delayTextColor?: string;
    elementSelector: string;
    delayBeforeStart?: number;
    dynamicOptions?: HazelineOptions;
    useOverlayInsteadOfLightbox?: boolean;
    nextStepCustomTrigger?: {
        event: string;
        disableDefaultNextPrevBtns?: boolean;
        callback: (evt: Event, step: HazelineTutorialStep, htmlElement: HTMLElement) => Promise<void>;
    };
    onBeforeEnd?: () => Promise<void>;
    onBeforeStart?: () => Promise<void>;
}
//# sourceMappingURL=tutorial-step.interface.d.ts.map