import { SectionStep } from "./section-step.interface";

export interface TutorialSection {
    //  Properties
    id: string;
    name?: string;
    steps: SectionStep[];

    //  Events
    onEnd?: () => void;
    onStart?: () => void;
}