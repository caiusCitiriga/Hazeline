"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tether_1 = __importDefault(require("tether"));
var rxjs_1 = require("rxjs");
var elements_ids_enum_1 = require("./enums/elements-ids.enum");
var elements_defaults_const_1 = require("./consts/elements-defaults.const");
var styles_manager_core_1 = require("./styles-manager.core");
var HazelineLightboxRenderer = /** @class */ (function () {
    function HazelineLightboxRenderer() {
        var _this = this;
        this._$nextStepRequired = new rxjs_1.Subject();
        this._$prevStepRequired = new rxjs_1.Subject();
        this.ligthboxOptions = elements_defaults_const_1.HazelineElementsDefaults.lightbox;
        this.textualOverlayOptions = elements_defaults_const_1.HazelineElementsDefaults.textualOverlay;
        this.prevBtnClickEvtListener = function () {
            return _this._$prevStepRequired.next(true);
        };
        this.nextBtnClickEvtListener = function () { console.log('Next step required'); _this._$nextStepRequired.next(true); };
        this.prevBtnMouseLeaveEvtListener = function () {
            return styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, _this.ligthboxOptions.lightboxPrevBtnCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxPrevBtnCSS);
        };
        this.prevBtnMouseEnterEvtListener = function () {
            return styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, _this.ligthboxOptions.lightboxPrevBtnHoverCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxPrevBtnHoverCSS);
        };
        this.nextBtnMouseLeaveEvtListener = function () {
            return styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, _this.ligthboxOptions.lightboxNextBtnCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxNextBtnCSS);
        };
        this.nextBtnMouseEnterEvtListener = function () {
            return styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, _this.ligthboxOptions.lightboxNextBtnHoverCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxNextBtnHoverCSS);
        };
    }
    HazelineLightboxRenderer.prototype.$nextStepRequired = function () { return this._$nextStepRequired; };
    HazelineLightboxRenderer.prototype.$prevStepRequired = function () { return this._$prevStepRequired; };
    HazelineLightboxRenderer.prototype.dispose = function (detachListeners) {
        if (detachListeners === void 0) { detachListeners = false; }
        if (document.getElementById(elements_ids_enum_1.HazelineElementsIds.lightbox)) {
            if (detachListeners) {
                this.detachNextPrevEventsListeneres();
                this.detachNextPrevHoverModesEventsListeners();
            }
            this.tether.disable();
            this.tether.destroy();
            this.tether = null;
            document.body.removeChild(this.lightboxWrp);
        }
    };
    HazelineLightboxRenderer.prototype.disposeTextualOverlay = function (detachListeners, fadeOutBeforeRemoving) {
        var _this = this;
        if (detachListeners === void 0) { detachListeners = false; }
        if (fadeOutBeforeRemoving === void 0) { fadeOutBeforeRemoving = false; }
        var elementRemoved = new rxjs_1.Subject();
        if (document.getElementById(elements_ids_enum_1.HazelineElementsIds.lightboxTextualOverlay)) {
            if (detachListeners) {
                this.detachNextPrevHoverModesEventsListeners();
            }
            this.textualOverlay.removeEventListener('click', this.nextBtnClickEvtListener);
            //  Restore the original lightbox event listeners
            this.prevBtnMouseLeaveEvtListener = function () {
                return styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, _this.ligthboxOptions.lightboxPrevBtnCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxPrevBtnCSS);
            };
            this.prevBtnMouseEnterEvtListener = function () {
                return styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, _this.ligthboxOptions.lightboxPrevBtnHoverCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxPrevBtnHoverCSS);
            };
            this.nextBtnMouseLeaveEvtListener = function () {
                return styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, _this.ligthboxOptions.lightboxNextBtnCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxNextBtnCSS);
            };
            this.nextBtnMouseEnterEvtListener = function () {
                return styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, _this.ligthboxOptions.lightboxNextBtnHoverCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxNextBtnHoverCSS);
            };
            this.attachNextPrevEventsListeneres();
            this.attachNextPrevHoverModesEventsListeners();
            if (fadeOutBeforeRemoving) {
                this.textualOverlay.style.opacity = '0';
                setTimeout(function () {
                    document.body.removeChild(_this.textualOverlay);
                    _this.textualOverlay = null;
                    _this.textualOverlayParagraph = null;
                    elementRemoved.next(true);
                }, this.textualOverlayOptions.bgFadeInTimeInMs || 0);
                return elementRemoved;
            }
            document.body.removeChild(this.textualOverlay);
            this.textualOverlay = null;
            this.textualOverlayParagraph = null;
            rxjs_1.timer(10).subscribe(function () { return elementRemoved.next(true); });
            return elementRemoved;
        }
        rxjs_1.timer(10).subscribe(function () { return elementRemoved.next(true); });
        return elementRemoved;
    };
    HazelineLightboxRenderer.prototype.placeLightbox = function (target, sectionStep, isLastStep) {
        if (isLastStep === void 0) { isLastStep = false; }
        this.lightboxWrp = document.getElementById(elements_ids_enum_1.HazelineElementsIds.lightbox);
        if (!this.lightboxWrp) {
            this.createLightbox();
            document.body.prepend(this.lightboxWrp); // not fully supported. See browser tables
        }
        this.applyTexts(sectionStep, isLastStep);
        this.styleWholeLigthboxElement();
        this.updateLightboxPlacement(target);
    };
    HazelineLightboxRenderer.prototype.placeTextOverlay = function (sectionStep, isLastStep) {
        var _this = this;
        if (isLastStep === void 0) { isLastStep = false; }
        var overlayPlaced = new rxjs_1.BehaviorSubject(null);
        this.createLightboxButtons();
        this.setButttonsIds();
        this.lightboxPrevBtn.innerText = this.ligthboxOptions.prevBtnText;
        this.lightboxNextBtn.innerText = isLastStep ? this.ligthboxOptions.lastStepNextBtnText : this.ligthboxOptions.nextBtnText;
        this.lightboxNextBtn = styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxNextBtn, this.textualOverlayOptions.prevNextButtonsCSS);
        this.lightboxPrevBtn = styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxPrevBtn, this.textualOverlayOptions.prevNextButtonsCSS);
        this.attachNextPrevEventsListeneres();
        this.textualOverlayParagraph = document.createElement('div');
        this.textualOverlayParagraph.innerHTML = sectionStep.text;
        this.textualOverlayParagraph = styles_manager_core_1.HazelineStylesManager.styleElement(this.textualOverlayParagraph, this.textualOverlayOptions.paragraphCSS);
        this.textualOverlay = document.createElement('div');
        this.textualOverlay.id = elements_ids_enum_1.HazelineElementsIds.lightboxTextualOverlay;
        this.textualOverlay = styles_manager_core_1.HazelineStylesManager.styleElement(this.textualOverlay, this.textualOverlayOptions.overlayCSS);
        if (!this.textualOverlayOptions.hideButtons) {
            this.textualOverlay.appendChild(this.lightboxPrevBtn);
            this.textualOverlay.appendChild(this.textualOverlayParagraph);
            this.textualOverlay.appendChild(this.lightboxNextBtn);
        }
        else {
            this.textualOverlay.appendChild(this.textualOverlayParagraph);
        }
        if (this.textualOverlayOptions.hideButtons || this.textualOverlayOptions.clickAnywhereForNextStep) {
            //  remove previously added listener if any
            this.textualOverlay.removeEventListener('click', this.nextBtnClickEvtListener);
            this.textualOverlay.addEventListener('click', this.nextBtnClickEvtListener);
            this.textualOverlay.style.cursor = 'pointer';
        }
        else {
            this.textualOverlay.style.cursor = 'default';
        }
        this.dispose();
        document.body.prepend(this.textualOverlay);
        setTimeout(function () {
            _this.textualOverlay.style.opacity = _this.textualOverlayOptions.overlayBgFadeInOpacity.toString();
            setTimeout(function () {
                _this.textualOverlayParagraph.style.opacity = _this.textualOverlayOptions.overlayParagraphFadeInOpacity.toString();
                _this.prevBtnMouseEnterEvtListener = function () {
                    return _this.lightboxPrevBtn = styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, _this.textualOverlayOptions.prevNextButtonsHoverCSS);
                };
                _this.nextBtnMouseEnterEvtListener = function () {
                    return _this.lightboxNextBtn = styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, _this.textualOverlayOptions.prevNextButtonsHoverCSS);
                };
                _this.nextBtnMouseLeaveEvtListener = function () {
                    return _this.lightboxNextBtn = styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, _this.textualOverlayOptions.prevNextButtonsCSS);
                };
                _this.prevBtnMouseLeaveEvtListener = function () {
                    return _this.lightboxPrevBtn = styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, _this.textualOverlayOptions.prevNextButtonsCSS);
                };
                _this.attachNextPrevHoverModesEventsListeners();
                overlayPlaced.next(true);
                overlayPlaced.complete();
            }, _this.textualOverlayOptions.disableTextFadeIn
                ? 0
                : _this.textualOverlayOptions.textFadeInTimeInMs);
        }, this.textualOverlayOptions.disableBgFadeIn
            ? 0
            : this.textualOverlayOptions.bgFadeInTimeInMs);
        return overlayPlaced;
    };
    HazelineLightboxRenderer.prototype.setLightboxDynamicOptions = function (opts) {
        var _this = this;
        Object.keys(opts).forEach(function (optKey) {
            if (typeof opts[optKey] === 'object') {
                _this.ligthboxOptions[optKey] = Object.assign({}, _this.ligthboxOptions[optKey], opts[optKey]);
                return;
            }
            if (!!opts[optKey]) {
                _this.ligthboxOptions[optKey] = opts[optKey];
            }
        });
    };
    HazelineLightboxRenderer.prototype.setTextualOverlayDynamicOptions = function (opts) {
        var _this = this;
        Object.keys(opts).forEach(function (optKey) {
            if (typeof opts[optKey] === 'object') {
                _this.textualOverlayOptions[optKey] = Object.assign({}, _this.textualOverlayOptions[optKey], opts[optKey]);
                return;
            }
            if (!!opts[optKey]) {
                _this.textualOverlayOptions[optKey] = opts[optKey];
            }
        });
    };
    HazelineLightboxRenderer.prototype.setLightboxGlobalOptions = function (opts) {
        var _this = this;
        Object.keys(opts).forEach(function (optKey) {
            if (typeof opts[optKey] === 'object') {
                _this.ligthboxOptions[optKey] = Object.assign({}, elements_defaults_const_1.HazelineElementsDefaults.textualOverlay[optKey], opts[optKey]);
                return;
            }
            if (!!opts[optKey]) {
                _this.ligthboxOptions[optKey] = opts[optKey];
            }
        });
    };
    HazelineLightboxRenderer.prototype.setTextualOverlayGlobalOptions = function (opts) {
        var _this = this;
        Object.keys(opts).forEach(function (optKey) {
            if (typeof opts[optKey] === 'object') {
                _this.textualOverlayOptions[optKey] = Object.assign({}, elements_defaults_const_1.HazelineElementsDefaults.textualOverlay[optKey], opts[optKey]);
                return;
            }
            if (!!opts[optKey]) {
                _this.textualOverlayOptions[optKey] = opts[optKey];
            }
        });
    };
    HazelineLightboxRenderer.prototype.updateLightboxPlacement = function (target) {
        if (!!this.textualOverlay) {
            return;
        }
        var offset = this.ligthboxOptions.positioning.offset;
        var attachment = this.ligthboxOptions.positioning.attachment;
        var constraints = this.ligthboxOptions.positioning.constraints;
        var targetAttachment = this.ligthboxOptions.positioning.targetAttachment;
        if (!this.tether) {
            this.tether = new tether_1.default({
                target: target,
                offset: offset,
                element: this.lightboxWrp,
                attachment: attachment,
                constraints: constraints,
                targetAttachment: targetAttachment,
            });
        }
        else {
            this.tether.setOptions({
                target: target,
                offset: offset,
                element: this.lightboxWrp,
                attachment: attachment,
                constraints: constraints,
                targetAttachment: targetAttachment,
            });
        }
        this.tether.position();
    };
    HazelineLightboxRenderer.prototype.updateTextualOverlayPlacement = function () {
        this.textualOverlay.style.width = window.innerWidth + "px";
        this.textualOverlay.style.height = window.innerHeight + "px";
    };
    HazelineLightboxRenderer.prototype.applyTexts = function (sectionStep, isLastStep) {
        if (isLastStep === void 0) { isLastStep = false; }
        this.lightboxTextWrp.innerHTML = sectionStep.text;
        this.lightboxPrevBtn.innerHTML = this.ligthboxOptions.prevBtnText;
        this.lightboxNextBtn.innerHTML = isLastStep
            ? this.ligthboxOptions.lastStepNextBtnText
            : this.ligthboxOptions.nextBtnText;
    };
    HazelineLightboxRenderer.prototype.attachNextPrevEventsListeneres = function () {
        this.lightboxPrevBtn.addEventListener('click', this.prevBtnClickEvtListener);
        this.lightboxNextBtn.addEventListener('click', this.nextBtnClickEvtListener);
    };
    HazelineLightboxRenderer.prototype.detachNextPrevEventsListeneres = function () {
        this.lightboxPrevBtn.removeEventListener('click', this.prevBtnClickEvtListener);
        this.lightboxNextBtn.removeEventListener('click', this.nextBtnClickEvtListener);
    };
    HazelineLightboxRenderer.prototype.attachNextPrevHoverModesEventsListeners = function () {
        //  Prev btn hover modes
        this.lightboxPrevBtn.addEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
        this.lightboxPrevBtn.addEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);
        //  Next btn hover modes
        this.lightboxNextBtn.addEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
        this.lightboxNextBtn.addEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
    };
    HazelineLightboxRenderer.prototype.detachNextPrevHoverModesEventsListeners = function () {
        //  Prev btn hover modes
        this.lightboxPrevBtn.removeEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
        this.lightboxPrevBtn.removeEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);
        //  Next btn hover modes
        this.lightboxNextBtn.removeEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
        this.lightboxNextBtn.removeEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
    };
    HazelineLightboxRenderer.prototype.createLightbox = function () {
        this.createLightboxWrappers();
        this.createLightboxButtons();
        this.setButttonsIds();
        this.setWrappersIds();
        //  Append the children 
        this.lightboxControlsWrp.appendChild(this.lightboxPrevBtn);
        this.lightboxControlsWrp.appendChild(this.lightboxNextBtn);
        //  Compose the final result
        this.lightboxWrp.appendChild(this.lightboxTextWrp);
        this.lightboxWrp.appendChild(this.lightboxControlsWrp);
        //  Finally attach the listeners for next and previous buttons
        this.attachNextPrevEventsListeneres();
        this.attachNextPrevHoverModesEventsListeners();
    };
    HazelineLightboxRenderer.prototype.createLightboxButtons = function () {
        this.lightboxNextBtn = document.createElement('button');
        this.lightboxPrevBtn = document.createElement('button');
    };
    HazelineLightboxRenderer.prototype.createLightboxWrappers = function () {
        this.lightboxWrp = document.createElement('div');
        this.lightboxTextWrp = document.createElement('div');
        this.lightboxControlsWrp = document.createElement('div');
    };
    HazelineLightboxRenderer.prototype.setButttonsIds = function () {
        this.lightboxNextBtn.id = elements_ids_enum_1.HazelineElementsIds.lightboxNextButton;
        this.lightboxPrevBtn.id = elements_ids_enum_1.HazelineElementsIds.lightboxPrevButton;
    };
    HazelineLightboxRenderer.prototype.setWrappersIds = function () {
        this.lightboxWrp.id = elements_ids_enum_1.HazelineElementsIds.lightbox;
        this.lightboxTextWrp.id = elements_ids_enum_1.HazelineElementsIds.lightboxText;
        this.lightboxControlsWrp.id = elements_ids_enum_1.HazelineElementsIds.lightboxControls;
    };
    HazelineLightboxRenderer.prototype.styleWholeLigthboxElement = function () {
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxWrp, this.ligthboxOptions.lightboxWrapperCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxWrp, this.ligthboxOptions.lightboxWrapperCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxNextBtn, this.ligthboxOptions.lightboxNextBtnCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxPrevBtn, this.ligthboxOptions.lightboxPrevBtnCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxTextWrp, this.ligthboxOptions.lightboxTextWrapperCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxControlsWrp, this.ligthboxOptions.lightboxControlsWrapperCSS);
    };
    return HazelineLightboxRenderer;
}());
exports.HazelineLightboxRenderer = HazelineLightboxRenderer;
//# sourceMappingURL=lightbox-renderer.core.js.map