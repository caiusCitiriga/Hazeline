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
    HazelineLightboxRenderer.prototype.disposeTextualOverlay = function () {
        var _this = this;
        if (document.getElementById(elements_ids_enum_1.HazelineElementsIds.lightboxTextualOverlay)) {
            this.lightboxPrevBtn.removeEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
            this.lightboxPrevBtn.removeEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);
            this.lightboxNextBtn.removeEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
            this.lightboxNextBtn.removeEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
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
            document.body.removeChild(this.textualOverlay);
            this.textualOverlay = null;
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
    HazelineLightboxRenderer.prototype.placeTextOverlay = function (sectionStep, isLastStep) {
        var _this = this;
        if (isLastStep === void 0) { isLastStep = false; }
        var overlayPlaced = new rxjs_1.Subject();
        var buttonsStyle = {
            width: '150px',
            color: '#fff',
            opacity: '.3',
            height: '80px',
            fontSize: '20px',
            cursor: 'pointer',
            lineHeight: '50px',
            textAlign: 'center',
            border: '2px solid #ff7a00',
            backgroundColor: 'transparent',
            transition: 'all 200ms ease-in-out',
        };
        var buttonsHoverStyle = {
            opacity: '1'
        };
        var overlayStyle = {
            top: '0',
            left: '0',
            opacity: '0',
            display: 'flex',
            fontSize: '30px',
            position: 'fixed',
            paddingLeft: '8px',
            paddingRight: '8px',
            textAlign: 'center',
            color: 'transparent',
            alignItems: 'center',
            background: 'rgba(0,0,0,.93)',
            width: window.innerWidth + "px",
            justifyContent: 'space-between',
            height: window.innerHeight + "px",
            transition: 'all 120ms ease-in-out',
            transitionProperty: 'color, opacity',
            lineHeight: window.innerHeight.toString() + "px",
            zIndex: elements_defaults_const_1.HazelineElementsDefaults.overlay.overlayCSS.zIndex,
        };
        this.createLightboxButtons();
        this.setButttonsIds();
        this.lightboxPrevBtn.innerText = this.ligthboxOptions.prevBtnText;
        this.lightboxNextBtn.innerText = isLastStep ? this.ligthboxOptions.lastStepNextBtnText : this.ligthboxOptions.nextBtnText;
        this.lightboxNextBtn = styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxNextBtn, buttonsStyle);
        this.lightboxPrevBtn = styles_manager_core_1.HazelineStylesManager.styleElement(this.lightboxPrevBtn, buttonsStyle);
        this.attachNextPrevEventsListeneres();
        var text = document.createElement('p');
        text.innerText = sectionStep.text;
        this.textualOverlay = document.createElement('div');
        this.textualOverlay.id = elements_ids_enum_1.HazelineElementsIds.lightboxTextualOverlay;
        this.textualOverlay = styles_manager_core_1.HazelineStylesManager.styleElement(this.textualOverlay, overlayStyle);
        this.textualOverlay.appendChild(this.lightboxPrevBtn);
        this.textualOverlay.appendChild(text);
        this.textualOverlay.appendChild(this.lightboxNextBtn);
        this.dispose();
        document.body.prepend(this.textualOverlay);
        setTimeout(function () { return _this.textualOverlay.style.opacity = '1'; }, 300);
        setTimeout(function () {
            _this.textualOverlay.style.color = '#fff';
            _this.prevBtnMouseEnterEvtListener = function () {
                return _this.lightboxPrevBtn = styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, buttonsHoverStyle);
            };
            _this.nextBtnMouseEnterEvtListener = function () {
                return _this.lightboxNextBtn = styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, buttonsHoverStyle);
            };
            _this.nextBtnMouseLeaveEvtListener = function () {
                return _this.lightboxNextBtn = styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxNextBtn, buttonsStyle);
            };
            _this.prevBtnMouseLeaveEvtListener = function () {
                return _this.lightboxPrevBtn = styles_manager_core_1.HazelineStylesManager.styleElement(_this.lightboxPrevBtn, buttonsStyle);
            };
            _this.attachNextPrevHoverModesEventsListeners();
            overlayPlaced.next(true);
        }, 1000);
        return overlayPlaced;
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
    HazelineLightboxRenderer.prototype.attachNextPrevHoverModesEventsListeners = function () {
        //  Prev btn hover modes
        this.lightboxPrevBtn.addEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
        this.lightboxPrevBtn.addEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);
        //  Next btn hover modes
        this.lightboxNextBtn.addEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
        this.lightboxNextBtn.addEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
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