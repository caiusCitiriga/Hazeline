import { SectionStep } from "./section-step.interface";
export interface TutorialSection {
    id: string;
    steps: SectionStep[];
    onEnd?: () => void;
    onStart?: () => void;
}
