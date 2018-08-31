"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var canvas_core_1 = require("./canvas.core");
var lightbox_core_1 = require("./lightbox.core");
var HazelineTutorialRunner = /** @class */ (function () {
    function HazelineTutorialRunner() {
        this.tutorialSections = [];
        this.tutorialStatus = new rxjs_1.BehaviorSubject(TutorialStatus.STOPPED);
        this.canvas = new canvas_core_1.HazelineCanvas();
    }
    HazelineTutorialRunner.prototype.addSection = function (section) {
        this.tutorialSections.push(section);
    };
    HazelineTutorialRunner.prototype.addSections = function (sections) {
        var _this = this;
        sections.forEach(function (s) { return _this.tutorialSections.push(s); });
    };
    HazelineTutorialRunner.prototype.runSection = function (sectionId) {
        var _this = this;
        var section = this.tutorialSections.find(function (s) { return s.id === sectionId; });
        if (!section) {
            throw new Error("HAZELINE-RUNNER: Cannot find the given section id: [" + sectionId + "]");
        }
        if (section.onStart) {
            section.onStart();
        }
        this.canvas.init();
        this.lightbox = new lightbox_core_1.HazelineLightbox();
        this.currentStepIndex = -1;
        window.addEventListener('resize', function () { return _this.pauseAndResume(sectionId); });
        window.addEventListener('scroll', function () { return _this.pauseAndResume(sectionId); });
        this.loadStep(this.tutorialSections.find(function (s) { return s.id === sectionId; }));
    };
    HazelineTutorialRunner.prototype.pauseAndResume = function (sectionId) {
        this.canvas.destroy();
        this.lightbox.destroy();
        this.canvas.init();
        this.lightbox = new lightbox_core_1.HazelineLightbox();
        this.currentStepIndex--;
        this.loadStep(this.tutorialSections.find(function (s) { return s.id === sectionId; }));
    };
    HazelineTutorialRunner.prototype.loadStep = function (section, backwards) {
        var _this = this;
        if (backwards) {
            this.currentStepIndex--;
            this.currentStepIndex = this.currentStepIndex === -1 ? 0 : this.currentStepIndex;
        }
        else {
            this.currentStepIndex++;
            this.currentStepIndex = this.currentStepIndex === section.steps.length ? this.currentStepIndex - 1 : this.currentStepIndex;
        }
        if (!section.steps[this.currentStepIndex]) {
            return;
        }
        var step = section.steps[this.currentStepIndex];
        this.lightbox.onNextBtnClick = function () {
            _this.loadStep(section);
        };
        this.lightbox.onPrevBtnClick = function () {
            _this.loadStep(section, true);
        };
        this.canvas.wrapElement(step.elementSelector);
        this.lightbox.showLightbox({
            text: step.text,
            disablePrev: this.currentStepIndex === 0 ? true : false,
            disableNext: this.currentStepIndex === section.steps.length - 1 ? true : false,
        });
    };
    return HazelineTutorialRunner;
}());
exports.HazelineTutorialRunner = HazelineTutorialRunner;
var TutorialStatus;
(function (TutorialStatus) {
    TutorialStatus[TutorialStatus["RUNNING"] = 0] = "RUNNING";
    TutorialStatus[TutorialStatus["STOPPED"] = 1] = "STOPPED";
})(TutorialStatus = exports.TutorialStatus || (exports.TutorialStatus = {}));
//# sourceMappingURL=tutorial-runner.core.js.map