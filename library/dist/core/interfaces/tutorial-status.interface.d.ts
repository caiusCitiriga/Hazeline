import { HazelineTutorialStep } from './tutorial-step.interface';
import { HazelineTutorialSection } from './tutorial-section.interface';
import { HazelineTutorialStatuses } from '../enums/tutorial-statuses.enum';
export interface HazelineTutorialStatus {
    status: HazelineTutorialStatuses;
    runningSection: HazelineTutorialSection;
    runningStepInSection: HazelineTutorialStep;
}
//# sourceMappingURL=tutorial-status.interface.d.ts.map