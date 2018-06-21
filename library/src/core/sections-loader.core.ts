import { TutorialSection } from "../interfaces/tutorial-section.interface";

export class SectionsLoader {

    private tutorialSections: TutorialSection[] = [];

    public addSection(section: TutorialSection): void {
        this.tutorialSections.push(section);
    }

    public addSections(sections: TutorialSection[]): void {
        sections.forEach(s => this.tutorialSections.push(s));
    }

    public getTutorialSection(id: string): TutorialSection {
        const section = this.tutorialSections.find(s => s.id === id);
        return !!section ? section : null;
    }
}
