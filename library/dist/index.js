"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var runner_core_1 = require("./core/runner.core");
var lightbox_core_1 = require("./core/lightbox.core");
var renderer_core_1 = require("./core/renderer.core");
var styles_manager_core_1 = require("./core/styles-manager.core");
var element_manager_core_1 = require("./core/element-manager.core");
var tutorial_statuses_enum_1 = require("./core/enums/tutorial-statuses.enum");
var tutorial_section_statuses_enum_1 = require("./core/enums/tutorial-section-statuses.enum");
var Hazeline = /** @class */ (function () {
    function Hazeline() {
        this._$tutorialStatus = new rxjs_1.BehaviorSubject(null);
        this.tutorialSections = [];
        this.lightbox = new lightbox_core_1.HazelineLightbox();
        this.renderer = new renderer_core_1.HazelineRenderer();
        this.stylesManager = new styles_manager_core_1.HazelineStylesManager();
        this.elementManager = new element_manager_core_1.HazelineElementManager();
        this.runner = new runner_core_1.HazelineRunner(this.lightbox, this.renderer, this.stylesManager, this.elementManager);
    }
    Hazeline.prototype.addSection = function (section, clearPreviousSections) {
        if (clearPreviousSections === void 0) { clearPreviousSections = false; }
        if (!!clearPreviousSections) {
            this.clearSections();
        }
        this.tutorialSections.push(section);
    };
    Hazeline.prototype.clearSections = function () {
        this.tutorialSections = [];
    };
    Hazeline.prototype.runTutorial = function (sectionId) {
        var _this = this;
        var sectionToRun = this.tutorialSections.find(function (s) { return s.id === sectionId; });
        if (!sectionToRun) {
            this._$tutorialStatus.next({
                runningSection: null,
                runningStepInSection: null,
                status: tutorial_statuses_enum_1.HazelineTutorialStatuses.errored,
            });
        }
        this.runner.runSection(sectionToRun)
            .pipe(operators_1.tap(function (status) {
            if (status.status === tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.errored) {
                _this._$tutorialStatus.next({
                    status: tutorial_statuses_enum_1.HazelineTutorialStatuses.errored,
                    runningSection: status.runningSection,
                    runningStepInSection: status.runningStepInSection
                });
            }
            if (status.status === tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.started) {
                _this._$tutorialStatus.next({
                    status: tutorial_statuses_enum_1.HazelineTutorialStatuses.started,
                    runningSection: status.runningSection,
                    runningStepInSection: status.runningStepInSection
                });
            }
            if (status.status === tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.ended) {
                _this._$tutorialStatus.next({
                    status: tutorial_statuses_enum_1.HazelineTutorialStatuses.stopped,
                    runningSection: status.runningSection,
                    runningStepInSection: status.runningStepInSection
                });
            }
        })).subscribe();
        return this._$tutorialStatus;
    };
    return Hazeline;
}());
exports.Hazeline = Hazeline;
//# sourceMappingURL=index.js.map