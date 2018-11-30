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
        this.prevBtnClickEvtListener = function () {
            return _this._$prevStepRequired.next(true);
        };
        this.nextBtnClickEvtListener = function () {
            return _this._$nextStepRequired.next(true);
        };
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
    HazelineLightboxRenderer.prototype.dispose = function () {
        if (document.getElementById(elements_ids_enum_1.HazelineElementsIds.lightbox)) {
            this.lightboxPrevBtn.removeEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
            this.lightboxPrevBtn.removeEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);
            this.lightboxNextBtn.removeEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
            this.lightboxNextBtn.removeEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
            this.tether.disable();
            this.tether.destroy();
            this.tether = null;
            document.body.removeChild(this.lightboxWrp);
        }
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
    HazelineLightboxRenderer.prototype.setDynamicOptions = function (opts) {
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
    HazelineLightboxRenderer.prototype.setGlobalOptions = function (opts) {
        var _this = this;
        Object.keys(opts).forEach(function (optKey) {
            if (typeof opts[optKey] === 'object') {
                _this.ligthboxOptions[optKey] = Object.assign({}, elements_defaults_const_1.HazelineElementsDefaults.lightbox[optKey], opts[optKey]);
                return;
            }
            if (!!opts[optKey]) {
                _this.ligthboxOptions[optKey] = opts[optKey];
            }
        });
    };
    HazelineLightboxRenderer.prototype.updateLightboxPlacement = function (target) {
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
    HazelineLightboxRenderer.prototype.applyTexts = function (sectionStep, isLastStep) {
        if (isLastStep === void 0) { isLastStep = false; }
        this.lightboxTextWrp.innerHTML = sectionStep.text;
        this.lightboxPrevBtn.innerHTML = this.ligthboxOptions.prevBtnText;
        this.lightboxNextBtn.innerHTML = isLastStep
            ? this.ligthboxOptions.lastStepNextBtnText
            : this.ligthboxOptions.nextBtnText;
    };
    HazelineLightboxRenderer.prototype.attachNextEventListeneres = function () {
        this.lightboxPrevBtn.addEventListener('click', this.prevBtnClickEvtListener);
        this.lightboxNextBtn.addEventListener('click', this.nextBtnClickEvtListener);
        //  Prev btn hover modes
        this.lightboxPrevBtn.addEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
        this.lightboxPrevBtn.addEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);
        //  Next btn hover modes
        this.lightboxNextBtn.addEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
        this.lightboxNextBtn.addEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
    };
    HazelineLightboxRenderer.prototype.createLightbox = function () {
        //  Create the wrapper elements
        this.lightboxWrp = document.createElement('div');
        this.lightboxTextWrp = document.createElement('div');
        this.lightboxControlsWrp = document.createElement('div');
        //  Create the buttons
        this.lightboxNextBtn = document.createElement('button');
        this.lightboxPrevBtn = document.createElement('button');
        //  Set the ids
        this.lightboxWrp.id = elements_ids_enum_1.HazelineElementsIds.lightbox;
        this.lightboxTextWrp.id = elements_ids_enum_1.HazelineElementsIds.lightboxText;
        this.lightboxNextBtn.id = elements_ids_enum_1.HazelineElementsIds.lightboxNextButton;
        this.lightboxControlsWrp.id = elements_ids_enum_1.HazelineElementsIds.lightboxControls;
        //  Append the children 
        this.lightboxControlsWrp.appendChild(this.lightboxPrevBtn);
        this.lightboxControlsWrp.appendChild(this.lightboxNextBtn);
        //  Compose the final result
        this.lightboxWrp.appendChild(this.lightboxTextWrp);
        this.lightboxWrp.appendChild(this.lightboxControlsWrp);
        //  Finally attach the listeners for next and previous buttons
        this.attachNextEventListeneres();
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