import { CSSRules } from "./interfaces/css-rules.interface";
import { SectionStep } from "./interfaces/section-step.interface";
import { TutorialSection } from "./interfaces/tutorial-section.interface";
export declare class Hazeline {
    private sectionsLoader;
    private tutorialRunner;
    constructor();
    setInfoBoxCSSRules(styles: CSSRules): void;
    setInfoBoxContentCSSRules(styles: CSSRules): void;
    setTutorialOverlayCSSRules(styles: CSSRules): void;
    setInfoBoxNextButtonCSSRules(styles: CSSRules): void;
    setInfoBoxPreviousButtonCSSRules(styles: CSSRules): void;
    startTutorialSection(sectionId: string): void;
    addTutorialSection(section: TutorialSection): void;
    addTutorialSections(sections: TutorialSection[]): void;
    getTutorialSectionById(sectionId: string): TutorialSection | null;
    getSectionStepById(sectionId: string, stepId: string): SectionStep | null;
}
//# sourceMappingURL=hazeline.d.ts.map