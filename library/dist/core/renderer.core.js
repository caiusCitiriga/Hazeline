"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HazelineRenderer = /** @class */ (function () {
    function HazelineRenderer() {
    }
    HazelineRenderer.prototype.wrapElement = function (wrappingElementsDimensions) {
        var wrappingElements = this.createWrappingElements(wrappingElementsDimensions);
        this.attachElementsToBody(wrappingElements);
    };
    HazelineRenderer.prototype.attachElementsToBody = function (elements) {
        var body = document.querySelector('body');
        body.appendChild(elements.topBox);
        body.appendChild(elements.leftBox);
        body.appendChild(elements.rightBox);
        body.appendChild(elements.bottomBox);
    };
    HazelineRenderer.prototype.createWrappingElements = function (wrappingElementsDimensions) {
        var topBox = document.createElement('div');
        var leftBox = document.createElement('div');
        var rightBox = document.createElement('div');
        var bottomBox = document.createElement('div');
        topBox.style.border = '1px solid red';
        leftBox.style.border = '1px solid red';
        rightBox.style.border = '1px solid red';
        bottomBox.style.border = '1px solid red';
        topBox.style.position = 'fixed';
        leftBox.style.position = 'fixed';
        rightBox.style.position = 'fixed';
        bottomBox.style.position = 'fixed';
        topBox.style.width = wrappingElementsDimensions.topBox.width + "px";
        topBox.style.height = wrappingElementsDimensions.topBox.height + "px";
        topBox.style.left = wrappingElementsDimensions.topBox.offsetLeft + "px";
        leftBox.style.width = wrappingElementsDimensions.leftBox.width + "px";
        leftBox.style.height = wrappingElementsDimensions.leftBox.height + "px";
        rightBox.style.width = wrappingElementsDimensions.rightBox.width + "px";
        rightBox.style.height = wrappingElementsDimensions.rightBox.height + "px";
        rightBox.style.left = wrappingElementsDimensions.rightBox.offsetLeft + "px";
        bottomBox.style.height = wrappingElementsDimensions.bottomBox.height + "px";
        bottomBox.style.top = wrappingElementsDimensions.bottomBox.offsetTop + "px";
        bottomBox.style.left = wrappingElementsDimensions.bottomBox.offsetLeft + "px";
        return {
            topBox: topBox,
            leftBox: leftBox,
            rightBox: rightBox,
            bottomBox: bottomBox
        };
    };
    return HazelineRenderer;
}());
exports.HazelineRenderer = HazelineRenderer;
//# sourceMappingURL=renderer.core.js.map