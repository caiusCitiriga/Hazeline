"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tether_1 = __importDefault(require("tether"));
var elements_ids_enum_1 = require("./enums/elements-ids.enum");
var elements_default_styles_const_1 = require("./consts/elements-default-styles.const");
var styles_manager_core_1 = require("./styles-manager.core");
var rxjs_1 = require("rxjs");
var HazelineLightbox = /** @class */ (function () {
    function HazelineLightbox() {
        this._$nextStepRequired = new rxjs_1.Subject();
        this._$prevStepRequired = new rxjs_1.Subject();
        this.ligthboxOptions = {
            positioning: {},
            lightboxWrapperCSS: {},
            lightboxTextWrapperCSS: {},
        };
    }
    HazelineLightbox.prototype.$nextStepRequired = function () {
        return this._$nextStepRequired;
    };
    HazelineLightbox.prototype.$prevStepRequired = function () {
        return this._$prevStepRequired;
    };
    HazelineLightbox.prototype.applyStyles = function (lightboxOpts) {
        this.ligthboxOptions = lightboxOpts;
    };
    HazelineLightbox.prototype.placeLightbox = function (target, sectionStep) {
        this.lightboxWrp = document.getElementById(elements_ids_enum_1.HazelineElementsIds.lightbox);
        if (!this.lightboxWrp) {
            this.createLightbox();
            document.body.prepend(this.lightboxWrp); // not fully supported. See browser tables
        }
        this.applyTexts(sectionStep);
        this.styleWholeLigthboxElement();
        this.updateLightboxPlacement(target);
    };
    HazelineLightbox.prototype.updateLightboxPlacement = function (target) {
        var offset = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.offset
            ? this.ligthboxOptions.positioning.offset
            : elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.positioning.offset;
        var attachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.attachment
            ? this.ligthboxOptions.positioning.attachment
            : elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.positioning.attachment;
        var targetAttachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.targetAttachment
            ? this.ligthboxOptions.positioning.targetAttachment
            : elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.positioning.targetAttachment;
        var constraints = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.constraints
            ? this.ligthboxOptions.positioning.constraints
            : elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.positioning.constraints;
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
    HazelineLightbox.prototype.applyTexts = function (sectionStep) {
        this.lightboxText = sectionStep.text;
        this.lightboxPrevBtn.innerHTML = this.prevBtnText || '<';
        this.lightboxNextBtn.innerHTML = this.nextBtnText || '>';
        this.lightboxTextWrp.innerHTML = this.lightboxText;
    };
    HazelineLightbox.prototype.attachNextPrevClickListeners = function () {
        var _this = this;
        this.lightboxPrevBtn.addEventListener('click', function () { return _this._$prevStepRequired.next(true); });
        this.lightboxNextBtn.addEventListener('click', function () { return _this._$nextStepRequired.next(true); });
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
        this.lightboxPrevBtn.id = elements_ids_enum_1.HazelineElementsIds.lightboxPrevButton;
        this.lightboxControlsWrp.id = elements_ids_enum_1.HazelineElementsIds.lightboxControls;
        //  Append the children 
        this.lightboxControlsWrp.appendChild(this.lightboxPrevBtn);
        this.lightboxControlsWrp.appendChild(this.lightboxNextBtn);
        //  Compose the final result
        this.lightboxWrp.appendChild(this.lightboxTextWrp);
        this.lightboxWrp.appendChild(this.lightboxControlsWrp);
        //  Finally attach the listeners for next and previous buttons
        this.attachNextPrevClickListeners();
    };
    HazelineLightbox.prototype.styleWholeLigthboxElement = function () {
        var _this = this;
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxWrp, this.ligthboxOptions.lightboxWrapperCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxWrp, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.lightboxWrapperCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxNextBtn, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.lightboxNextBtnCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxPrevBtn, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.lightboxPrevBtnCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxTextWrp, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.lightboxTextWrapperCSS);
        styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxControlsWrp, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.lightboxControlsWrapperCSS);
        //  Prev btn hover modes
        this.lightboxPrevBtn.addEventListener('mouseenter', function () {
            styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.lightboxPrevBtnHoverCSS);
        });
        this.lightboxPrevBtn.addEventListener('mouseleave', function () {
            styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.lightboxPrevBtnCSS);
        });
        //  Next btn hover modes
        this.lightboxNextBtn.addEventListener('mouseenter', function () {
            styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.lightboxNextBtnHoverCSS);
        });
        this.lightboxNextBtn.addEventListener('mouseleave', function () {
            styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.lightboxNextBtnCSS);
        });
    };
    return HazelineLightbox;
}());
exports.HazelineLightbox = HazelineLightbox;
//# sourceMappingURL=lightbox.core.js.map