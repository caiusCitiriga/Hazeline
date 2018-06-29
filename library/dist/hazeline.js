"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//  Core imports
const styles_manager_core_1 = require("./core/styles-manager.core");
const sections_loader_core_1 = require("./core/sections-loader.core");
const tutorial_runner_core_1 = require("./core/tutorial-runner.core");
class Hazeline {
    constructor() {
        this.sectionsLoader = new sections_loader_core_1.SectionsLoader();
        this.tutorialRunner = new tutorial_runner_core_1.TutorialRunner();
    }
    setGlobalInfoBoxCSSRules(styles) { styles_manager_core_1.StylesManager.deafultInfoBoxStyle = styles; }
    setGlobalInfoBoxContentCSSRules(styles) { styles_manager_core_1.StylesManager.defaultInfoBoxContentStyle = styles; }
    setGlobalTutorialOverlayCSSRules(styles) { styles_manager_core_1.StylesManager.defaultTutorialOverlayStyle = styles; }
    setGlobalInfoBoxNextButtonCSSRules(styles) { styles_manager_core_1.StylesManager.defaultInfoBoxNextBtnStyle = styles; }
    setGlobalInfoBoxPreviousButtonCSSRules(styles) { styles_manager_core_1.StylesManager.defaultInfoBoxPrevBtnStyle = styles; }
    //  TODO should return an observable of the tutorial status
    startTutorialSection(sectionId) {
        this.tutorialRunner.run(this.sectionsLoader.getTutorialSection(sectionId));
    }
    addTutorialSection(section) {
        this.sectionsLoader.addSection(section);
    }
    addTutorialSections(sections) {
        this.sectionsLoader.addSections(sections);
    }
    getTutorialSectionById(sectionId) {
        return this.sectionsLoader.getTutorialSection(sectionId);
    }
}
exports.Hazeline = Hazeline;
