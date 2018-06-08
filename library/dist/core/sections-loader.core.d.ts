import { SectionStep } from "../interfaces/section-step.interface";
import { TutorialSection } from "../interfaces/tutorial-section.interface";
export declare class SectionsLoader {
    private tutorialSections;
    addSection(section: TutorialSection): void;
    addSections(sections: TutorialSection[]): void;
    getTutorialSection(id: string): TutorialSection;
    getSectionStep(sectionId: string, stepId: string): SectionStep;
}
//# sourceMappingURL=sections-loader.core.d.ts.map