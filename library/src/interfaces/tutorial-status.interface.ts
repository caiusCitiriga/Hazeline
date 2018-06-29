//  Interfaces imports
import { TutorialSection } from "./tutorial-section.interface";

//  Enums imports
import { TutorialStatuses } from "../enums/tutorial-statuses.enum";

export interface TutorialStatus {
    runningSection: TutorialSection;
    tutorialStatus: TutorialStatuses;
}
