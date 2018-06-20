"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_manager_core_1 = require("./core/styles-manager.core");
const sections_loader_core_1 = require("./core/sections-loader.core");
const tutorial_runner_core_1 = require("./core/tutorial-runner.core");
class Hazeline {
    constructor() {
        this.sectionsLoader = new sections_loader_core_1.SectionsLoader();
        this.tutorialRunner = new tutorial_runner_core_1.TutorialRunner();
        var bootstrap_enabled = (typeof $().emulateTransitionEnd == 'function');
        console.log('%cBootsrap found: ' + bootstrap_enabled, 'color: green; font-weight: bold');
    }
    setInfoBoxCSSRules(styles) { styles_manager_core_1.StylesManager.deafultInfoBoxStyle = styles; }
    setInfoBoxContentCSSRules(styles) { styles_manager_core_1.StylesManager.defaultInfoBoxContentStyle = styles; }
    setTutorialOverlayCSSRules(styles) { styles_manager_core_1.StylesManager.defaultTutorialClothStyle = styles; }
    setInfoBoxNextButtonCSSRules(styles) { styles_manager_core_1.StylesManager.defaultInfoBoxNextBtnStyle = styles; }
    setInfoBoxPreviousButtonCSSRules(styles) { styles_manager_core_1.StylesManager.defaultInfoBoxPrevBtnStyle = styles; }
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
    getSectionStepById(sectionId, stepId) {
        return this.sectionsLoader.getSectionStep(sectionId, stepId);
    }
}
exports.Hazeline = Hazeline;
//# sourceMappingURL=hazeline.js.map