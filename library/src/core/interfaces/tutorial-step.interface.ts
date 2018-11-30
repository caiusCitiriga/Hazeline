import { HazelineOptions } from './hazeline-options.interface';

export interface HazelineTutorialStep {
    text: string;
    elementSelector: string;

    dynamicOptions?: HazelineOptions;
    useOverlayInsteadOfLightbox?: boolean;
}