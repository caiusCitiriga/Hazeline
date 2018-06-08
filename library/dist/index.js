"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sections_loader_core_1 = require("./core/sections-loader.core");
const tutorial_runner_core_1 = require("./core/tutorial-runner.core");
class Hazeline {
    constructor() {
        this.sectionsLoader = new sections_loader_core_1.SectionsLoader();
        this.tutorialRunner = new tutorial_runner_core_1.TutorialRunner();
    }
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
//# sourceMappingURL=index.js.map