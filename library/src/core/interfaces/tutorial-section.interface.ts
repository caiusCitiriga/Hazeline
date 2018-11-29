import { HazelineTutorialStep } from './tutorial-step.interface';

export interface HazelineTutorialSection {
    id: string;
    steps: HazelineTutorialStep[];
}