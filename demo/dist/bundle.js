/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../library/dist/core/consts/elements-defaults.const.js":
/*!**************************************************************!*\
  !*** ../library/dist/core/consts/elements-defaults.const.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HazelineElementsDefaults = {
    lightbox: {
        nextBtnText: 'Next',
        prevBtnText: 'Previous',
        lastStepNextBtnText: 'Finish',
        positioning: {
            attachment: 'top center',
            targetAttachment: 'bottom center',
            constraints: [
                {
                    to: 'window',
                    pin: true
                }
            ],
            offset: '0 0'
        },
        lightboxWrapperCSS: {
            color: '#333',
            padding: '8px',
            width: '350px',
            height: '250px',
            display: 'flex',
            zIndex: '999999',
            position: 'fixed',
            background: '#fff',
            flexDirection: 'column',
        },
        lightboxTextWrapperCSS: {
            width: '100%',
            flexGrow: '2',
            overflowY: 'scroll',
            textAlign: 'justify'
        },
        lightboxControlsWrapperCSS: {
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        lightboxNextBtnCSS: {
            width: '100px',
            height: '38px',
            outline: 'none',
            color: '#ff7a00',
            fontSize: '18px',
            cursor: 'default',
            background: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '3px solid #ff7a00',
            transition: 'all 120ms ease-in-out',
        },
        lightboxPrevBtnCSS: {
            width: '100px',
            height: '38px',
            outline: 'none',
            color: '#ff7a00',
            fontSize: '18px',
            cursor: 'default',
            background: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '3px solid #ff7a00',
            transition: 'all 120ms ease-in-out',
        },
        lightboxPrevBtnHoverCSS: {
            color: '#fff',
            cursor: 'pointer',
            background: '#ff7a00',
        },
        lightboxNextBtnHoverCSS: {
            color: '#fff',
            cursor: 'pointer',
            background: '#ff7a00',
        },
    },
    overlay: {
        closeBtnText: 'End tutorial',
        topSideWrapOffset: 10,
        leftSideWrapOffset: 10,
        rightSideWrapOffset: 10,
        bottomSideWrapOffset: 10,
        overlayCSS: {
            zIndex: '99999',
            position: 'fixed',
            background: 'rgba(0,0,0,.8)',
            transition: 'all 120ms ease-in-out',
        },
        endTutorialBtnHoverCSS: {
            color: '#fff',
            background: '#E53935',
        },
        endTutorialBtnCSS: {
            top: '12px',
            right: '12px',
            width: '120px',
            height: '32px',
            outline: 'none',
            zIndex: '999999',
            color: '#E53935',
            position: 'fixed',
            background: 'transparent',
            border: '2px solid #E53935',
        },
    },
    textualOverlay: {
        bgFadeInTimeInMs: 300,
        disableBgFadeIn: false,
        disableTextFadeIn: false,
        textFadeInTimeInMs: 1000,
        overlayBgFadeInOpacity: 1,
        overlayParagraphFadeInOpacity: 1,
        overlayCSS: {
            top: '0',
            left: '0',
            opacity: '0',
            zIndex: '99999',
            display: 'flex',
            fontSize: '30px',
            position: 'fixed',
            paddingLeft: '8px',
            paddingRight: '8px',
            textAlign: 'center',
            alignItems: 'center',
            background: 'rgba(0,0,0,.93)',
            width: window.innerWidth + "px",
            justifyContent: 'space-between',
            height: window.innerHeight + "px",
            transition: 'all 120ms ease-in-out',
            transitionProperty: 'color, opacity',
        },
        paragraphCSS: {
            opacity: '0',
            color: '#ff7a00'
        },
        prevNextButtonsCSS: {
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
        },
        prevNextButtonsHoverCSS: {
            opacity: '1'
        }
    }
};
//# sourceMappingURL=elements-defaults.const.js.map

/***/ }),

/***/ "../library/dist/core/element-manager.core.js":
/*!****************************************************!*\
  !*** ../library/dist/core/element-manager.core.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var elements_defaults_const_1 = __webpack_require__(/*! ./consts/elements-defaults.const */ "../library/dist/core/consts/elements-defaults.const.js");
