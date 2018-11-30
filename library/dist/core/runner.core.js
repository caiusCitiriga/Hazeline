"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var tutorial_section_statuses_enum_1 = require("./enums/tutorial-section-statuses.enum");
var element_manager_core_1 = require("./element-manager.core");
var HazelineRunner = /** @class */ (function () {
    function HazelineRunner(lightbox, renderer, elementManager) {
        var _this = this;
        this._$sectionStatus = new rxjs_1.BehaviorSubject(null);
        this.currentSectionStepIdx = 0;
        this.windowResizeEvtListener = function () {
            var wrapElementsDimensions = _this.elementManager.getWrappingElementsDimensions(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector);
            if (_this.currentSection.steps[_this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
                _this.lightbox.updateTextualOverlayPlacement();
            }
            else {
                _this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
                _this.lightbox.updateLightboxPlacement(element_manager_core_1.HazelineElementManager.getElementBySelector(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector));
            }
        };
        this.windowScrollEvtListener = function () {
            var wrapElementsDimensions = _this.elementManager.getWrappingElementsDimensions(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector);
            if (_this.currentSection.steps[_this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
                _this.lightbox.updateTextualOverlayPlacement();
            }
            else {
                _this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
                _this.lightbox.updateLightboxPlacement(element_manager_core_1.HazelineElementManager.getElementBySelector(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector));
            }
        };
        this.lightbox = lightbox;
        this.overlayRenderer = renderer;
        this.elementManager = elementManager;
        this.startNextPrevButtonClicks();
    }
    HazelineRunner.prototype.endTutorial = function () {
        this.lightbox.dispose(true);
        this.overlayRenderer.dispose();
        this.lightbox.disposeTextualOverlay(true);
        window.removeEventListener('resize', this.windowResizeEvtListener);
        window.removeEventListener('scroll', this.windowScrollEvtListener);
    };
    HazelineRunner.prototype.runSection = function (section) {
        this.currentSection = section;
        if (!this.currentSection) {
            this._$sectionStatus.next({
                status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.errored,
                runningSection: section,
                runningStepInSection: null
            });
            return this._$sectionStatus;
        }
        var isFirstStep = this.currentSectionStepIdx === 0;
        var isLastStep = (section.steps.length - 1) === this.currentSectionStepIdx;
        var thisStepUsesTextualOverlay = this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox;
        var previousStepUsedTextualOverlay = this.currentSectionStepIdx === 0
            ? false
            : this.currentSection.steps[this.currentSectionStepIdx - 1].useOverlayInsteadOfLightbox;
        this.applyCustomOptionsIfAny(section.globalOptions);
        this.applyCustomOptionsIfAny(this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions, true);
        var wrapElementsDimensions = this.elementManager
            .getWrappingElementsDimensions(section.steps[this.currentSectionStepIdx].elementSelector);
        if (!isFirstStep && !thisStepUsesTextualOverlay) {
            if (previousStepUsedTextualOverlay) {
                this.lightbox.disposeTextualOverlay();
                this.overlayRenderer.wrapElement(wrapElementsDimensions);
            }
            else {
                this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            }
        }
        if (thisStepUsesTextualOverlay) {
            if (!previousStepUsedTextualOverlay) {
                this.overlayRenderer.dispose();
            }
            ;
            var sub_1 = this.lightbox
                .placeTextOverlay(this.currentSection.steps[this.currentSectionStepIdx], isLastStep)
                .subscribe(function () { return sub_1.unsubscribe(); });
        }
        else {
            this.lightbox.placeLightbox(element_manager_core_1.HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStepIdx].elementSelector), section.steps[this.currentSectionStepIdx], isLastStep);
        }
        this._$sectionStatus.next({
            runningSection: section,
            status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.started,
            runningStepInSection: section.steps[this.currentSectionStepIdx]
        });
        this.startResponsiveListeners();
        this.overlayRenderer.placeEndTutorialButton();
        return this._$sectionStatus;
    };
    HazelineRunner.prototype.applyCustomOptionsIfAny = function (options, isDynamicOptions) {
        if (isDynamicOptions === void 0) { isDynamicOptions = false; }
        if (!options) {
            return;
        }
        if (options.lightbox && isDynamicOptions) {
            this.lightbox.setLightboxDynamicOptions(options.lightbox);
        }
        if (options.lightbox && !isDynamicOptions) {
            this.lightbox.setLightboxGlobalOptions(options.lightbox);
        }
        if (options.textualOverlay && isDynamicOptions) {
            this.lightbox.setTextualOverlayDynamicOptions(options.textualOverlay);
        }
        if (options.textualOverlay && !isDynamicOptions) {
            this.lightbox.setTextualOverlayGlobalOptions(options.textualOverlay);
        }
        if (options.overlay && isDynamicOptions) {
            this.overlayRenderer.setDynamicOptions(options.overlay);
        }
        if (options.overlay && !isDynamicOptions) {
            this.overlayRenderer.setGlobalOptions(options.overlay);
        }
    };
    HazelineRunner.prototype.startNextPrevButtonClicks = function () {
        var _this = this;
        this.lightbox.$nextStepRequired()
            .pipe(operators_1.filter(function (res) { return !!res; }), operators_1.filter(function () {
            if (_this.currentSectionStepIdx === (_this.currentSection.steps.length - 1)) {
                _this._$sectionStatus.next({
                    runningSection: null,
                    runningStepInSection: null,
                    status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.ended
                });
                return false;
            }
            return true;
        }), operators_1.tap(function () { return _this.currentSectionStepIdx++; }), operators_1.tap(function () { return _this.overlayRenderer.removeEndTutorialButton(); }), operators_1.tap(function () { return _this.runSection(_this.currentSection); })).subscribe();
        this.lightbox.$prevStepRequired()
            .pipe(operators_1.filter(function (res) { return !!res; }), operators_1.filter(function () { return _this.currentSectionStepIdx === 0 ? false : true; }), operators_1.tap(function () { return _this.currentSectionStepIdx--; }), operators_1.tap(function () { return _this.runSection(_this.currentSection); })).subscribe();
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
        window.addEventListener('resize', this.windowResizeEvtListener);
        window.addEventListener('scroll', this.windowScrollEvtListener);
    };
    return HazelineRunner;
}());
exports.HazelineRunner = HazelineRunner;
//# sourceMappingURL=runner.core.js.map