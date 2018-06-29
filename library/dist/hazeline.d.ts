import { CSSRules } from "./interfaces/css-rules.interface";
import { TutorialSection } from "./interfaces/tutorial-section.interface";
export declare class Hazeline {
    private sectionsLoader;
    private tutorialRunner;
    constructor();
    setGlobalInfoBoxCSSRules(styles: CSSRules): void;
    setGlobalInfoBoxContentCSSRules(styles: CSSRules): void;
    setGlobalTutorialOverlayCSSRules(styles: CSSRules): void;
    setGlobalInfoBoxNextButtonCSSRules(styles: CSSRules): void;
    setGlobalInfoBoxPreviousButtonCSSRules(styles: CSSRules): void;
    startTutorialSection(sectionId: string): void;
    addTutorialSection(section: TutorialSection): void;
    addTutorialSections(sections: TutorialSection[]): void;
    getTutorialSectionById(sectionId: string): TutorialSection | null;
}
//# sourceMappingURL=hazeline.d.ts.map