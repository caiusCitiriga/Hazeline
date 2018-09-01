"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var element_utils_1 = require("../utilities/element.utils");
var HazelineCanvas = /** @class */ (function () {
    function HazelineCanvas() {
        //  Behaviour control properties
        this.useScalingAnimation = false;
        //  Canvas style properties
        this.canvasZIndex = 2000;
        this.currentElementZIndex = 2001;
        this.pleaseWaitIsVisible = false;
        this.canvasID = 'hazeline-canvas';
        this.defaultFillStyle = 'rgba(0,0,0,.8)';
        this.pleaseWaitLayerID = 'hazeline-please-wait-layer';
        this.currentElementCoordinates = {
            x: null,
            y: null,
            w: null,
            h: null,
        };
        this.rectsToBeDrawn = {
            top: {
                x: undefined,
                y: undefined,
                targetWidth: undefined,
                targetHeight: undefined,
            },
            left: {
                x: undefined,
                y: undefined,
                targetWidth: undefined,
                targetHeight: undefined,
            },
            right: {
                x: undefined,
                y: undefined,
                targetWidth: undefined,
                targetHeight: undefined,
            },
            bottom: {
                x: undefined,
                y: undefined,
                targetWidth: undefined,
                targetHeight: undefined,
            }
        };
        //  Current element style backup properties
        this.currentElementOriginalZIndex = undefined;
        this.currentElementOriginalTransform = undefined;
        this.currentElementOriginalTransition = undefined;
        this.currentElementOriginalCSSPosition = undefined;
    }
    Object.defineProperty(HazelineCanvas.prototype, "enableScalingAnimation", {
        get: function () {
            return this.useScalingAnimation;
        },
        set: function (value) {
            this.useScalingAnimation = value;
        },
        enumerable: true,
        configurable: true
    });
    HazelineCanvas.prototype.init = function () {
        this.initializeCanvas();
        this.styleCanvas();
        this.appendCanvasToBody();
    };
    HazelineCanvas.prototype.fill = function (color) {
        color = color ? color : this.defaultFillStyle;
        if (!this.ctx) {
            console.error("HAZELINE-CANVAS: Cannot fill canvas with [" + color + "] because lack of _ctx");
            return;
        }
        this.ctx.fillStyle = color;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentElement.style.zIndex = this.currentElementOriginalZIndex;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //  restore original fill style
        this.ctx.fillStyle = this.defaultFillStyle;
    };
    HazelineCanvas.prototype.setCanvasBGColor = function (color) {
        this.overlayBackground = color;
    };
    HazelineCanvas.prototype.wrapElement = function (element, skipScalingAnimation) {
        if (this.pleaseWaitIsVisible) {
            document.querySelector('body').removeChild(document.querySelector("#" + this.pleaseWaitLayerID));
            this.pleaseWaitIsVisible = false;
        }
        if (this.currentElement) {
            this.restoreCurrentElementStyleProperties();
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentElement = element instanceof HTMLElement
            ? element
            : element_utils_1.ElementUtils.getHTMLElementBySelector(element);
        if (!this.currentElement) {
            throw new Error("HAZELINE-CANVAS: Cannot find the wanted element: [" + element + "]");
        }
        this.currentElementCoordinates = element_utils_1.ElementUtils.getCoordinates(this.currentElement);
        this.bringElementToFront(skipScalingAnimation);
        this.computeRectsCoordinates();
        this.drawRectsAround();
    };
    HazelineCanvas.prototype.destroy = function () {
        this.ctx = null;
        this.canvas = null;
        document.querySelector('body').removeChild(document.getElementById(this.canvasID));
    };
    HazelineCanvas.prototype.writeMessage = function (message, opts) {
        this.pleaseWaitIsVisible = true;
        var fontSize = opts && opts.size ? opts.size : 40;
        var fontColor = opts && opts.color ? opts.color : '#fff';
        var fontFamily = opts && opts.fontFamily ? opts.fontFamily : 'Arial';
        var paragraph = document.createElement('p');
        paragraph.setAttribute('id', this.pleaseWaitLayerID);
        paragraph.style.left = '0';
        paragraph.style.top = '45%';
        paragraph.innerText = message;
        paragraph.style.width = '100%';
        paragraph.style.color = fontColor;
        paragraph.style.position = 'fixed';
        paragraph.style.textAlign = 'center';
        paragraph.style.fontFamily = fontFamily;
        paragraph.style.fontSize = fontSize + "px";
        paragraph.style.zIndex = (this.canvasZIndex + 1).toString();
        this.fill('rgba(0,0,0,.9)');
        document.querySelector('body').appendChild(paragraph);
    };
    HazelineCanvas.prototype.initializeCanvas = function () {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    };
    HazelineCanvas.prototype.styleCanvas = function () {
        this.ctx.fillStyle = this.defaultFillStyle;
        this.canvas.setAttribute('id', this.canvasID);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.zIndex = this.canvasZIndex.toString();
    };
    HazelineCanvas.prototype.appendCanvasToBody = function () {
        document.querySelector('body').appendChild(this.canvas);
    };
    HazelineCanvas.prototype.bringElementToFront = function (forceSkipScalingAnimation) {
        this.backupElementStyleProperties();
        this.assignBasicStyleProperties();
        if (this.useScalingAnimation && !forceSkipScalingAnimation) {
            this.assignScalingStyleProperties();
        }
    };
    HazelineCanvas.prototype.assignScalingStyleProperties = function () {
        var _this = this;
        this.currentElement.style.transform = 'scale(1.8)';
        this.currentElement.style.transition = 'all 120ms ease-in-out';
        setTimeout(function () {
            _this.currentElement.style.transform = 'scale(1)';
        }, 200);
    };
    HazelineCanvas.prototype.assignBasicStyleProperties = function () {
        this.currentElement.style.borderRadius = '0';
        this.currentElement.style.position = 'relative';
        this.currentElement.style.zIndex = this.currentElementZIndex.toString();
    };
    HazelineCanvas.prototype.backupElementStyleProperties = function () {
        this.currentElementOriginalZIndex = this.currentElement.style.zIndex;
        this.currentElementOriginalTransform = this.currentElement.style.transform;
        this.currentElementOriginalCSSPosition = this.currentElement.style.position;
        this.currentElementOriginalTransition = this.currentElement.style.transition;
    };
    HazelineCanvas.prototype.restoreCurrentElementStyleProperties = function () {
        this.currentElement.style.zIndex = this.currentElementOriginalZIndex;
        this.currentElement.style.transform = this.currentElementOriginalTransform;
        this.currentElement.style.position = this.currentElementOriginalCSSPosition;
        this.currentElement.style.transition = this.currentElementOriginalTransition;
    };
    HazelineCanvas.prototype.computeRectsCoordinates = function () {
        this.rectsToBeDrawn.top.x = 0;
        this.rectsToBeDrawn.top.y = 0;
        this.rectsToBeDrawn.top.targetWidth = this.canvas.width;
        this.rectsToBeDrawn.top.targetHeight = this.currentElementCoordinates.y;
        this.rectsToBeDrawn.bottom.x = 0;
        this.rectsToBeDrawn.bottom.y = this.currentElementCoordinates.y + this.currentElementCoordinates.h;
        this.rectsToBeDrawn.bottom.targetWidth = this.canvas.width;
        this.rectsToBeDrawn.bottom.targetHeight = this.canvas.height - (this.currentElementCoordinates.y + this.currentElementCoordinates.h);
        this.rectsToBeDrawn.left.x = 0;
        this.rectsToBeDrawn.left.y = this.currentElementCoordinates.y;
        this.rectsToBeDrawn.left.targetWidth = this.currentElementCoordinates.x;
        this.rectsToBeDrawn.left.targetHeight = this.currentElementCoordinates.h;
        this.rectsToBeDrawn.right.x = this.currentElementCoordinates.x + this.currentElementCoordinates.w;
        this.rectsToBeDrawn.right.y = this.currentElementCoordinates.y;
        this.rectsToBeDrawn.right.targetWidth = this.canvas.width - (this.currentElementCoordinates.x + this.currentElementCoordinates.w);
        this.rectsToBeDrawn.right.targetHeight = this.currentElementCoordinates.h;
    };
    HazelineCanvas.prototype.drawRectsAround = function () {
        this.ctx.fillStyle = this.overlayBackground ? this.overlayBackground : 'rgba(0,0,0,.8)';
        this.drawTopSideRect();
        this.drawLeftSideRect();
        this.drawRightSideRect();
        this.drawBottomSideRect();
    };
    HazelineCanvas.prototype.drawLeftSideRect = function () {
        this.ctx.fillRect(this.rectsToBeDrawn.left.x, this.rectsToBeDrawn.left.y, this.rectsToBeDrawn.left.targetWidth, this.rectsToBeDrawn.left.targetHeight);
    };
    HazelineCanvas.prototype.drawRightSideRect = function () {
        this.ctx.fillRect(this.rectsToBeDrawn.right.x, this.rectsToBeDrawn.right.y, this.rectsToBeDrawn.right.targetWidth, this.rectsToBeDrawn.right.targetHeight);
    };
    HazelineCanvas.prototype.drawTopSideRect = function () {
        this.ctx.fillRect(this.rectsToBeDrawn.top.x, this.rectsToBeDrawn.top.y, this.rectsToBeDrawn.top.targetWidth, this.rectsToBeDrawn.top.targetHeight);
    };
    HazelineCanvas.prototype.drawBottomSideRect = function () {
        this.ctx.fillRect(this.rectsToBeDrawn.bottom.x, this.rectsToBeDrawn.bottom.y, this.rectsToBeDrawn.bottom.targetWidth, this.rectsToBeDrawn.bottom.targetHeight);
    };
    return HazelineCanvas;
}());
exports.HazelineCanvas = HazelineCanvas;
//# sourceMappingURL=canvas.core.js.map