var HazelineElementManager = /** @class */ (function () {
    function HazelineElementManager() {
    }
    HazelineElementManager.prototype.getWrappingElementsDimensions = function (elementSelector, overlayOpts) {
        var element = document.querySelector(elementSelector);
        if (!element) {
            return null;
        }
        var wrappingElementsDimensions = this.computeWrappingElements(element, overlayOpts ? overlayOpts : elements_defaults_const_1.HazelineElementsDefaults.overlay);
        return wrappingElementsDimensions;
    };
    HazelineElementManager.getElementBySelector = function (selector) {
        return document.querySelector(selector);
    };
    HazelineElementManager.prototype.computeWrappingElements = function (elementToWrap, overlayOpts) {
        var dimensions = exports.NullDimensions;
        //  Element
        dimensions.element.width = elementToWrap.getBoundingClientRect().width;
        dimensions.element.height = elementToWrap.getBoundingClientRect().height;
        dimensions.element.offsetTop = elementToWrap.getBoundingClientRect().top;
        dimensions.element.offsetLeft = elementToWrap.getBoundingClientRect().left;
        dimensions.element.offsetRight = elementToWrap.getBoundingClientRect().right;
        dimensions.element.offsetBottom = elementToWrap.getBoundingClientRect().bottom;
        //  Left box
        dimensions.leftBox.height = window.innerHeight;
        dimensions.leftBox.width = dimensions.element.offsetLeft;
        //  Top box
        dimensions.topBox.width = dimensions.element.width;
        dimensions.topBox.height = dimensions.element.offsetTop;
        dimensions.topBox.offsetLeft = dimensions.element.offsetLeft;
        //  Bottom box
        dimensions.bottomBox.width = dimensions.element.width;
        dimensions.bottomBox.offsetLeft = dimensions.element.offsetLeft;
        dimensions.bottomBox.offsetTop = dimensions.element.offsetTop + dimensions.element.height;
        dimensions.bottomBox.height = window.innerHeight - (dimensions.element.offsetTop + dimensions.element.height);
        //  Right box
        dimensions.rightBox.height = window.innerHeight;
        dimensions.rightBox.offsetLeft = dimensions.element.offsetLeft + dimensions.element.width;
        dimensions.rightBox.width = window.innerWidth - (dimensions.element.offsetLeft + dimensions.element.width);
        //  Compute user custom offsets
        if (overlayOpts.topSideWrapOffset) {
            dimensions.topBox.height -= overlayOpts.topSideWrapOffset;
        }
        if (overlayOpts.bottomSideWrapOffset) {
            dimensions.bottomBox.height -= overlayOpts.bottomSideWrapOffset;
            dimensions.bottomBox.offsetTop += overlayOpts.bottomSideWrapOffset;
        }
        if (overlayOpts.rightSideWrapOffset) {
            dimensions.topBox.width += overlayOpts.rightSideWrapOffset;
            dimensions.bottomBox.width += overlayOpts.rightSideWrapOffset;
            dimensions.rightBox.offsetLeft += overlayOpts.rightSideWrapOffset;
        }
        if (overlayOpts.leftSideWrapOffset) {
            dimensions.topBox.width += overlayOpts.leftSideWrapOffset;
            dimensions.leftBox.width -= overlayOpts.leftSideWrapOffset;
            dimensions.bottomBox.width += overlayOpts.leftSideWrapOffset;
            dimensions.topBox.offsetLeft -= overlayOpts.leftSideWrapOffset;
            dimensions.bottomBox.offsetLeft -= overlayOpts.leftSideWrapOffset;
        }
        return dimensions;
    };
    return HazelineElementManager;
}());
exports.HazelineElementManager = HazelineElementManager;
exports.NullDimensions = {
    element: {
        width: null,
        height: null,
        offsetTop: null,
        offsetLeft: null,
        offsetRight: null,
        offsetBottom: null,
    },
    leftBox: {
        width: null,
        height: null,
    },
    topBox: {
        width: null,
        height: null,
        offsetLeft: null,
    },
    bottomBox: {
        width: null,
        height: null,
        offsetTop: null,
        offsetLeft: null,
    },
    rightBox: {
        width: null,
        height: null,
        offsetLeft: null,
    }
};
//# sourceMappingURL=element-manager.core.js.map

/***/ }),

/***/ "../library/dist/core/enums/elements-ids.enum.js":
/*!*******************************************************!*\
  !*** ../library/dist/core/enums/elements-ids.enum.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HazelineElementsIds;
(function (HazelineElementsIds) {
    HazelineElementsIds["topBox"] = "hazeline-top-box";
    HazelineElementsIds["leftBox"] = "hazeline-left-box";
    HazelineElementsIds["rightBox"] = "hazeline-right-box";
    HazelineElementsIds["bottomBox"] = "hazeline-bottom-box";
    HazelineElementsIds["endTutorialButton"] = "hazeline-end-tutorial-btn";
    HazelineElementsIds["lightbox"] = "hazeline-lightbox";
    HazelineElementsIds["lightboxText"] = "hazeline-lightbox-text";
    HazelineElementsIds["lightboxControls"] = "hazeline-lightbox-ctrls";
    HazelineElementsIds["lightboxNextButton"] = "hazeline-lightbox-next-btn";
    HazelineElementsIds["lightboxPrevButton"] = "hazeline-lightbox-prev-btn";
    HazelineElementsIds["lightboxTextualOverlay"] = "hazeline-lightbox-textual-overlay";
    HazelineElementsIds["waitForDelayOverlay"] = "hazeline-wait-for-delay-overlay";
})(HazelineElementsIds = exports.HazelineElementsIds || (exports.HazelineElementsIds = {}));
//# sourceMappingURL=elements-ids.enum.js.map

/***/ }),

/***/ "../library/dist/core/enums/tutorial-section-statuses.enum.js":
/*!********************************************************************!*\
  !*** ../library/dist/core/enums/tutorial-section-statuses.enum.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HazelineTutorialSectionStatuses;
(function (HazelineTutorialSectionStatuses) {
    HazelineTutorialSectionStatuses[HazelineTutorialSectionStatuses["ended"] = 0] = "ended";
    HazelineTutorialSectionStatuses[HazelineTutorialSectionStatuses["started"] = 1] = "started";
    HazelineTutorialSectionStatuses[HazelineTutorialSectionStatuses["errored"] = 2] = "errored";
})(HazelineTutorialSectionStatuses = exports.HazelineTutorialSectionStatuses || (exports.HazelineTutorialSectionStatuses = {}));
//# sourceMappingURL=tutorial-section-statuses.enum.js.map

/***/ }),

/***/ "../library/dist/core/enums/tutorial-statuses.enum.js":
/*!************************************************************!*\
  !*** ../library/dist/core/enums/tutorial-statuses.enum.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HazelineTutorialStatuses;
(function (HazelineTutorialStatuses) {
    HazelineTutorialStatuses[HazelineTutorialStatuses["started"] = 0] = "started";
    HazelineTutorialStatuses[HazelineTutorialStatuses["stopped"] = 1] = "stopped";
    HazelineTutorialStatuses[HazelineTutorialStatuses["errored"] = 2] = "errored";
})(HazelineTutorialStatuses = exports.HazelineTutorialStatuses || (exports.HazelineTutorialStatuses = {}));
//# sourceMappingURL=tutorial-statuses.enum.js.map

/***/ }),

