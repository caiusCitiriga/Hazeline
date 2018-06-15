import { SectionStep } from "./interfaces/section-step.interface";
import { TutorialSection } from "./interfaces/tutorial-section.interface";

import { SectionsLoader } from "./core/sections-loader.core";
import { TutorialRunner } from './core/tutorial-runner.core';

export class Hazeline {

    private sectionsLoader: SectionsLoader;
    private tutorialRunner: TutorialRunner;

    public constructor() {
        this.sectionsLoader = new SectionsLoader();
        this.tutorialRunner = new TutorialRunner();

        var bootstrap_enabled = (typeof ($() as any).emulateTransitionEnd == 'function');
        console.log('Bootsrap enabled: ' + bootstrap_enabled);
    }

    //  TODO should return an observable of the tutorial status
    public startTutorialSection(sectionId: string): void {
        this.tutorialRunner.run(this.sectionsLoader.getTutorialSection(sectionId));
    }

    public addTutorialSection(section: TutorialSection): void {
        this.sectionsLoader.addSection(section);
    }

    public addTutorialSections(sections: TutorialSection[]): void {
        this.sectionsLoader.addSections(sections);
    }

    public getTutorialSectionById(sectionId: string): TutorialSection | null {
        return this.sectionsLoader.getTutorialSection(sectionId);
    }

    public getSectionStepById(sectionId: string, stepId: string): SectionStep | null {
        return this.sectionsLoader.getSectionStep(sectionId, stepId);
    }

}
