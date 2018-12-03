"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var elements_ids_enum_1 = require("./enums/elements-ids.enum");
var elements_defaults_const_1 = require("./consts/elements-defaults.const");
var styles_manager_core_1 = require("./styles-manager.core");
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
        // if (this.overlayOptions.topSideWrapOffset) {
        //     elements.topBox.style.top = `-${this.overlayOptions.topSideWrapOffset}px`;
        // }
        // if (this.overlayOptions.rightSideWrapOffset) {
        //     elements.rightBox.style.left = `unset`;
        //     elements.rightBox.style.right = `-${this.overlayOptions.rightSideWrapOffset}px`;
        //     elements.topBox.style.width = `${dimensions.topBox.width + this.overlayOptions.rightSideWrapOffset}px`;
        //     elements.bottomBox.style.width = `${dimensions.bottomBox.width + this.overlayOptions.rightSideWrapOffset}px`;
        // }
        // if (this.overlayOptions.bottomSideWrapOffset) {
        //     elements.bottomBox.style.top = `unset`;
        //     elements.bottomBox.style.bottom = `-${this.overlayOptions.bottomSideWrapOffset}px`;
        // }
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