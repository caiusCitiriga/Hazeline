"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var elements_defaults_const_1 = require("./consts/elements-defaults.const");
var elements_ids_enum_1 = require("./enums/elements-ids.enum");
var tutorial_section_statuses_enum_1 = require("./enums/tutorial-section-statuses.enum");
var element_manager_core_1 = require("./element-manager.core");
var lightbox_renderer_core_1 = require("./lightbox-renderer.core");
var HazelineRunner = /** @class */ (function () {
    function HazelineRunner(lightbox, renderer, elementManager) {
        var _this = this;
        this._$onScrollEventsStream = new rxjs_1.Subject();
        this._$runWhenSectionStepsArePopulated = new rxjs_1.Subject();
        this._$sectionStatus = new rxjs_1.BehaviorSubject(null);
        this.currentSectionStepIdx = 0;
        this.previousSectionStepIdx = 0;
        this.windowResizeEvtListener = function () {
            var wrapElementsDimensions = _this.getWrappingDimensions();
            if (_this.currentSection.steps[_this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
                _this.lightboxRenderer.updateTextualOverlayPlacement();
            }
            else {
                _this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
                _this.lightboxRenderer.updateLightboxPlacement(element_manager_core_1.HazelineElementManager.getElementBySelector(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector), _this.currentSection.steps[_this.currentSectionStepIdx], _this.isLastStep);
                ;
            }
        };
        this.windowScrollEventThrottler = function () {
            _this._$onScrollEventsStream.next(true);
        };
        this.lightboxRenderer = lightbox;
        this.overlayRenderer = renderer;
        this.elementManager = elementManager;
        this._$runWhenSectionStepsArePopulated
            .pipe(operators_1.take(1), operators_1.tap(function () {
            _this.startResponsiveListeners();
            _this.startNextPrevButtonClicks();
            _this.actualWindowScrollEvtListener();
        })).subscribe();
    }
    HazelineRunner.prototype.endTutorial = function () {
        this.overlayRenderer.dispose();
        this.lightboxRenderer.dispose(true);
        this.lightboxRenderer.disposeTextualOverlay(true);
        window.removeEventListener('resize', this.windowResizeEvtListener);
        window.removeEventListener('scroll', this.windowScrollEventThrottler);
    };
    HazelineRunner.prototype.runSection = function (section) {
        var _this = this;
        if (!this.sectionCanBeRan(section)) {
            return this._$sectionStatus;
        }
        if (!this.currentSection.steps[this.currentSectionStepIdx].onBeforeStart) {
            this.currentSection.steps[this.currentSectionStepIdx].onBeforeStart = function () { return new Promise(function (res) { return res(); }); };
        }
        var wrapElementsDimensions;
        rxjs_1.from(this.currentSection.steps[this.currentSectionStepIdx].onBeforeStart())
            .pipe(operators_1.tap(function () {
            _this.isFirstStep = _this.currentSectionStepIdx === 0;
            _this.isLastStep = (section.steps.length - 1) === _this.currentSectionStepIdx;
            _this.thisStepUsesTextualOverlay = _this.currentSection.steps[_this.currentSectionStepIdx].useOverlayInsteadOfLightbox;
            _this.previousStepUsedTextualOverlay = _this.currentSectionStepIdx === 0
                ? false
                : _this.currentSection.steps[_this.previousSectionStepIdx].useOverlayInsteadOfLightbox;
        }), operators_1.tap(function () {
            _this.applyCustomOptionsIfAny(section.globalOptions);
            _this.applyCustomOptionsIfAny(_this.currentSection.steps[_this.currentSectionStepIdx].dynamicOptions, true);
        }), operators_1.tap(function () { return wrapElementsDimensions = _this.getWrappingDimensions(); }), operators_1.tap(function () {
            if (!_this.isFirstStep && !_this.thisStepUsesTextualOverlay) {
                _this.lightboxRenderer.disposeTextualOverlay();
                _this.overlayRenderer.updateElementsDimensions(wrapElementsDimensions);
            }
        }), operators_1.tap(function () {
            if (_this.thisStepUsesTextualOverlay) {
                if (!_this.previousStepUsedTextualOverlay) {
                    _this.lightboxRenderer.dispose();
                    _this.overlayRenderer.hideCurrentOverlays();
                    _this.overlayRenderer.removeEndTutorialButton();
                }
                var fadeOutBeforeRemoving = true;
                if (_this.currentSection.steps[_this.currentSectionStepIdx].dynamicOptions.textualOverlay) {
                    fadeOutBeforeRemoving = !_this.currentSection.steps[_this.currentSectionStepIdx].dynamicOptions.textualOverlay.disableBgFadeIn;
                }
                _this.lightboxRenderer.disposeTextualOverlay(false, fadeOutBeforeRemoving)
                    .pipe(operators_1.switchMap(function () {
                    return _this.lightboxRenderer.placeTextOverlay(_this.currentSection.steps[_this.currentSectionStepIdx], _this.isLastStep);
                })).subscribe();
            }
            else {
                try {
                    _this.lightboxRenderer.updateLightboxPlacement(element_manager_core_1.HazelineElementManager.getElementBySelector(section.steps[_this.currentSectionStepIdx].elementSelector), section.steps[_this.currentSectionStepIdx], _this.isLastStep);
                }
                catch (_a) {
                    _this.lightboxRenderer.placeLightbox(element_manager_core_1.HazelineElementManager.getElementBySelector(section.steps[_this.currentSectionStepIdx].elementSelector), section.steps[_this.currentSectionStepIdx], _this.isLastStep);
                }
            }
        }), operators_1.tap(function () {
            if (_this.currentSection.steps[_this.currentSectionStepIdx].nextStepCustomTrigger) {
                if (_this.currentSection.steps[_this.currentSectionStepIdx].nextStepCustomTrigger.disableDefaultNextPrevBtns) {
                    _this.lightboxRenderer.disableNextPrevBtns();
                }
                _this.lightboxRenderer.attachCustomNextEventListenerOnElement({
                    step: _this.currentSection.steps[_this.currentSectionStepIdx],
                    event: _this.currentSection.steps[_this.currentSectionStepIdx].nextStepCustomTrigger.event,
                    listener: _this.currentSection.steps[_this.currentSectionStepIdx].nextStepCustomTrigger.callback,
                    element: element_manager_core_1.HazelineElementManager.getElementBySelector(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector),
                });
            }
        }), operators_1.tap(function () { return _this._$sectionStatus.next({
            runningSection: section,
            status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.started,
            runningStepInSection: section.steps[_this.currentSectionStepIdx]
        }); }), operators_1.tap(function () { return _this.overlayRenderer.placeEndTutorialButton(); }), operators_1.tap(function () { return _this.previousSectionStepIdx = _this.currentSectionStepIdx; })).subscribe();
        return this._$sectionStatus;
    };
    HazelineRunner.prototype.actualWindowScrollEvtListener = function () {
        var _this = this;
        var lightboxObj = document.getElementById(elements_ids_enum_1.HazelineElementsIds.lightbox);
        var lightboxTransitionPropsBackup;
        if (!!lightboxObj) {
            lightboxTransitionPropsBackup = lightboxObj.style.transition;
        }
        this._$onScrollEventsStream
            .pipe(operators_1.debounceTime(5), operators_1.filter(function () {
            if (_this.currentSection.steps[_this.currentSectionStepIdx].useOverlayInsteadOfLightbox) {
                _this.lightboxRenderer.updateTextualOverlayPlacement();
                return false;
            }
            return true;
        }), operators_1.tap(function () {
            if (!!lightboxObj) {
                lightboxObj.style.transition = 'none';
            }
        }), operators_1.tap(function () { return _this.overlayRenderer.dispose(); }), operators_1.tap(function () {
            var wrapElementsDimensions = _this.getWrappingDimensions();
            _this.overlayRenderer.wrapElement(wrapElementsDimensions);
        }), operators_1.tap(function () { return _this.lightboxRenderer.updateLightboxPlacement(element_manager_core_1.HazelineElementManager.getElementBySelector(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector), _this.currentSection.steps[_this.currentSectionStepIdx], _this.isLastStep); }), operators_1.tap(function () { return _this.lightboxRenderer.showLightbox(); }), operators_1.delay(500), operators_1.tap(function () {
            if (!!lightboxObj) {
                lightboxObj.style.transition = lightboxTransitionPropsBackup;
            }
        })).subscribe();
    };
    ;
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
    HazelineRunner.prototype.getWrappingDimensions = function () {
        var dynamicOverlayOpts = this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions
            ? !!this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions.overlay ? this.currentSection.steps[this.currentSectionStepIdx].dynamicOptions.overlay : {}
            : {};
        var globalOverlayOpts = this.currentSection.globalOptions
            ? !!this.currentSection.globalOptions.overlay ? this.currentSection.globalOptions.overlay : {}
            : {};
        var mergedOptions = Object.assign({}, elements_defaults_const_1.HazelineElementsDefaults.overlay, globalOverlayOpts, dynamicOverlayOpts);
        return this.elementManager
            .getWrappingElementsDimensions(this.currentSection.steps[this.currentSectionStepIdx].elementSelector, mergedOptions);
    };
    HazelineRunner.prototype.startNextPrevButtonClicks = function () {
        var _this = this;
        var isNextStepRequired = undefined;
        this.lightboxRenderer.$eventTriggered()
            .pipe(operators_1.tap(function (eventTrigger) {
            isNextStepRequired = eventTrigger.type === lightbox_renderer_core_1.HazelineEventTrigger.next ? true : false;
            return eventTrigger;
        }), operators_1.filter(function (res) { return !!res; }), operators_1.tap(function () {
            if (!_this.currentSection.steps[_this.currentSectionStepIdx].onBeforeEnd) {
                _this.currentSection.steps[_this.currentSectionStepIdx].onBeforeEnd = function () { return new Promise(function (res) { return res(); }); };
            }
        }), operators_1.switchMap(function () { return rxjs_1.from(_this.currentSection.steps[_this.currentSectionStepIdx].onBeforeEnd()); }), operators_1.filter(function () {
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
        }), operators_1.tap(function () {
            if (_this.currentSection.steps[_this.currentSectionStepIdx].nextStepCustomTrigger) {
                if (_this.currentSection.steps[_this.currentSectionStepIdx].nextStepCustomTrigger.disableDefaultNextPrevBtns) {
                    _this.lightboxRenderer.enableNextPrevBtns();
                }
                _this.lightboxRenderer.detachCustomEventsListeners({
                    event: _this.currentSection.steps[_this.currentSectionStepIdx].nextStepCustomTrigger.event,
                    element: element_manager_core_1.HazelineElementManager.getElementBySelector(_this.currentSection.steps[_this.currentSectionStepIdx].elementSelector)
                });
            }
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
        window.addEventListener('scroll', this.windowScrollEventThrottler);
    };
    return HazelineRunner;
}());
exports.HazelineRunner = HazelineRunner;
//# sourceMappingURL=runner.core.js.map