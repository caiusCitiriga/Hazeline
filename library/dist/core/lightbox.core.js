"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var element_utils_1 = require("../utilities/element.utils");
var HazelineLightbox = /** @class */ (function () {
    function HazelineLightbox() {
        this.ligthboxID = 'hazeline-lightbox';
        this.paragraphID = 'hazeline-lightbox-ta';
        this.nextControlBtnID = 'hazeline-next-ctrl';
        this.prevControlBtnID = 'hazeline-prev-ctrl';
        this.controlsWrapperID = 'hazeline-ctrls-wrp';
        this.nextBtnText = 'Next';
        this.prevBtnText = 'Previous';
        this.paragraphText = '';
        this.disablePrevBtn = false;
        this.disableNextBtn = false;
        this.lightboxCSS = {
            left: '0',
            right: '0',
            top: '2rem',
            padding: '8px',
            width: '250px',
            zIndex: '2001',
            maxHeight: '200px',
            background: '#fff',
            position: 'absolute',
            borderRadius: '5px',
            boxShadow: 'rgb(0, 0, 0) 0px 5px 20px -2px'
        };
        this.lightboxParagraphCSS = {
            width: '98%',
            height: '80px',
            margin: '0 auto',
            display: 'block',
            paddingTop: '4px',
            overflowY: 'scroll',
            marginBottom: '8px',
            textAlign: 'center',
            borderRadius: '5px',
            position: 'relative',
            border: '1px solid #bababa',
        };
        this.lightboxControlsWrapperCSS = {
            width: '100%',
            height: '35px',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
        };
        this.lightboxControlButtonsCSS = {
            next: {
                display: 'block',
                width: '100px',
                height: '30px'
            },
            prev: {
                display: 'block',
                width: '100px',
                height: '30px'
            }
        };
        this.currentElementCoordinates = {
            x: null,
            y: null,
            w: null,
            h: null,
        };
    }
    HazelineLightbox.prototype.init = function (opts) {
        if (!!this.lightbox) {
            this.update(opts);
            return;
        }
        this.setOptions(opts);
        this.setStylesIfAny(opts);
        this.currentElementCoordinates = element_utils_1.ElementUtils.getCoordinates(element_utils_1.ElementUtils.getHTMLElementBySelector(opts.elementSelector));
        this.buildLightbox(opts);
    };
    HazelineLightbox.prototype.showLightbox = function () {
        var lightboxShown = new rxjs_1.BehaviorSubject(false);
        this.lightbox.style.display = 'block';
        lightboxShown.next(true);
        lightboxShown.complete();
        return lightboxShown;
    };
    HazelineLightbox.prototype.destroy = function () {
        this.lightbox = null;
        this.controlsWrapper = null;
        this.lightboxControls = null;
        this.lightboxParagraph = null;
        if (!!document.querySelector("#" + this.ligthboxID)) {
            document.querySelector('body').removeChild(document.querySelector("#" + this.ligthboxID));
            return;
        }
        console.warn('HAZELINE: Warning, cannot find the lightbox to destroy');
    };
    HazelineLightbox.prototype.fadeOut = function () {
        console.log('Fading lightbox out');
        this.lightbox.style.opacity = '0';
    };
    HazelineLightbox.prototype.fadeIn = function () {
        console.log('Fading lightbox in');
        this.lightbox.style.opacity = '1';
    };
    HazelineLightbox.prototype.setStylesIfAny = function (opts) {
        if (opts.lightboxCSS) {
            this.lightboxCSS = opts.lightboxCSS;
        }
        if (opts.paragraphCSS) {
            this.lightboxParagraphCSS = opts.paragraphCSS;
        }
        if (opts.controlButtonsWrapperCSS) {
            this.lightboxControlsWrapperCSS = opts.controlButtonsWrapperCSS;
        }
        if (opts.controlButtonsCSS && opts.controlButtonsCSS.next) {
            this.lightboxControlButtonsCSS.next = opts.controlButtonsCSS.next;
        }
        if (opts.controlButtonsCSS && opts.controlButtonsCSS.prev) {
            this.lightboxControlButtonsCSS.prev = opts.controlButtonsCSS.prev;
        }
    };
    HazelineLightbox.prototype.update = function (opts) {
        this.setOptions(opts);
        this.updateLightboxPosition(opts.placement);
        this.lightboxParagraph.innerText = this.paragraphText;
        this.lightboxControls.next.disabled = this.disableNextBtn;
        this.lightboxControls.prev.disabled = this.disablePrevBtn;
    };
    HazelineLightbox.prototype.setOptions = function (opts) {
        this.paragraphText = opts.text;
        this.disableNextBtn = opts.disableNext;
        this.disablePrevBtn = opts.disablePrev;
    };
    HazelineLightbox.prototype.buildLightbox = function (opts) {
        this.lightbox = document.createElement('div');
        this.lightbox.setAttribute('id', this.ligthboxID);
        this.lightbox = this.applyStyles(this.lightbox, this.lightboxCSS);
        this.lightbox.style.display = 'none'; // keep it hidden until show is called
        this.attachParagraph();
        this.attachControlButtons();
        if (!document.querySelector('body').querySelector("#" + this.ligthboxID)) {
            document.querySelector('body').appendChild(this.lightbox);
        }
        this.updateLightboxPosition(opts.placement);
    };
    HazelineLightbox.prototype.updateLightboxPosition = function (placement) {
        var y = undefined;
        var x = undefined;
        switch (placement) {
            case 'above':
            case 'ABOVE':
            case LightboxPlacement.ABOVE:
                y = this.currentElementCoordinates.y - this.lightbox.getBoundingClientRect().height - 10;
                x = (this.currentElementCoordinates.x + (this.currentElementCoordinates.w / 2)) - (+this.lightboxCSS.width.replace('px', '') / 2);
                break;
            case 'right':
            case 'RIGHT':
            case LightboxPlacement.RIGHT:
                y = (this.currentElementCoordinates.y + (this.currentElementCoordinates.h / 2)) - ((this.lightbox.getBoundingClientRect().height / 2));
                x = (this.currentElementCoordinates.x + this.currentElementCoordinates.w) + 10;
                break;
            case 'left':
            case 'LEFT':
            case LightboxPlacement.LEFT:
                y = (this.currentElementCoordinates.y + (this.currentElementCoordinates.h / 2)) - ((this.lightbox.getBoundingClientRect().height / 2));
                x = this.currentElementCoordinates.x - this.lightbox.getBoundingClientRect().width - 10;
                break;
            case 'below':
            case 'BELOW':
            case LightboxPlacement.BELOW:
            default:
                y = this.currentElementCoordinates.y + this.currentElementCoordinates.h + 10;
                x = (this.currentElementCoordinates.x + (this.currentElementCoordinates.w / 2)) - (+this.lightboxCSS.width.replace('px', '') / 2);
                break;
        }
        this.lightbox.style.top = y + "px";
        this.lightbox.style.left = x + "px";
        this.lightbox.style.position = 'fixed';
        this.lightbox.style.transition = 'all 120ms ease-in-out';
    };
    HazelineLightbox.prototype.attachParagraph = function () {
        this.buildParagraph();
        this.lightbox.appendChild(this.lightboxParagraph);
    };
    HazelineLightbox.prototype.buildParagraph = function () {
        this.lightboxParagraph = document.createElement('p');
        this.lightboxParagraph.innerText = this.paragraphText;
        this.lightboxParagraph.setAttribute('id', this.paragraphID);
        this.lightboxParagraph = this.applyStyles(this.lightboxParagraph, this.lightboxParagraphCSS);
    };
    HazelineLightbox.prototype.attachControlButtons = function () {
        if (this.controlsWrapper && this.lightboxControls.next && this.lightboxControls.prev) {
            return;
        }
        this.buildControlsWrapper();
        this.buildLigthboxControls();
        this.controlsWrapper.appendChild(this.lightboxControls.prev);
        this.controlsWrapper.appendChild(this.lightboxControls.next);
        this.lightbox.appendChild(this.controlsWrapper);
    };
    HazelineLightbox.prototype.buildLigthboxControls = function () {
        var _this = this;
        var nextBtn = document.createElement('button');
        nextBtn.innerText = this.nextBtnText;
        nextBtn.setAttribute('id', this.nextControlBtnID);
        nextBtn.addEventListener('click', function () { return _this.onNextBtnClick(); });
        nextBtn.disabled = this.disableNextBtn;
        var prevBtn = document.createElement('button');
        prevBtn.innerText = this.prevBtnText;
        prevBtn.setAttribute('id', this.prevControlBtnID);
        prevBtn.addEventListener('click', function () { return _this.onPrevBtnClick(); });
        prevBtn.disabled = this.disablePrevBtn;
        this.lightboxControls = {
            next: this.applyStyles(nextBtn, this.lightboxControlButtonsCSS.next),
            prev: this.applyStyles(prevBtn, this.lightboxControlButtonsCSS.prev),
        };
    };
    HazelineLightbox.prototype.buildControlsWrapper = function () {
        this.controlsWrapper = document.createElement('div');
        this.controlsWrapper.setAttribute('id', this.controlsWrapperID);
        this.controlsWrapper = this.applyStyles(this.controlsWrapper, this.lightboxControlsWrapperCSS);
    };
    HazelineLightbox.prototype.applyStyles = function (element, styles) {
        Object.keys(styles).forEach(function (k) {
            element.style[k] = styles[k];
        });
        return element;
    };
    return HazelineLightbox;
}());
exports.HazelineLightbox = HazelineLightbox;
var LightboxPlacement;
(function (LightboxPlacement) {
    LightboxPlacement[LightboxPlacement["LEFT"] = 0] = "LEFT";
    LightboxPlacement[LightboxPlacement["RIGHT"] = 1] = "RIGHT";
    LightboxPlacement[LightboxPlacement["ABOVE"] = 2] = "ABOVE";
    LightboxPlacement[LightboxPlacement["BELOW"] = 3] = "BELOW";
})(LightboxPlacement = exports.LightboxPlacement || (exports.LightboxPlacement = {}));
//# sourceMappingURL=lightbox.core.js.map