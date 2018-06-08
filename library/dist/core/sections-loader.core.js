"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SectionsLoader {
    constructor() {
        this.tutorialSections = [];
    }
    addSection(section) {
        this.tutorialSections.push(section);
    }
    addSections(sections) {
        sections.forEach(s => this.tutorialSections.push(s));
    }
    getTutorialSection(id) {
        const section = this.tutorialSections.find(s => s.id === id);
        return !!section ? section : null;
    }
    getSectionStep(sectionId, stepId) {
        let sectionStep;
        this.tutorialSections.forEach(s => {
            if (s.id === sectionId) {
                sectionStep = s.steps.find(ss => ss.id === stepId);
            }
        });
        return !!sectionStep ? sectionStep : null;
    }
}
exports.SectionsLoader = SectionsLoader;
//# sourceMappingURL=sections-loader.core.js.map