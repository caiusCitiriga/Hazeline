//  Interfaces imports
import { SectionStep } from "./section-step.interface";

export interface TutorialSection {
    //  Properties
    id: string;
    steps: SectionStep[];

    //  Events
    onEnd?: () => void;
    onStart?: () => void;
}