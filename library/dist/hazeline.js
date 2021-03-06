"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var runner_core_1 = require("./core/runner.core");
var element_manager_core_1 = require("./core/element-manager.core");
var overlay_renderer_core_1 = require("./core/overlay-renderer.core");
var lightbox_renderer_core_1 = require("./core/lightbox-renderer.core");
var tutorial_statuses_enum_1 = require("./core/enums/tutorial-statuses.enum");
var tutorial_section_statuses_enum_1 = require("./core/enums/tutorial-section-statuses.enum");
var Hazeline = /** @class */ (function () {
    function Hazeline() {
        this._$tutorialStatus = new rxjs_1.BehaviorSubject(null);
        this.tutorialSections = [];
        this.lightbox = new lightbox_renderer_core_1.HazelineLightboxRenderer();
        this.renderer = new overlay_renderer_core_1.HazelineOverlayRenderer();
        this.elementManager = new element_manager_core_1.HazelineElementManager();
        this.runner = new runner_core_1.HazelineRunner(this.lightbox, this.renderer, this.elementManager);
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
        if (!sectionToRun.onBeforeStart) {
            sectionToRun.onBeforeStart = function () { return new Promise(function (res, rej) { return res(true); }); };
        }
        if (!sectionToRun.onBeforeEnd) {
            sectionToRun.onBeforeEnd = function () { return new Promise(function (res, rej) { return res(true); }); };
        }
        rxjs_1.from(sectionToRun.onBeforeStart()).pipe(operators_1.switchMap(function () { return _this.runner.runSection(sectionToRun); }), operators_1.filter(function (status) { return !!status; }), operators_1.switchMap(function (status) {
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
            return rxjs_1.of(status);
        }), operators_1.tap(function (status) {
            if (status && status.status !== tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.started) {
                sectionToRun.onBeforeEnd().then(function () {
                    _this.runner.endTutorial();
                    _this.lightbox.dispose();
                    _this.renderer.dispose();
                    _this.renderer = new overlay_renderer_core_1.HazelineOverlayRenderer();
                    _this.lightbox = new lightbox_renderer_core_1.HazelineLightboxRenderer();
                    _this.runner = new runner_core_1.HazelineRunner(_this.lightbox, _this.renderer, _this.elementManager);
                });
            }
        })).subscribe();
        return this._$tutorialStatus;
    };
    return Hazeline;
}());
exports.Hazeline = Hazeline;
//# sourceMappingURL=hazeline.js.map