/***/ "../library/dist/core/lightbox-renderer.core.js":
/*!******************************************************!*\
  !*** ../library/dist/core/lightbox-renderer.core.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "../library/node_modules/rxjs/_esm5/index.js");
var elements_ids_enum_1 = __webpack_require__(/*! ./enums/elements-ids.enum */ "../library/dist/core/enums/elements-ids.enum.js");
var elements_defaults_const_1 = __webpack_require__(/*! ./consts/elements-defaults.const */ "../library/dist/core/consts/elements-defaults.const.js");
var styles_manager_core_1 = __webpack_require__(/*! ./styles-manager.core */ "../library/dist/core/styles-manager.core.js");
var HazelineLightboxRenderer = /** @class */ (function () {
    function HazelineLightboxRenderer() {
        var _this = this;
        this._$eventTrigger = new rxjs_1.Subject();
        this.ligthboxOptions = Object.assign({}, elements_defaults_const_1.HazelineElementsDefaults.lightbox);
        this.textualOverlayOptions = Object.assign({}, elements_defaults_const_1.HazelineElementsDefaults.textualOverlay);
        //  User defined events listeners for this step
        this.customNextBtnClickEvtListener = undefined;
        this.customPrevBtnClickEvtListener = undefined;
        //  Hazeline's default events listeners for this step
        this.nextBtnClickEvtListener = function () { return _this._$eventTrigger.next({ type: HazelineEventTrigger.next }); };
        this.prevBtnClickEvtListener = function () { return _this._$eventTrigger.next({ type: HazelineEventTrigger.previous }); };
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
    HazelineLightboxRenderer.prototype.$eventTriggered = function () { return this._$eventTrigger; };
    HazelineLightboxRenderer.prototype.attachCustomNextEventListenerOnElement = function (opts) {
        var _this = this;
        this.customNextBtnClickEvtListener = function (evt) {
            opts.listener(evt, opts.step, opts.element)
                .then(function () { return _this._$eventTrigger.next({ type: HazelineEventTrigger.next }); })
                .catch(function () { return null; });
        };
        opts.element.addEventListener(opts.event, this.customNextBtnClickEvtListener);
    };
    HazelineLightboxRenderer.prototype.detachCustomEventsListeners = function (opts) {
        if (this.customNextBtnClickEvtListener) {
            opts.element.removeEventListener(opts.event, this.customNextBtnClickEvtListener);
        }
        if (this.customPrevBtnClickEvtListener) {
            opts.element.removeEventListener(opts.event, this.customPrevBtnClickEvtListener);
        }
    };
    HazelineLightboxRenderer.prototype.disableNextPrevBtns = function () {
        this.lightboxNextBtnOriginalDisplayMode = this.lightboxNextBtn.style.display;
        this.lightboxPrevBtnOriginalDisplayMode = this.lightboxPrevBtn.style.display;
        this.lightboxNextBtn.style.display = 'none';
        this.lightboxPrevBtn.style.display = 'none';
    };
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
            this.lightboxWrp = null;
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
    HazelineLightboxRenderer.prototype.enableNextPrevBtns = function () {
        this.lightboxNextBtn.style.display = !!this.lightboxNextBtnOriginalDisplayMode ? this.lightboxNextBtnOriginalDisplayMode : 'unset';
        this.lightboxPrevBtn.style.display = !!this.lightboxPrevBtnOriginalDisplayMode ? this.lightboxPrevBtnOriginalDisplayMode : 'unset';
        this.lightboxNextBtnOriginalDisplayMode = undefined;
        this.lightboxPrevBtnOriginalDisplayMode = undefined;
    };
    HazelineLightboxRenderer.prototype.hideLightbox = function () {
        this.lightboxWrp.style.opacity = '0';
    };
    HazelineLightboxRenderer.prototype.showLightbox = function () {
        this.lightboxWrp.style.opacity = '1';
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
        this.updateLightboxPlacement(target, sectionStep, isLastStep);
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
        if (!this.textualOverlayOptions.disableTextFadeIn) {
            this.textualOverlayParagraph.style.transition = "all " + this.textualOverlayOptions.textFadeInTimeInMs + "ms ease-in-out";
            this.textualOverlayParagraph.style.transitionProperty = this.textualOverlayOptions.paragraphCSS.transitionProperty;
        }
        this.textualOverlay = document.createElement('div');
        this.textualOverlay.id = elements_ids_enum_1.HazelineElementsIds.lightboxTextualOverlay;
        this.textualOverlay = styles_manager_core_1.HazelineStylesManager.styleElement(this.textualOverlay, this.textualOverlayOptions.overlayCSS);
        this.textualOverlay.style.width = '100%';
        this.textualOverlay.style.height = '100%';
        this.textualOverlay.style.zIndex = (+this.textualOverlay.style.zIndex + 1).toString();
        if (!this.textualOverlayOptions.disableBgFadeIn) {
            this.textualOverlay.style.transition = "all " + this.textualOverlayOptions.bgFadeInTimeInMs + "ms ease-in-out";
            this.textualOverlay.style.transitionProperty = this.textualOverlayOptions.overlayCSS.transitionProperty;
        }
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
                : 10);
        }, this.textualOverlayOptions.disableBgFadeIn
            ? 0
            : 10);
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
    HazelineLightboxRenderer.prototype.updateLightboxPlacement = function (target, step, isLastStep) {
        if (isLastStep === void 0) { isLastStep = false; }
        if (!!this.textualOverlay) {
            return;
        }
        if (!this.lightboxWrp) {
            this.placeLightbox(target, step, isLastStep);
            return;
        }
        var offset = this.ligthboxOptions.positioning.offset;
        var attachment = this.ligthboxOptions.positioning.attachment;
        var constraints = this.ligthboxOptions.positioning.constraints;
        var targetAttachment = this.ligthboxOptions.positioning.targetAttachment;
        this.styleWholeLigthboxElement();
        if (!this.tether) {
            this.tether = new Tether({
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
        this.applyTexts(step, isLastStep);
        this.tether.position();
    };
    HazelineLightboxRenderer.prototype.updateTextualOverlayPlacement = function () {
        if (!this.textualOverlay) {
            return;
        }
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
var HazelineEventTrigger;
(function (HazelineEventTrigger) {
    HazelineEventTrigger[HazelineEventTrigger["next"] = 0] = "next";
    HazelineEventTrigger[HazelineEventTrigger["previous"] = 1] = "previous";
})(HazelineEventTrigger = exports.HazelineEventTrigger || (exports.HazelineEventTrigger = {}));
//# sourceMappingURL=lightbox-renderer.core.js.map

/***/ }),

/***/ "../library/dist/core/overlay-renderer.core.js":
/*!*****************************************************!*\
  !*** ../library/dist/core/overlay-renderer.core.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "../library/node_modules/rxjs/_esm5/index.js");
var elements_ids_enum_1 = __webpack_require__(/*! ./enums/elements-ids.enum */ "../library/dist/core/enums/elements-ids.enum.js");
var elements_defaults_const_1 = __webpack_require__(/*! ./consts/elements-defaults.const */ "../library/dist/core/consts/elements-defaults.const.js");
var styles_manager_core_1 = __webpack_require__(/*! ./styles-manager.core */ "../library/dist/core/styles-manager.core.js");
var HazelineOverlayRenderer = /** @class */ (function () {
    function HazelineOverlayRenderer() {
        var _this = this;
        this.backupProperties = {
            topBox: {
                opacity: null,
                transition: null,
            },
            leftBox: {
                opacity: null,
                transition: null,
            },
            rightBox: {
                opacity: null,
                transition: null,
            },
            bottomBox: {
                opacity: null,
                transition: null,
            },
        };
        this._$prematureEndRequired = new rxjs_1.Subject();
        this.overlayOptions = Object.assign({}, elements_defaults_const_1.HazelineElementsDefaults.overlay);
        this.endTutorialBtnClickEvtListener = function () { return _this._$prematureEndRequired.next(true); };
        this.endTutorialBtnMouseLeaveEvtListener = function () { return styles_manager_core_1.HazelineStylesManager.styleElement(_this.endTutorialBtn, _this.overlayOptions.endTutorialBtnCSS); };
        this.endTutorialBtnMouseEnterEvtListener = function () { return styles_manager_core_1.HazelineStylesManager.styleElement(_this.endTutorialBtn, _this.overlayOptions.endTutorialBtnHoverCSS); };
    }
    HazelineOverlayRenderer.prototype.$premartureEndRequired = function () {
        return this._$prematureEndRequired;
    };
    HazelineOverlayRenderer.prototype.dispose = function () {
        this.detachEndTutorialBtnEventListeners();
        this.destroyPreviousElementsIfAny();
    };
    HazelineOverlayRenderer.prototype.hideCurrentOverlays = function () {
        this.backupPropertiesOfOverlayBoxes();
        this.fadeOutOverlayBoxes();
    };
    HazelineOverlayRenderer.prototype.showCurrentOverlays = function () {
        this.restorePropertiesOfOverlayBoxes();
    };
    HazelineOverlayRenderer.prototype.placeWaitForDelayOverlay = function (message, textColor) {
        var _this = this;
        var overlayShown = new rxjs_1.Subject();
        var delayInProgressCSS = {
            zIndex: this.overlayOptions.overlayCSS.zIndex,
            top: '0',
            left: '0',
            opacity: '0',
            display: 'flex',
            color: textColor,
            fontSize: '30px',
            position: 'fixed',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: window.innerWidth + "px",
            height: window.innerHeight + "px",
            transition: 'opacity 200ms ease-in-out',
            background: this.overlayOptions.overlayCSS.background,
        };
        this.hideCurrentOverlays();
        this.delayInProgressOverlay = document.createElement('div');
        document.body.prepend(this.delayInProgressOverlay);
        this.delayInProgressOverlay = styles_manager_core_1.HazelineStylesManager.styleElement(this.delayInProgressOverlay, delayInProgressCSS);
        this.delayInProgressOverlay.id = elements_ids_enum_1.HazelineElementsIds.waitForDelayOverlay;
        this.delayInProgressOverlay.innerHTML = message;
        setTimeout(function () {
            _this.delayInProgressOverlay.style.opacity = '1';
            overlayShown.next(true);
        }, 220);
        return overlayShown;
    };
    HazelineOverlayRenderer.prototype.removeWaitForDelayOverlay = function () {
        if (!document.getElementById(elements_ids_enum_1.HazelineElementsIds.waitForDelayOverlay)) {
            return;
        }
        document.body.removeChild(document.getElementById(elements_ids_enum_1.HazelineElementsIds.waitForDelayOverlay));
        this.showCurrentOverlays();
        this.delayInProgressOverlay = null;
    };
    HazelineOverlayRenderer.prototype.placeEndTutorialButton = function () {
        this.createEndTutorialButton();
        this.applyEndTutorialBtnOptions();
        this.attachEndTutorialButtonToBody();
        this.attachEndTutorialBtnEventsListeners();
    };
    HazelineOverlayRenderer.prototype.removeEndTutorialButton = function () {
        if (!!document.getElementById(elements_ids_enum_1.HazelineElementsIds.endTutorialButton)) {
            this.detachEndTutorialBtnEventListeners();
            document.body.removeChild(document.getElementById(elements_ids_enum_1.HazelineElementsIds.endTutorialButton));
        }
    };
    HazelineOverlayRenderer.prototype.setDynamicOptions = function (overlayOpts) {
        var _this = this;
        if (!overlayOpts) {
            return;
        }
        Object.keys(overlayOpts).forEach(function (optsKey) {
            if (typeof overlayOpts[optsKey] === 'object') {
                _this.overlayOptions[optsKey] = Object.assign({}, _this.overlayOptions[optsKey], overlayOpts[optsKey]);
            }
            if (!!overlayOpts[optsKey] && typeof overlayOpts[optsKey] !== 'object') {
                _this.overlayOptions[optsKey] = overlayOpts[optsKey];
            }
        });
    };
    HazelineOverlayRenderer.prototype.setGlobalOptions = function (overlayOpts) {
        var _this = this;
        if (!overlayOpts) {
            return;
        }
        Object.keys(overlayOpts).forEach(function (optsKey) {
            if (typeof overlayOpts[optsKey] === 'object') {
                _this.overlayOptions[optsKey] = Object.assign({}, elements_defaults_const_1.HazelineElementsDefaults.overlay[optsKey], overlayOpts[optsKey]);
            }
            if (!!overlayOpts[optsKey] && typeof overlayOpts[optsKey] !== 'object') {
                _this.overlayOptions[optsKey] = overlayOpts[optsKey];
            }
        });
    };
    HazelineOverlayRenderer.prototype.updateElementsDimensions = function (dimensions) {
        this.topBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.topBox);
        this.leftBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.leftBox);
        this.rightBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.rightBox);
        this.bottomBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.bottomBox);
        if (!this.topBox) {
            this.wrapElement(dimensions);
            this.backupPropertiesOfOverlayBoxes();
        }
        if (this.topBox.style.opacity === '0') {
            this.showCurrentOverlays();
        }
        this.applyOptionsOnElements({
            topBox: this.topBox,
            leftBox: this.leftBox,
            rightBox: this.rightBox,
            bottomBox: this.bottomBox,
        }, dimensions);
        this.applyEndTutorialBtnOptions();
    };
    HazelineOverlayRenderer.prototype.wrapElement = function (dimensions) {
        this.destroyPreviousElementsIfAny();
        var wrappingElements = this.createWrappingElements(dimensions);
        this.attachElementsToBody(wrappingElements);
    };
    HazelineOverlayRenderer.prototype.applyEndTutorialBtnOptions = function () {
        this.endTutorialBtn.innerHTML = this.overlayOptions.closeBtnText;
        styles_manager_core_1.HazelineStylesManager.styleElement(this.endTutorialBtn, this.overlayOptions.endTutorialBtnCSS);
    };
    HazelineOverlayRenderer.prototype.applyOptionsOnElements = function (elements, dimensions) {
        var _this = this;
        elements.topBox.id = elements_ids_enum_1.HazelineElementsIds.topBox;
        elements.leftBox.id = elements_ids_enum_1.HazelineElementsIds.leftBox;
        elements.rightBox.id = elements_ids_enum_1.HazelineElementsIds.rightBox;
        elements.bottomBox.id = elements_ids_enum_1.HazelineElementsIds.bottomBox;
        elements.bottomBox.id = elements_ids_enum_1.HazelineElementsIds.bottomBox;
        Object.keys(elements).forEach(function (el) { return styles_manager_core_1.HazelineStylesManager.styleElement(elements[el], _this.overlayOptions.overlayCSS); });
        elements.topBox.style.width = dimensions.topBox.width + "px";
        elements.topBox.style.height = dimensions.topBox.height + "px";
        elements.topBox.style.left = dimensions.topBox.offsetLeft + "px";
        elements.leftBox.style.width = dimensions.leftBox.width + "px";
        elements.leftBox.style.height = dimensions.leftBox.height + "px";
        elements.rightBox.style.width = dimensions.rightBox.width + "px";
        elements.rightBox.style.height = dimensions.rightBox.height + "px";
        elements.rightBox.style.left = dimensions.rightBox.offsetLeft + "px";
        elements.bottomBox.style.width = dimensions.bottomBox.width + "px";
        elements.bottomBox.style.height = dimensions.bottomBox.height + "px";
        elements.bottomBox.style.top = dimensions.bottomBox.offsetTop + "px";
        elements.bottomBox.style.left = dimensions.bottomBox.offsetLeft + "px";
        return elements;
    };
    HazelineOverlayRenderer.prototype.attachElementsToBody = function (elements) {
        var body = document.querySelector('body');
        body.prepend(elements.topBox); // not fully supported. See browser tables
        body.prepend(elements.leftBox); // not fully supported. See browser tables
        body.prepend(elements.rightBox); // not fully supported. See browser tables
        body.prepend(elements.bottomBox); // not fully supported. See browser tables
    };
    HazelineOverlayRenderer.prototype.attachEndTutorialButtonToBody = function () {
        var body = document.querySelector('body');
        body.prepend(this.endTutorialBtn); // not fully supported. See browser tables
    };
    HazelineOverlayRenderer.prototype.attachEndTutorialBtnEventsListeners = function () {
        this.endTutorialBtn.addEventListener('click', this.endTutorialBtnClickEvtListener);
        this.endTutorialBtn.addEventListener('mouseleave', this.endTutorialBtnMouseLeaveEvtListener);
        this.endTutorialBtn.addEventListener('mouseenter', this.endTutorialBtnMouseEnterEvtListener);
    };
    HazelineOverlayRenderer.prototype.backupPropertiesOfOverlayBoxes = function () {
        if (!this.topBox) {
            return;
        }
        this.backupProperties.topBox.opacity =
            this.topBox.style.opacity;
        this.backupProperties.topBox.transition =
            this.topBox.style.transition;
        this.backupProperties.leftBox.opacity =
            this.leftBox.style.opacity;
        this.backupProperties.leftBox.transition =
            this.leftBox.style.transition;
        this.backupProperties.rightBox.opacity =
            this.rightBox.style.opacity;
        this.backupProperties.rightBox.transition =
            this.rightBox.style.transition;
        this.backupProperties.bottomBox.opacity =
            this.bottomBox.style.opacity;
        this.backupProperties.bottomBox.transition =
            this.bottomBox.style.transition;
    };
    HazelineOverlayRenderer.prototype.restorePropertiesOfOverlayBoxes = function () {
        if (!this.topBox) {
            return;
        }
        this.topBox.style.opacity = this.backupProperties.topBox.opacity;
        this.topBox.style.transition = this.backupProperties.topBox.transition;
        this.leftBox.style.opacity = this.backupProperties.leftBox.opacity;
        this.leftBox.style.transition = this.backupProperties.leftBox.transition;
        this.rightBox.style.opacity = this.backupProperties.rightBox.opacity;
        this.rightBox.style.transition = this.backupProperties.rightBox.transition;
        this.bottomBox.style.opacity = this.backupProperties.bottomBox.opacity;
        this.bottomBox.style.transition = this.backupProperties.bottomBox.transition;
    };
    HazelineOverlayRenderer.prototype.createEndTutorialButton = function () {
        this.endTutorialBtn = document.createElement('button');
        this.endTutorialBtn.id = elements_ids_enum_1.HazelineElementsIds.endTutorialButton;
    };
    HazelineOverlayRenderer.prototype.createWrappingElements = function (dimensions) {
        this.topBox = document.createElement('div');
        this.leftBox = document.createElement('div');
        this.rightBox = document.createElement('div');
        this.bottomBox = document.createElement('div');
        var elements = this.applyOptionsOnElements({
            topBox: this.topBox,
            leftBox: this.leftBox,
            rightBox: this.rightBox,
            bottomBox: this.bottomBox,
        }, dimensions);
        this.applyEndTutorialBtnOptions();
        return elements;
    };
    HazelineOverlayRenderer.prototype.destroyPreviousElementsIfAny = function () {
        if (!!document.getElementById(elements_ids_enum_1.HazelineElementsIds.topBox)) {
            document.body.removeChild(document.getElementById(elements_ids_enum_1.HazelineElementsIds.topBox));
        }
        if (!!document.getElementById(elements_ids_enum_1.HazelineElementsIds.leftBox)) {
            document.body.removeChild(document.getElementById(elements_ids_enum_1.HazelineElementsIds.leftBox));
        }
        if (!!document.getElementById(elements_ids_enum_1.HazelineElementsIds.rightBox)) {
            document.body.removeChild(document.getElementById(elements_ids_enum_1.HazelineElementsIds.rightBox));
        }
        if (!!document.getElementById(elements_ids_enum_1.HazelineElementsIds.bottomBox)) {
            document.body.removeChild(document.getElementById(elements_ids_enum_1.HazelineElementsIds.bottomBox));
        }
        if (!!document.getElementById(elements_ids_enum_1.HazelineElementsIds.endTutorialButton)) {
            document.body.removeChild(document.getElementById(elements_ids_enum_1.HazelineElementsIds.endTutorialButton));
        }
    };
    HazelineOverlayRenderer.prototype.detachEndTutorialBtnEventListeners = function () {
        if (this.endTutorialBtn) {
            this.endTutorialBtn.removeEventListener('click', this.endTutorialBtnClickEvtListener);
            this.endTutorialBtn.removeEventListener('mouseleave', this.endTutorialBtnMouseLeaveEvtListener);
            this.endTutorialBtn.removeEventListener('mouseenter', this.endTutorialBtnMouseEnterEvtListener);
        }
    };
    HazelineOverlayRenderer.prototype.fadeOutOverlayBoxes = function () {
        var _this = this;
        if (!this.topBox) {
            return;
        }
        ['topBox', 'leftBox', 'rightBox', 'bottomBox']
            .forEach(function (k) { return _this[k].style.transition = 'opacity 200ms ease-in-out'; });
        setTimeout(function () { return ['topBox', 'leftBox', 'rightBox', 'bottomBox']
            .forEach(function (k) { return _this[k].style.opacity = '0'; }); }, 10);
    };
    return HazelineOverlayRenderer;
}());
exports.HazelineOverlayRenderer = HazelineOverlayRenderer;
//# sourceMappingURL=overlay-renderer.core.js.map

