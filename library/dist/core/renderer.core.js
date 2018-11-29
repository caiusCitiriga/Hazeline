"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_ids_enum_1 = require("./enums/elements-ids.enum");
var HazelineRenderer = /** @class */ (function () {
    function HazelineRenderer() {
    }
    HazelineRenderer.prototype.updateElementsDimensions = function (dimensions) {
        var topBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.topBox);
        var leftBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.leftBox);
        var rightBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.rightBox);
        var bottomBox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.bottomBox);
        this.setElementsProperties({
            topBox: topBox,
            leftBox: leftBox,
            rightBox: rightBox,
            bottomBox: bottomBox
        }, dimensions);
    };
    HazelineRenderer.prototype.wrapElement = function (dimensions) {
        var wrappingElements = this.createWrappingElements(dimensions);
        this.attachElementsToBody(wrappingElements);
    };
    HazelineRenderer.prototype.attachElementsToBody = function (elements) {
        var body = document.querySelector('body');
        body.prepend(elements.topBox); // not fully supported. See browser tables
        body.prepend(elements.leftBox); // not fully supported. See browser tables
        body.prepend(elements.rightBox); // not fully supported. See browser tables
        body.prepend(elements.bottomBox); // not fully supported. See browser tables
    };
    HazelineRenderer.prototype.createWrappingElements = function (dimensions) {
        var topBox = document.createElement('div');
        var leftBox = document.createElement('div');
        var rightBox = document.createElement('div');
        var bottomBox = document.createElement('div');
        var elements = this.setElementsProperties({
            topBox: topBox,
            leftBox: leftBox,
            rightBox: rightBox,
            bottomBox: bottomBox
        }, dimensions);
        return elements;
    };
    HazelineRenderer.prototype.setElementsProperties = function (elements, dimensions) {
        elements.topBox.id = elements_ids_enum_1.HazelineElementsIds.topBox;
        elements.leftBox.id = elements_ids_enum_1.HazelineElementsIds.leftBox;
        elements.rightBox.id = elements_ids_enum_1.HazelineElementsIds.rightBox;
        elements.bottomBox.id = elements_ids_enum_1.HazelineElementsIds.bottomBox;
        elements.topBox.style.border = '1px solid red';
        elements.leftBox.style.border = '1px solid red';
        elements.rightBox.style.border = '1px solid red';
        elements.bottomBox.style.border = '1px solid red';
        elements.topBox.style.position = 'fixed';
        elements.leftBox.style.position = 'fixed';
        elements.rightBox.style.position = 'fixed';
        elements.bottomBox.style.position = 'fixed';
        elements.topBox.style.background = 'rgba(0,0,0,.8)';
        elements.leftBox.style.background = 'rgba(0,0,0,.8)';
        elements.rightBox.style.background = 'rgba(0,0,0,.8)';
        elements.bottomBox.style.background = 'rgba(0,0,0,.8)';
        elements.topBox.style.zIndex = '99999';
        elements.leftBox.style.zIndex = '99999';
        elements.rightBox.style.zIndex = '99999';
        elements.bottomBox.style.zIndex = '99999';
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
    return HazelineRenderer;
}());
exports.HazelineRenderer = HazelineRenderer;
//# sourceMappingURL=renderer.core.js.map