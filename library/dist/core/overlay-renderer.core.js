"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var elements_ids_enum_1 = require("./enums/elements-ids.enum");
var elements_defaults_const_1 = require("./consts/elements-defaults.const");
var styles_manager_core_1 = require("./styles-manager.core");
var HazelineOverlayRenderer = /** @class */ (function () {
    function HazelineOverlayRenderer() {
        var _this = this;
        this._$prematureEndRequired = new rxjs_1.Subject();
        this.overlayOptions = elements_defaults_const_1.HazelineElementsDefaults.overlay;
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
        if (!!this.topBox) {
            // If a box is null or undefined, we are using a textual overlay. So there's no need to 
            // apply options on elements. Event because it would end in a error.
            this.applyOptionsOnElements({
                topBox: this.topBox,
                leftBox: this.leftBox,
                rightBox: this.rightBox,
                bottomBox: this.bottomBox,
            }, dimensions);
        }
        this.applyEndTutorialBtnOptions();
    };
    HazelineOverlayRenderer.prototype.wrapElement = function (dimensions) {
        this.destroyPreviousElementsIfAny();
        var wrappingElements = this.createWrappingElements(dimensions);
        this.attachElementsToBody(wrappingElements);
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
    HazelineOverlayRenderer.prototype.detachEndTutorialBtnEventListeners = function () {
        if (this.endTutorialBtn) {
            this.endTutorialBtn.removeEventListener('click', this.endTutorialBtnClickEvtListener);
            this.endTutorialBtn.removeEventListener('mouseleave', this.endTutorialBtnMouseLeaveEvtListener);
            this.endTutorialBtn.removeEventListener('mouseenter', this.endTutorialBtnMouseEnterEvtListener);
        }
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
        Object.keys(elements).forEach(function (el) {
            styles_manager_core_1.HazelineStylesManager.styleElement(elements[el], _this.overlayOptions.overlayCSS);
        });
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
    return HazelineOverlayRenderer;
}());
exports.HazelineOverlayRenderer = HazelineOverlayRenderer;
//# sourceMappingURL=overlay-renderer.core.js.map