/***/ }),

/***/ "../library/dist/core/runner.core.js":
/*!*******************************************!*\
  !*** ../library/dist/core/runner.core.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = __webpack_require__(/*! rxjs */ "../library/node_modules/rxjs/_esm5/index.js");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../library/node_modules/rxjs/_esm5/operators/index.js");
var elements_defaults_const_1 = __webpack_require__(/*! ./consts/elements-defaults.const */ "../library/dist/core/consts/elements-defaults.const.js");
var elements_ids_enum_1 = __webpack_require__(/*! ./enums/elements-ids.enum */ "../library/dist/core/enums/elements-ids.enum.js");
var tutorial_section_statuses_enum_1 = __webpack_require__(/*! ./enums/tutorial-section-statuses.enum */ "../library/dist/core/enums/tutorial-section-statuses.enum.js");
var element_manager_core_1 = __webpack_require__(/*! ./element-manager.core */ "../library/dist/core/element-manager.core.js");
var lightbox_renderer_core_1 = __webpack_require__(/*! ./lightbox-renderer.core */ "../library/dist/core/lightbox-renderer.core.js");
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
            .pipe(operators_1.tap(function () { return _this.overlayRenderer.placeEndTutorialButton(); }), operators_1.tap(function () {
            _this.isFirstStep = _this.currentSectionStepIdx === 0;
            _this.isLastStep = (section.steps.length - 1) === _this.currentSectionStepIdx;
            _this.thisStepUsesTextualOverlay = _this.currentSection.steps[_this.currentSectionStepIdx].useOverlayInsteadOfLightbox;
            _this.previousStepUsedTextualOverlay = _this.currentSectionStepIdx === 0
                ? false
                : _this.currentSection.steps[_this.previousSectionStepIdx].useOverlayInsteadOfLightbox;
        }), operators_1.tap(function () {
            _this.applyCustomOptionsIfAny(elements_defaults_const_1.HazelineElementsDefaults);
            _this.applyCustomOptionsIfAny(section.globalOptions);
            _this.applyCustomOptionsIfAny(_this.currentSection.steps[_this.currentSectionStepIdx].dynamicOptions, true);
        }), operators_1.tap(function () { return wrapElementsDimensions = _this.getWrappingDimensions(); }), operators_1.tap(function () {
            if (!_this.thisStepUsesTextualOverlay) {
                _this.lightboxRenderer.disposeTextualOverlay();
            }
            if (!!wrapElementsDimensions) {
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
                if (_this.currentSection.steps[_this.currentSectionStepIdx].dynamicOptions && _this.currentSection.steps[_this.currentSectionStepIdx].dynamicOptions.textualOverlay) {
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
        }); }), operators_1.tap(function () { return _this.previousSectionStepIdx = _this.currentSectionStepIdx; })).subscribe();
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
                _this.currentSection = null;
                _this.currentSectionStepIdx = 0;
                _this.previousSectionStepIdx = 0;
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
            _this.overlayRenderer.dispose();
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

