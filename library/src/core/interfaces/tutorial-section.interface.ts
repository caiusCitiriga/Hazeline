import { HazelineOptions } from './hazeline-options.interface';
import { HazelineTutorialStep } from './tutorial-step.interface';


export interface HazelineTutorialSection {
    id: string;
    steps: HazelineTutorialStep[];

    globalOptions?: HazelineOptions;
}

