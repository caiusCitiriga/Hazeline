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
var HazelineLightbox = /** @class */ (function () {
    function HazelineLightbox() {
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
    HazelineLightbox.prototype.$nextStepRequired = function () { return this._$nextStepRequired; };
    HazelineLightbox.prototype.$prevStepRequired = function () { return this._$prevStepRequired; };
    HazelineLightbox.prototype.dispose = function () {
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
    HazelineLightbox.prototype.placeLightbox = function (target, sectionStep, isLastStep) {
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
    HazelineLightbox.prototype.setOptions = function (lightboxOpts) {
        this.ligthboxOptions = lightboxOpts;
        //  The user might not have set the texts, since a Object.assign might cause strange behaviours due to styles,
        //  we override the defaults with the user options, but since he could have forgot to set the texts, we check it
        //  here, and ensure that at least, even if in english, the buttons have texts set.
        this.ligthboxOptions.lastStepNextBtnText = this.ligthboxOptions.lastStepNextBtnText
            ? this.ligthboxOptions.lastStepNextBtnText
            : elements_defaults_const_1.HazelineElementsDefaults.lightbox.lastStepNextBtnText;
        this.ligthboxOptions.nextBtnText = this.ligthboxOptions.nextBtnText
            ? this.ligthboxOptions.nextBtnText
            : elements_defaults_const_1.HazelineElementsDefaults.lightbox.nextBtnText;
        this.ligthboxOptions.prevBtnText = this.ligthboxOptions.prevBtnText
            ? this.ligthboxOptions.prevBtnText
            : elements_defaults_const_1.HazelineElementsDefaults.lightbox.prevBtnText;
    };
    HazelineLightbox.prototype.updateLightboxPlacement = function (target) {
        var offset = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.offset
            ? this.ligthboxOptions.positioning.offset
            : elements_defaults_const_1.HazelineElementsDefaults.lightbox.positioning.offset;
        var attachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.attachment
            ? this.ligthboxOptions.positioning.attachment
            : elements_defaults_const_1.HazelineElementsDefaults.lightbox.positioning.attachment;
        var targetAttachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.targetAttachment
            ? this.ligthboxOptions.positioning.targetAttachment
            : elements_defaults_const_1.HazelineElementsDefaults.lightbox.positioning.targetAttachment;
        var constraints = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.constraints
            ? this.ligthboxOptions.positioning.constraints
            : elements_defaults_const_1.HazelineElementsDefaults.lightbox.positioning.constraints;
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
    HazelineLightbox.prototype.applyTexts = function (sectionStep, isLastStep) {
        if (isLastStep === void 0) { isLastStep = false; }
        this.lightboxText = sectionStep.text;
        this.lightboxTextWrp.innerHTML = this.lightboxText;
        this.lightboxPrevBtn.innerHTML = this.ligthboxOptions.prevBtnText;
        this.lightboxNextBtn.innerHTML = isLastStep
            ? this.ligthboxOptions.lastStepNextBtnText
            : this.ligthboxOptions.nextBtnText;
    };
    HazelineLightbox.prototype.attachNextEventListeneres = function () {
        this.lightboxPrevBtn.addEventListener('click', this.prevBtnClickEvtListener);
        this.lightboxNextBtn.addEventListener('click', this.nextBtnClickEvtListener);
        //  Prev btn hover modes
        this.lightboxPrevBtn.addEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
        this.lightboxPrevBtn.addEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);
        //  Next btn hover modes
        this.lightboxNextBtn.addEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
        this.lightboxNextBtn.addEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
    };
    HazelineLightbox.prototype.createLightbox = function () {
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
    HazelineLightbox.prototype.styleWholeLigthboxElement = function () {
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxWrp, this.ligthboxOptions.lightboxWrapperCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxWrp, this.ligthboxOptions.lightboxWrapperCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxWrapperCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxNextBtn, this.ligthboxOptions.lightboxNextBtnCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxNextBtnCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxPrevBtn, this.ligthboxOptions.lightboxPrevBtnCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxPrevBtnCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxTextWrp, this.ligthboxOptions.lightboxTextWrapperCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxTextWrapperCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxControlsWrp, this.ligthboxOptions.lightboxControlsWrapperCSS || elements_defaults_const_1.HazelineElementsDefaults.lightbox.lightboxControlsWrapperCSS);
    };
    return HazelineLightbox;
}());
exports.HazelineLightbox = HazelineLightbox;
//# sourceMappingURL=lightbox.core.js.map