/***/ }),

/***/ "../library/dist/core/styles-manager.core.js":
/*!***************************************************!*\
  !*** ../library/dist/core/styles-manager.core.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HazelineStylesManager = /** @class */ (function () {
    function HazelineStylesManager() {
    }
    HazelineStylesManager.styleElement = function (element, cssRules) {
        if (!cssRules) {
            return element;
        }
        Object.keys(cssRules).forEach(function (rule) {
            element.style[rule] = cssRules[rule];
        });
        return element;
    };
    return HazelineStylesManager;
}());
exports.HazelineStylesManager = HazelineStylesManager;
//# sourceMappingURL=styles-manager.core.js.map

/***/ }),

/***/ "../library/dist/hazeline.js":
/*!***********************************!*\
  !*** ../library/dist/hazeline.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var operators_1 = __webpack_require__(/*! rxjs/operators */ "../library/node_modules/rxjs/_esm5/operators/index.js");
var rxjs_1 = __webpack_require__(/*! rxjs */ "../library/node_modules/rxjs/_esm5/index.js");
var runner_core_1 = __webpack_require__(/*! ./core/runner.core */ "../library/dist/core/runner.core.js");
var element_manager_core_1 = __webpack_require__(/*! ./core/element-manager.core */ "../library/dist/core/element-manager.core.js");
var overlay_renderer_core_1 = __webpack_require__(/*! ./core/overlay-renderer.core */ "../library/dist/core/overlay-renderer.core.js");
var lightbox_renderer_core_1 = __webpack_require__(/*! ./core/lightbox-renderer.core */ "../library/dist/core/lightbox-renderer.core.js");
var tutorial_statuses_enum_1 = __webpack_require__(/*! ./core/enums/tutorial-statuses.enum */ "../library/dist/core/enums/tutorial-statuses.enum.js");
var tutorial_section_statuses_enum_1 = __webpack_require__(/*! ./core/enums/tutorial-section-statuses.enum */ "../library/dist/core/enums/tutorial-section-statuses.enum.js");
var Hazeline = /** @class */ (function () {
    function Hazeline() {
        this._$tutorialStatus = new rxjs_1.BehaviorSubject(null);
        this.tutorialSections = [];
        this.lightbox = new lightbox_renderer_core_1.HazelineLightboxRenderer();
        this.renderer = new overlay_renderer_core_1.HazelineOverlayRenderer();
        this.elementManager = new element_manager_core_1.HazelineElementManager();
        this.runner = new runner_core_1.HazelineRunner(this.lightbox, this.renderer, this.elementManager);
    }
    Hazeline.prototype.addSection = function (section, clearPreviousSections) {
        if (clearPreviousSections === void 0) { clearPreviousSections = false; }
        if (!!clearPreviousSections) {
            this.clearSections();
        }
        this.tutorialSections.push(section);
    };
    Hazeline.prototype.clearSections = function () {
        this.tutorialSections = [];
    };
    Hazeline.prototype.runTutorial = function (sectionId) {
        var _this = this;
        var sectionToRun = this.tutorialSections.find(function (s) { return s.id === sectionId; });
        if (!sectionToRun) {
            this._$tutorialStatus.next({
                runningSection: null,
                runningStepInSection: null,
                status: tutorial_statuses_enum_1.HazelineTutorialStatuses.errored,
            });
        }
        if (!sectionToRun.onBeforeStart) {
            sectionToRun.onBeforeStart = function () { return new Promise(function (res, rej) { return res(true); }); };
        }
        if (!sectionToRun.onBeforeEnd) {
            sectionToRun.onBeforeEnd = function () { return new Promise(function (res, rej) { return res(true); }); };
        }
        rxjs_1.from(sectionToRun.onBeforeStart()).pipe(operators_1.switchMap(function () { return _this.runner.runSection(sectionToRun); }), operators_1.filter(function (status) { return !!status; }), operators_1.switchMap(function (status) {
            if (status.status === tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.errored) {
                _this._$tutorialStatus.next({
                    status: tutorial_statuses_enum_1.HazelineTutorialStatuses.errored,
                    runningSection: status.runningSection,
                    runningStepInSection: status.runningStepInSection
                });
            }
            if (status.status === tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.started) {
                _this._$tutorialStatus.next({
                    status: tutorial_statuses_enum_1.HazelineTutorialStatuses.started,
                    runningSection: status.runningSection,
                    runningStepInSection: status.runningStepInSection
                });
            }
            if (status.status === tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.ended) {
                _this._$tutorialStatus.next({
                    status: tutorial_statuses_enum_1.HazelineTutorialStatuses.stopped,
                    runningSection: status.runningSection,
                    runningStepInSection: status.runningStepInSection
                });
            }
            return rxjs_1.of(status);
        }), operators_1.tap(function (status) {
            if (status && status.status !== tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.started) {
                sectionToRun.onBeforeEnd().then(function () {
                    _this.runner.endTutorial();
                    _this.lightbox.dispose();
                    _this.renderer.dispose();
                    _this.renderer = new overlay_renderer_core_1.HazelineOverlayRenderer();
                    _this.lightbox = new lightbox_renderer_core_1.HazelineLightboxRenderer();
                    _this.runner = new runner_core_1.HazelineRunner(_this.lightbox, _this.renderer, _this.elementManager);
                });
            }
        })).subscribe();
        return this._$tutorialStatus;
    };
    return Hazeline;
}());
exports.Hazeline = Hazeline;
//# sourceMappingURL=hazeline.js.map

