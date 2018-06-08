"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TutorialRunner {
    run(section) {
        if (!section) {
            console.log('HAZELINE: Cannot run a null section');
            return;
        }
        console.log(`Running section: ${section.id}`);
    }
}
exports.TutorialRunner = TutorialRunner;
//# sourceMappingURL=tutorial-runner.core.js.map