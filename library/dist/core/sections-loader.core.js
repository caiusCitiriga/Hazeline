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
}
exports.SectionsLoader = SectionsLoader;
//# sourceMappingURL=sections-loader.core.js.map