/***/ }),

/***/ "../library/dist/index.js":
/*!********************************!*\
  !*** ../library/dist/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
//  Main file
__export(__webpack_require__(/*! ./hazeline */ "../library/dist/hazeline.js"));
//  Enums
__export(__webpack_require__(/*! ./core/enums/elements-ids.enum */ "../library/dist/core/enums/elements-ids.enum.js"));
__export(__webpack_require__(/*! ./core/enums/tutorial-statuses.enum */ "../library/dist/core/enums/tutorial-statuses.enum.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../library/node_modules/rxjs/_esm5/index.js":
/*!***************************************************!*\
  !*** ../library/node_modules/rxjs/_esm5/index.js ***!
  \***************************************************/
/*! exports provided: Observable, ConnectableObservable, GroupedObservable, observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, asapScheduler, asyncScheduler, queueScheduler, animationFrameScheduler, VirtualTimeScheduler, VirtualAction, Scheduler, Subscription, Subscriber, Notification, pipe, noop, identity, isObservable, ArgumentOutOfRangeError, EmptyError, ObjectUnsubscribedError, UnsubscriptionError, TimeoutError, bindCallback, bindNodeCallback, combineLatest, concat, defer, empty, forkJoin, from, fromEvent, fromEventPattern, generate, iif, interval, merge, never, of, onErrorResumeNext, pairs, race, range, throwError, timer, using, zip, EMPTY, NEVER, config */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/caiuscitiriga/Code/hazeline/library/node_modules/rxjs/_esm5/index.js'");

/***/ }),

