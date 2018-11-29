"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_ids_enum_1 = require("./enums/elements-ids.enum");
var styles_manager_core_1 = require("./styles-manager.core");
var elements_default_styles_const_1 = require("./consts/elements-default-styles.const");
var HazelineOverlayRenderer = /** @class */ (function () {
    function HazelineOverlayRenderer() {
    }
    HazelineOverlayRenderer.prototype.applyStyles = function (overlayOpts) {
        this.overlayOptions = overlayOpts;
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
    };
    HazelineOverlayRenderer.prototype.updateElementsDimensions = function (dimensions) {
        this.topBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.topBox);
        this.leftBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.leftBox);
        this.rightBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.rightBox);
        this.bottomBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.bottomBox);
        this.setElementsProperties({
            topBox: this.topBox,
            leftBox: this.leftBox,
            rightBox: this.rightBox,
            bottomBox: this.bottomBox
        }, dimensions);
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
    HazelineOverlayRenderer.prototype.createWrappingElements = function (dimensions) {
        this.topBox = document.createElement('div');
        this.leftBox = document.createElement('div');
        this.rightBox = document.createElement('div');
        this.bottomBox = document.createElement('div');
        var elements = this.setElementsProperties({
            topBox: this.topBox,
            leftBox: this.leftBox,
            rightBox: this.rightBox,
            bottomBox: this.bottomBox
        }, dimensions);
        return elements;
    };
    HazelineOverlayRenderer.prototype.setElementsProperties = function (elements, dimensions) {
        var _this = this;
        elements.topBox.id = elements_ids_enum_1.HazelineElementsIds.topBox;
        elements.leftBox.id = elements_ids_enum_1.HazelineElementsIds.leftBox;
        elements.rightBox.id = elements_ids_enum_1.HazelineElementsIds.rightBox;
        elements.bottomBox.id = elements_ids_enum_1.HazelineElementsIds.bottomBox;
        Object.keys(elements).forEach(function (el) {
            styles_manager_core_1.HazelineStylesManager.styleElement(elements[el], elements_default_styles_const_1.HazelineElementsDefaultStyles.overlayBoxesInternalCommonData);
            if (_this.overlayOptions) {
                styles_manager_core_1.HazelineStylesManager.styleElement(el, _this.overlayOptions);
            }
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
//# sourceMappingURL=renderer.core.js.map