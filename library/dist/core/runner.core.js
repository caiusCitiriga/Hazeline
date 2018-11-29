"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var tutorial_section_statuses_enum_1 = require("./enums/tutorial-section-statuses.enum");
var element_manager_core_1 = require("./element-manager.core");
var HazelineRunner = /** @class */ (function () {
    function HazelineRunner(lightbox, renderer, elementManager) {
        this._$sectionStatus = new rxjs_1.BehaviorSubject(null);
        this.currentSectionStep = 0;
        this.lightbox = lightbox;
        this.overlayRenderer = renderer;
        this.elementManager = elementManager;
        this.startNextPrevButtonClicks();
    }
    HazelineRunner.prototype.endTutorial = function () {
        this.lightbox.dispose();
        this.overlayRenderer.dispose();
    };
    HazelineRunner.prototype.runSection = function (section) {
        if (!section) {
            this._$sectionStatus.next({
                status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.errored,
                runningSection: section,
                runningStepInSection: null
            });
            return this._$sectionStatus;
        }
        this.currentSection = section;
        this.applyCustomStylesIfAny(section.globalStyling);
        var wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(section.steps[this.currentSectionStep].elementSelector);
        if (this.currentSectionStep > 0) {
            this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
        }
        else {
            this.overlayRenderer.wrapElement(wrapElementsDimensions);
            this._$sectionStatus.next({
                runningSection: section,
                status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.started,
                runningStepInSection: section.steps[this.currentSectionStep]
            });
        }
        this.lightbox.placeLightbox(element_manager_core_1.HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStep].elementSelector), section.steps[this.currentSectionStep], (section.steps.length - 1) === this.currentSectionStep);
        this.startResponsiveListeners();
        return this._$sectionStatus;
    };
    HazelineRunner.prototype.applyCustomStylesIfAny = function (styles) {
        if (!styles) {
            return;
        }
        if (styles.lightbox) {
            this.lightbox.applyStyles(styles.lightbox);
        }
        if (styles.overlay) {
            this.overlayRenderer.applyStyles(styles.overlay);
        }
    };
    HazelineRunner.prototype.startNextPrevButtonClicks = function () {
        var _this = this;
        this.lightbox.$nextStepRequired()
            .pipe(operators_1.filter(function (res) { return !!res; }), operators_1.filter(function () {
            if (_this.currentSectionStep === (_this.currentSection.steps.length - 1)) {
                _this._$sectionStatus.next({
                    runningSection: null,
                    runningStepInSection: null,
                    status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.ended
                });
                return false;
            }
            return true;
        }), operators_1.tap(function () { return _this.currentSectionStep++; }), operators_1.tap(function () { return _this.runSection(_this.currentSection); }), operators_1.tap(function () { return console.log('Loading next step'); })).subscribe();
        this.lightbox.$prevStepRequired()
            .pipe(operators_1.filter(function (res) { return !!res; }), operators_1.filter(function () { return _this.currentSectionStep === 0 ? false : true; }), operators_1.tap(function () { return _this.currentSectionStep--; }), operators_1.tap(function () { return _this.runSection(_this.currentSection); }), operators_1.tap(function () { return console.log('Loading previous step'); })).subscribe();
        this.overlayRenderer.$premartureEndRequired()
            .pipe(operators_1.filter(function (res) { return !!res; }), operators_1.tap(function () {
            _this._$sectionStatus.next({
                runningSection: null,
                runningStepInSection: null,
                status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.ended
            });
            _this._$sectionStatus.complete();
        }))
            .subscribe();
    };
    HazelineRunner.prototype.startResponsiveListeners = function () {
        var _this = this;
        window.addEventListener('resize', function () {
            var wrapElementsDimensions = _this.elementManager.getWrappingElementsDimensions(_this.currentSection.steps[_this.currentSectionStep].elementSelector);
            _this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            _this.lightbox.updateLightboxPlacement(element_manager_core_1.HazelineElementManager.getElementBySelector(_this.currentSection.steps[_this.currentSectionStep].elementSelector));
        });
        window.addEventListener('scroll', function () {
            var wrapElementsDimensions = _this.elementManager.getWrappingElementsDimensions(_this.currentSection.steps[_this.currentSectionStep].elementSelector);
            _this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            _this.lightbox.updateLightboxPlacement(element_manager_core_1.HazelineElementManager.getElementBySelector(_this.currentSection.steps[_this.currentSectionStep].elementSelector));
        });
    };
    return HazelineRunner;
}());
exports.HazelineRunner = HazelineRunner;
//# sourceMappingURL=runner.core.js.map