/***/ "../library/node_modules/rxjs/_esm5/operators/index.js":
/*!*************************************************************!*\
  !*** ../library/node_modules/rxjs/_esm5/operators/index.js ***!
  \*************************************************************/
/*! exports provided: audit, auditTime, buffer, bufferCount, bufferTime, bufferToggle, bufferWhen, catchError, combineAll, combineLatest, concat, concatAll, concatMap, concatMapTo, count, debounce, debounceTime, defaultIfEmpty, delay, delayWhen, dematerialize, distinct, distinctUntilChanged, distinctUntilKeyChanged, elementAt, endWith, every, exhaust, exhaustMap, expand, filter, finalize, find, findIndex, first, groupBy, ignoreElements, isEmpty, last, map, mapTo, materialize, max, merge, mergeAll, mergeMap, flatMap, mergeMapTo, mergeScan, min, multicast, observeOn, onErrorResumeNext, pairwise, partition, pluck, publish, publishBehavior, publishLast, publishReplay, race, reduce, repeat, repeatWhen, retry, retryWhen, refCount, sample, sampleTime, scan, sequenceEqual, share, shareReplay, single, skip, skipLast, skipUntil, skipWhile, startWith, subscribeOn, switchAll, switchMap, switchMapTo, take, takeLast, takeUntil, takeWhile, tap, throttle, throttleTime, throwIfEmpty, timeInterval, timeout, timeoutWith, timestamp, toArray, window, windowCount, windowTime, windowToggle, windowWhen, withLatestFrom, zip, zipAll */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/caiuscitiriga/Code/hazeline/library/node_modules/rxjs/_esm5/operators/index.js'");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hazeline_1 = __webpack_require__(/*! hazeline */ "../library/dist/index.js");
var hazelineSection = {
    id: 'test',
    steps: [
        {
            elementSelector: '#input-1',
            text: 'Amaze your users by guiding them across the application that you\'ve build. Step by step, explaining them how each part works by making them try each feature one by one.',
        },
        {
            elementSelector: 'none',
            text: 'Introducing Hazeline, the definitive tutorial library',
            useOverlayInsteadOfLightbox: true,
        },
        {
            elementSelector: 'none',
            text: '<div style="text-align: center">Hazeline is meant to be:</div><br><ul style="list-style: none; margin: 0; padding: 0"><li>Simple</li><li>Nice to see</li><li>Customizable</li><li>Framework agnostic</li></ul>',
            useOverlayInsteadOfLightbox: true,
        },
        {
            elementSelector: '#input-1',
            text: 'Amaze your users by guiding them across the application that you\'ve build. Step by step, explaining them how each part works by making them try each feature one by one.',
        },
        {
            elementSelector: 'none',
            text: 'You can even wait for a certain event to happen, by delaying the start of a specific step, like the next one.',
            useOverlayInsteadOfLightbox: true,
        },
        {
            delayBeforeStart: 3000,
            delayTextColor: '#fff',
            elementSelector: 'none',
            text: 'The answer is 42',
            useOverlayInsteadOfLightbox: true,
            delayText: 'Hazeline is calculating the meaning of life. <br>Please wait.',
        },
        {
            elementSelector: '#input-2',
            text: 'You can listen for custom events on the elements, and trigger the next step automatically. And even decide wether hiding or leaving visible the NEXT and PREV buttons.',
            nextStepCustomTrigger: {
                event: 'click',
                callback: function (evt, step, el) { return new Promise(function (res, rej) {
                    el.blur();
                    res();
                }); }
            }
        },
        {
            elementSelector: '#input-3',
            text: 'Also totally customize the Lightbox or any other parts, globally (once) or dynamically (step by step)',
            dynamicOptions: {
                overlay: {
                    overlayCSS: {
                        background: 'rgba(150, 34, 26, 0.83)'
                    },
                    endTutorialBtnCSS: {
                        color: '#fff',
                        borderColor: '#fff'
                    }
                },
                lightbox: {
                    nextBtnText: '>',
                    prevBtnText: '<',
                    lightboxWrapperCSS: {
                        color: '#eee',
                        background: '#333'
                    },
                    positioning: {
                        offset: '-10px 0'
                    }
                }
            }
        },
        {
            text: '<strong class="haze-font">Hazeline</strong>',
            elementSelector: 'none',
            dynamicOptions: {
                textualOverlay: {
                    hideButtons: true,
                    paragraphCSS: {
                        width: '100%',
                        textAlign: 'center'
                    }
                }
            },
            useOverlayInsteadOfLightbox: true,
        },
    ],
};
var haze = new hazeline_1.Hazeline();
window.onload = function () {
    haze.addSection(hazelineSection);
    document.getElementById('start-haze').onclick = function () {
        haze.runTutorial('test');
    };
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map