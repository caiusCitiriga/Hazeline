"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ElementUtils = /** @class */ (function () {
    function ElementUtils() {
    }
    ElementUtils.fetchHTMLElementBySelector = function (selector) {
        var element = document.querySelector(selector);
        if (!element) {
            throw new Error("HAZELINE-ELEMENT-UTILS: Cannot find the [" + selector + "] element");
        }
        return element;
    };
    ElementUtils.getCoordinates = function (element) {
        this.currentElementCoordinates.y = element.getBoundingClientRect().top;
        this.currentElementCoordinates.x = element.getBoundingClientRect().left;
        this.currentElementCoordinates.w = element.getBoundingClientRect().width;
        this.currentElementCoordinates.h = element.getBoundingClientRect().height;
        return this.currentElementCoordinates;
    };
    ElementUtils.currentElementCoordinates = {
        x: null,
        y: null,
        w: null,
        h: null,
    };
    return ElementUtils;
}());
exports.ElementUtils = ElementUtils;
