import { TutorialSection } from "../interfaces/tutorial-section.interface";
export declare class SectionsLoader {
    private tutorialSections;
    addSection(section: TutorialSection): void;
    addSections(sections: TutorialSection[]): void;
    getTutorialSection(id: string): TutorialSection;
}
