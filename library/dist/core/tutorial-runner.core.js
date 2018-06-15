"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const tutorial_statuses_enum_1 = require("../enums/tutorial-statuses.enum");
const next_step_possibilities_enum_1 = require("../enums/next-step-possibilities.enum");
const drawer_core_1 = require("./drawer.core");
class TutorialRunner {
    constructor() {
        this._$tutorialStatus = new rxjs_1.BehaviorSubject(null);
        this.currentTutorialStep = 0;
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
            .pipe(operators_1.filter(clothIsReady => !!clothIsReady), operators_1.switchMap(() => drawer_core_1.Drawer.drawStep(section.steps[this.currentTutorialStep], true, false)), operators_1.tap(nextStep => {
            if (nextStep === next_step_possibilities_enum_1.NextStepPossibilities.FORWARD) {
                this.loadNextStep(section);
            }
            if (nextStep === next_step_possibilities_enum_1.NextStepPossibilities.BACKWARD) {
                this.loadPreviousStep(section);
            }
            if (nextStep === next_step_possibilities_enum_1.NextStepPossibilities.FINISHED) {
                this.finalizeTutorial(section);
            }
        }))
            .subscribe();
    }
    loadNextStep(section) {
        if (this.currentTutorialStep === section.steps.length - 1) {
            this.finalizeTutorial(section);
            return;
        }
        this.currentTutorialStep++;
        const isFirstStep = this.currentTutorialStep === 0;
        const isLastStep = this.currentTutorialStep === section.steps.length - 1;
        drawer_core_1.Drawer.drawStep(section.steps[this.currentTutorialStep], isFirstStep, isLastStep)
            .subscribe();
    }
    loadPreviousStep(section) {
        if (this.currentTutorialStep === 0) {
            return;
        }
        this.currentTutorialStep--;
        const isFirstStep = this.currentTutorialStep === 0;
        const isLastStep = this.currentTutorialStep === section.steps.length - 1;
        drawer_core_1.Drawer.drawStep(section.steps[this.currentTutorialStep], isFirstStep, isLastStep)
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
        this.currentTutorialStep = 0;
        drawer_core_1.Drawer.removeEverything();
        this._$tutorialStatus.next({
            runningSection: null,
            tutorialStatus: tutorial_statuses_enum_1.TutorialStatuses.Stopped
        });
    }
}
exports.TutorialRunner = TutorialRunner;
//# sourceMappingURL=tutorial-runner.core.js.map