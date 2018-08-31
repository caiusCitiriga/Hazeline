"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
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
            margin: '0 auto',
            maxHeight: '200px',
            background: '#fff',
            position: 'absolute',
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
    }
    //////////////////////////////////////
    //  Public methods
    //////////////////////////////////////
    HazelineLightbox.prototype.showLightbox = function (opts) {
        if (!!this.lightbox) {
            this.update(opts);
        }
        var lightboxShown = new rxjs_1.BehaviorSubject(false);
        this.setOptions(opts);
        this.setStylesIfAny(opts);
        this.buildLightbox();
        document.querySelector('body').appendChild(this.lightbox);
        lightboxShown.next(true);
        lightboxShown.complete();
        return lightboxShown;
    };
    //////////////////////////////////////
    //  Private methods
    //////////////////////////////////////
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
        this.lightboxParagraph.innerText = this.paragraphText;
        this.lightboxControls.next.disabled = this.disableNextBtn;
        this.lightboxControls.prev.disabled = this.disablePrevBtn;
    };
    HazelineLightbox.prototype.setOptions = function (opts) {
        this.paragraphText = opts.text;
        this.disableNextBtn = opts.disableNext;
        this.disablePrevBtn = opts.disablePrev;
    };
    HazelineLightbox.prototype.buildLightbox = function () {
        if (!!this.lightbox) {
            return;
        }
        this.lightbox = document.createElement('div');
        this.lightbox.setAttribute('id', this.ligthboxID);
        this.lightbox = this.applyStyles(this.lightbox, this.lightboxCSS);
        this.attachParagraph();
        this.attachControlButtons();
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
//# sourceMappingURL=lightbox.core.js.map