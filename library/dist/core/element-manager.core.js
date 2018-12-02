"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_defaults_const_1 = require("./consts/elements-defaults.const");
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
        var dimensions = {
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
//# sourceMappingURL=element-manager.core.js.map