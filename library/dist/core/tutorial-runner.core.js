"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var canvas_core_1 = require("./canvas.core");
var lightbox_core_1 = require("./lightbox.core");
var HazelineTutorialRunner = /** @class */ (function () {
    function HazelineTutorialRunner() {
        this.tutorialSections = [];
        this.currentStep = new rxjs_1.BehaviorSubject(null);
        this.currentSection = new rxjs_1.BehaviorSubject(null);
        this.tutorialStatus = new rxjs_1.BehaviorSubject(TutorialStatus.STOPPED);
        this.canvas = new canvas_core_1.HazelineCanvas();
        this.lightbox = new lightbox_core_1.HazelineLightbox();
    }
    HazelineTutorialRunner.prototype.addSection = function (section) {
        this.tutorialSections.push(section);
    };
    HazelineTutorialRunner.prototype.addSections = function (sections) {
        var _this = this;
        sections.forEach(function (s) { return _this.tutorialSections.push(s); });
    };
    HazelineTutorialRunner.prototype.setOverlayBackground = function (color) {
        this.canvas.setCanvasBGColor(color);
    };
    HazelineTutorialRunner.prototype.runSection = function (sectionId) {
        var _this = this;
        this.currentSection.next(this.tutorialSections.find(function (s) { return s.id === sectionId; }));
        if (!this.currentSection.getValue()) {
            throw new Error("HAZELINE-RUNNER: Cannot find the given section id: [" + sectionId + "]");
        }
        if (this.currentSection.getValue().onStart) {
            this.currentSection.getValue().onStart();
        }
        this.canvas.init();
        this.currentStepIndex = -1;
        window.addEventListener('resize', function () { return _this.pauseAndResume(sectionId); });
        window.addEventListener('scroll', function () { return _this.pauseAndResume(sectionId); });
        this.loadStep();
    };
    HazelineTutorialRunner.prototype.pauseAndResume = function (sectionId) {
        this.canvas.destroy();
        this.lightbox.destroy();
        this.canvas.init();
        this.lightbox.init({
            text: this.currentStep.getValue().text,
            elementSelector: this.currentStep.getValue().elementSelector,
            disablePrev: this.currentStepIndex === 0 ? true : false,
            disableNext: this.currentStepIndex === this.currentSection.getValue().steps.length - 1 ? true : false,
        });
        this.lightbox = new lightbox_core_1.HazelineLightbox();
        this.currentStepIndex--;
        this.loadStep();
    };
    HazelineTutorialRunner.prototype.loadStep = function (backwards) {
        var _this = this;
        if (backwards) {
            this.currentStepIndex--;
            this.currentStepIndex = this.currentStepIndex === -1 ? 0 : this.currentStepIndex;
        }
        else {
            this.currentStepIndex++;
            this.currentStepIndex = this.currentStepIndex === this.currentSection.getValue().steps.length ? this.currentStepIndex - 1 : this.currentStepIndex;
        }
        if (!this.currentSection.getValue().steps[this.currentStepIndex]) {
            return;
        }
        this.currentStep.next(this.currentSection.getValue().steps[this.currentStepIndex]);
        this.lightbox.onNextBtnClick = function () {
            _this.loadStep();
            _this.lightbox.init({
                text: _this.currentStep.getValue().text,
                elementSelector: _this.currentStep.getValue().elementSelector,
                disablePrev: _this.currentStepIndex === 0 ? true : false,
                disableNext: _this.currentStepIndex === _this.currentSection.getValue().steps.length - 1 ? true : false,
            });
        };
        this.lightbox.onPrevBtnClick = function () {
            _this.loadStep(true);
            _this.lightbox.init({
                text: _this.currentStep.getValue().text,
                elementSelector: _this.currentStep.getValue().elementSelector,
                disablePrev: _this.currentStepIndex === 0 ? true : false,
                disableNext: _this.currentStepIndex === _this.currentSection.getValue().steps.length - 1 ? true : false,
            });
        };
        this.canvas.wrapElement(this.currentStep.getValue().elementSelector);
        this.lightbox.init({
            text: this.currentStep.getValue().text,
            elementSelector: this.currentStep.getValue().elementSelector,
            disablePrev: this.currentStepIndex === 0 ? true : false,
            disableNext: this.currentStepIndex === this.currentSection.getValue().steps.length - 1 ? true : false,
        });
        this.lightbox.showLightbox();
    };
    return HazelineTutorialRunner;
}());
exports.HazelineTutorialRunner = HazelineTutorialRunner;
var TutorialStatus;
(function (TutorialStatus) {
    TutorialStatus[TutorialStatus["RUNNING"] = 0] = "RUNNING";
    TutorialStatus[TutorialStatus["STOPPED"] = 1] = "STOPPED";
})(TutorialStatus = exports.TutorialStatus || (exports.TutorialStatus = {}));
