import { HazelineTutorialStep } from './tutorial-step.interface';
import { HazelineTutorialSection } from './tutorial-section.interface';
import { HazelineTutorialSectionStatuses } from '../enums/tutorial-section-statuses.enum';
export interface HazelineTutorialSectionStatus {
    status: HazelineTutorialSectionStatuses;
    runningSection: HazelineTutorialSection;
    runningStepInSection: HazelineTutorialStep;
}
//# sourceMappingURL=tutorial-section-status.interface.d.ts.map