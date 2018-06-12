"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const drawer_core_1 = require("./drawer.core");
const tutorial_statuses_enum_1 = require("../enums/tutorial-statuses.enum");
class TutorialRunner {
    constructor() {
        this._$tutorialStatus = new rxjs_1.BehaviorSubject(null);
    }
    get $tutorialStatus() {
        return this._$tutorialStatus;
    }
    run(section) {
        if (!section) {
            console.log('HAZELINE: Cannot run a null section');
            return;
        }
        this.ensureAllStepsElementsExistsOrThrow(section);
        this.runInternal(section);
    }
    ensureAllStepsElementsExistsOrThrow(section) {
        section.steps.forEach(sectionStep => {
            if (!this.getElement(sectionStep.selector).length) {
                throw new Error(`HAZELINE: The element cannot be found on the page. SELECTOR: ${sectionStep.selector} ID: ${sectionStep.id}`);
            }
        });
    }
    getElement(selector) {
        return jquery_1.default(selector) || null;
    }
    runInternal(section) {
        this.initializeTutorial(section);
        drawer_core_1.Drawer
            .drawCloth()
            .pipe(operators_1.filter(res => !!res), operators_1.tap(res => {
            section.steps.forEach((step, idx) => {
                setTimeout(() => {
                    drawer_core_1.Drawer.drawBlocksAroundTutorialStepElement(step);
                }, 100 * idx);
            });
            this.finalizeTutorial(section);
        }))
            .subscribe();
    }
    initializeTutorial(section) {
        if (section.onStart) {
            section.onStart();
        }
        this._$tutorialStatus.next({
            runningSection: section,
            tutorialStatus: tutorial_statuses_enum_1.TutorialStatuses.Started
        });
    }
    finalizeTutorial(section) {
        if (section.onEnd) {
            section.onEnd();
        }
        this._$tutorialStatus.next({
            runningSection: null,
            tutorialStatus: tutorial_statuses_enum_1.TutorialStatuses.Stopped
        });
    }
}
exports.TutorialRunner = TutorialRunner;
//# sourceMappingURL=tutorial-runner.core.js.map