"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var tutorial_section_statuses_enum_1 = require("./enums/tutorial-section-statuses.enum");
var element_manager_core_1 = require("./element-manager.core");
var lightbox_renderer_core_1 = require("./lightbox-renderer.core");
var HazelineRunner = /** @class */ (function () {
    function HazelineRunner(lightbox, renderer, elementManager) {
        var _this = this;
        this._$runWhenSectionStepsArePopulated = new rxjs_1.Subject();
        this._$sectionStatus = new rxjs_1.BehaviorSubject(null);
        this.currentSectionStepIdx = 0;
        this.previousSectionStepIdx = 0;
        this.bodyOverflowsBackup = {
            x: undefined,
            y: undefined,
            overflow: undefined
        };
        this.windowResizeEvtListener = function () {
            var wrapElementsDimensions = _this.elementManager.getWrappingElementsDimensions(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector);
            if (_this.currentSection.steps[_this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
                _this.lightboxRenderer.updateTextualOverlayPlacement();
            }
            else {
                _this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
                _this.lightboxRenderer.updateLightboxPlacement(element_manager_core_1.HazelineElementManager.getElementBySelector(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector), _this.currentSection.steps[_this.currentSectionStepIdx], _this.isLastStep);
                ;
            }
        };
        this.windowScrollEvtListener = function () {
            // const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStepIdx].elementSelector);
            // if (this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
            //     this.lightboxRenderer.updateTextualOverlayPlacement();
            // } else {
            //     this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            //     this.lightboxRenderer.updateLightboxPlacement(
            //         HazelineElementManager.getElementBySelector(this.currentSection.steps[this.currentSectionStepIdx].elementSelector),
            //         this.currentSection.steps[this.currentSectionStepIdx],
            //         this.isLastStep
            //     );
            // }
        };
        this.lightboxRenderer = lightbox;
        this.overlayRenderer = renderer;
        this.elementManager = elementManager;
        this._$runWhenSectionStepsArePopulated
            .pipe(operators_1.take(1), operators_1.tap(function () {
            _this.startNextPrevButtonClicks();
            _this.startResponsiveListeners();
            _this.bodyOverflowsBackup = {
                x: document.body.style.overflowX,
                y: document.body.style.overflowY,
                overflow: document.body.style.overflow,
            };
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('body').style.overflowX = 'hidden';
            document.querySelector('body').style.overflowY = 'hidden';
        })).subscribe();
    }
    HazelineRunner.prototype.endTutorial = function () {
        this.overlayRenderer.dispose();
        this.lightboxRenderer.dispose(true);
        this.lightboxRenderer.disposeTextualOverlay(true);
        window.removeEventListener('resize', this.windowResizeEvtListener);
        window.removeEventListener('scroll', this.windowScrollEvtListener);
        document.querySelector('body').style.overflowX = this.bodyOverflowsBackup.x;
        document.querySelector('body').style.overflowY = this.bodyOverflowsBackup.y;
        document.querySelector('body').style.overflow = this.bodyOverflowsBackup.overflow;
    };
    HazelineRunner.prototype.runSection = function (section) {
        var _this = this;
        if (!this.sectionCanBeRan(section)) {
            return this._$sectionStatus;
        }
        this.isFirstStep = this.currentSectionStepIdx === 0;
        this.isLastStep = (section.steps.length - 1) === this.currentSectionStepIdx;
        this.thisStepUsesTextualOverlay = this.currentSection.steps[this.currentSectionStepIdx].useOverlayInsteadOfLightbox;
        this.previousStepUsedTextualOverlay = this.currentSectionStepIdx === 0
            ? false
            : this.currentSection.steps[this.previousSectionStepIdx].useOverlayInsteadOfLightbox;
        this.applyCustomOptionsIfAny(section.globalOptions);
        this.applyCustomOptionsIfAny(this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions, true);
        var wrapElementsDimensions = this.elementManager
            .getWrappingElementsDimensions(section.steps[this.currentSectionStepIdx].elementSelector);
        if (!this.isFirstStep && !this.thisStepUsesTextualOverlay) {
            this.lightboxRenderer.disposeTextualOverlay();
            try {
                this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            }
            catch (e) {
                this.overlayRenderer.wrapElement(wrapElementsDimensions);
            }
        }
        if (this.thisStepUsesTextualOverlay) {
            if (!this.previousStepUsedTextualOverlay) {
                this.lightboxRenderer.dispose();
                this.overlayRenderer.hideCurrentOverlays();
                this.overlayRenderer.removeEndTutorialButton();
            }
            var fadeOutBeforeRemoving = !this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions.textualOverlay.disableBgFadeIn;
            this.lightboxRenderer.disposeTextualOverlay(false, fadeOutBeforeRemoving)
                .pipe(operators_1.switchMap(function () {
                return _this.lightboxRenderer.placeTextOverlay(_this.currentSection.steps[_this.currentSectionStepIdx], _this.isLastStep);
            })).subscribe();
        }
        else {
            try {
                this.lightboxRenderer.updateLightboxPlacement(element_manager_core_1.HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStepIdx].elementSelector), section.steps[this.currentSectionStepIdx], this.isLastStep);
            }
            catch (_a) {
                this.lightboxRenderer.placeLightbox(element_manager_core_1.HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStepIdx].elementSelector), section.steps[this.currentSectionStepIdx], this.isLastStep);
            }
        }
        this._$sectionStatus.next({
            runningSection: section,
            status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.started,
            runningStepInSection: section.steps[this.currentSectionStepIdx]
        });
        this.overlayRenderer.placeEndTutorialButton();
        this.previousSectionStepIdx = this.currentSectionStepIdx;
        return this._$sectionStatus;
    };
    HazelineRunner.prototype.applyCustomOptionsIfAny = function (options, isDynamicOptions) {
        if (isDynamicOptions === void 0) { isDynamicOptions = false; }
        if (!options) {
            return;
        }
        if (options.overlay && !isDynamicOptions) {
            this.overlayRenderer.setGlobalOptions(options.overlay);
        }
        if (options.overlay && isDynamicOptions) {
            this.overlayRenderer.setDynamicOptions(options.overlay);
        }
        if (options.lightbox && !isDynamicOptions) {
            this.lightboxRenderer.setLightboxGlobalOptions(options.lightbox);
        }
        if (options.lightbox && isDynamicOptions) {
            this.lightboxRenderer.setLightboxDynamicOptions(options.lightbox);
        }
        if (options.textualOverlay && !isDynamicOptions) {
            this.lightboxRenderer.setTextualOverlayGlobalOptions(options.textualOverlay);
        }
        if (options.textualOverlay && isDynamicOptions) {
            this.lightboxRenderer.setTextualOverlayDynamicOptions(options.textualOverlay);
        }
    };
    HazelineRunner.prototype.startNextPrevButtonClicks = function () {
        var _this = this;
        var isNextStepRequired = undefined;
        this.lightboxRenderer.$eventTriggered()
            .pipe(operators_1.tap(function (eventTrigger) {
            isNextStepRequired = eventTrigger.type === lightbox_renderer_core_1.HazelineEventTrigger.next ? true : false;
            return eventTrigger;
        }), operators_1.filter(function (res) { return !!res; }), operators_1.filter(function () {
            //  If we've reached the last step
            if (isNextStepRequired && _this.currentSectionStepIdx === (_this.currentSection.steps.length - 1)) {
                _this._$sectionStatus.next({
                    runningSection: null,
                    runningStepInSection: null,
                    status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.ended
                });
                return false;
            }
            return true;
        }), operators_1.tap(function () { return isNextStepRequired ? _this.currentSectionStepIdx++ : _this.currentSectionStepIdx--; }), operators_1.tap(function () { return _this.overlayRenderer.removeEndTutorialButton(); }), operators_1.filter(function () { return !!_this.currentSection.steps && !!_this.currentSection.steps.length; }), operators_1.switchMap(function () { return rxjs_1.of(_this.currentSection.steps[_this.currentSectionStepIdx].delayBeforeStart); }), operators_1.tap(function (dealyAmount) {
            if (!dealyAmount) {
                _this.runSection(_this.currentSection);
                return false;
            }
            return true;
        }), operators_1.filter(function (applyDelay) { return !!applyDelay; }), operators_1.switchMap(function () {
            _this.overlayRenderer.dispose(); // TODO try to hide instead
            _this.lightboxRenderer.dispose();
            _this.lightboxRenderer.disposeTextualOverlay();
            var message = _this.currentSection.steps[_this.currentSectionStepIdx].delayText;
            var textColor = _this.currentSection.steps[_this.currentSectionStepIdx].delayTextColor;
            return _this.overlayRenderer.placeWaitForDelayOverlay(message, textColor);
        }), operators_1.switchMap(function () {
            var timeoutPassed = new rxjs_1.Subject();
            setTimeout(function () {
                _this.overlayRenderer.removeWaitForDelayOverlay();
                // TODO remember to show back
                timeoutPassed.next(true);
            }, _this.currentSection.steps[_this.currentSectionStepIdx].delayBeforeStart);
            return timeoutPassed;
        }), operators_1.tap(function () { return _this.runSection(_this.currentSection); })).subscribe();
        this.overlayRenderer.$premartureEndRequired()
            .pipe(operators_1.filter(function (res) { return !!res; }), operators_1.tap(function () {
            _this._$sectionStatus.next({
                runningSection: null,
                runningStepInSection: null,
                status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.ended
            });
            _this._$sectionStatus.complete();
        }), operators_1.tap(function () { return _this.overlayRenderer.removeEndTutorialButton(); })).subscribe();
    };
    HazelineRunner.prototype.sectionCanBeRan = function (section) {
        this.currentSection = section;
        this._$runWhenSectionStepsArePopulated.next(true);
        if (!this.currentSection) {
            this._$sectionStatus.next({
                status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.errored,
                runningSection: section,
                runningStepInSection: null
            });
            return false;
        }
        return true;
    };
    HazelineRunner.prototype.startResponsiveListeners = function () {
        window.addEventListener('resize', this.windowResizeEvtListener);
        window.addEventListener('scroll', this.windowScrollEvtListener);
    };
    return HazelineRunner;
}());
exports.HazelineRunner = HazelineRunner;
//# sourceMappingURL=runner.core.js.map