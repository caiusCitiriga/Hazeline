import { SectionStep } from "./interfaces/section-step.interface";
import { TutorialSection } from "./interfaces/tutorial-section.interface";
export declare class Hazeline {
    private sectionsLoader;
    private tutorialRunner;
    constructor();
    startTutorialSection(sectionId: string): void;
    addTutorialSection(section: TutorialSection): void;
    addTutorialSections(sections: TutorialSection[]): void;
    getTutorialSectionById(sectionId: string): TutorialSection | null;
    getSectionStepById(sectionId: string, stepId: string): SectionStep | null;
}
//# sourceMappingURL=index.d.ts.map