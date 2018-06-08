import { SectionStep } from "./section-step.interface";
export interface TutorialSection {
    id: string;
    name?: string;
    steps: SectionStep[];
    onEnd?: () => void;
    onStart?: () => void;
}
//# sourceMappingURL=tutorial-section.interface.d.ts.map