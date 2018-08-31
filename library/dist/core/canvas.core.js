"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var element_utils_1 = require("../utilities/element.utils");
var HazelineCanvas = /** @class */ (function () {
    function HazelineCanvas() {
        this.canvasZIndex = 2000;
        this.useScalingAnimation = false;
        this.currentElementZIndex = 2001;
        this.canvasID = 'hazeline-canvas';
        this.defaultFillStyle = 'rgba(0,0,0,.8)';
        this.currentElementOriginalZIndex = undefined;
        this.currentElementOriginalCSSPosition = undefined;
        this.currentElementCoordinates = {
            x: null,
            y: null,
            w: null,
            h: null,
        };
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
    HazelineCanvas.prototype.setCanvasBGColor = function (color) {
        this.overlayBackground = color;
    };
    HazelineCanvas.prototype.wrapElement = function (element) {
        if (!!this.currentElement) {
            this.disposeCurrentElement();
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentElement = element instanceof HTMLElement
            ? element
            : element_utils_1.ElementUtils.fetchHTMLElementBySelector(element);
        if (!this.currentElement) {
            return;
        }
        this.currentElementCoordinates = element_utils_1.ElementUtils.getCoordinates(this.currentElement);
        this.bringElementToFront();
        this.drawRectsAround();
    };
    HazelineCanvas.prototype.destroy = function () {
        this.ctx = null;
        this.canvas = null;
        document.querySelector('body').removeChild(document.getElementById(this.canvasID));
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
    HazelineCanvas.prototype.bringElementToFront = function () {
        var _this = this;
        this.currentElementOriginalZIndex = this.currentElement.style.zIndex;
        this.currentElementOriginalCSSPosition = this.currentElement.style.position;
        this.currentElement.style.borderRadius = '0';
        this.currentElement.style.position = 'relative';
        this.currentElement.style.zIndex = this.currentElementZIndex.toString();
        if (this.useScalingAnimation) {
            this.currentElement.style.transform = 'scale(1.8)';
            this.currentElement.style.display = 'inline-block';
            this.currentElement.style.transition = 'all 120ms ease-in-out';
            setTimeout(function () {
                _this.currentElement.style.transform = 'scale(1)';
            }, 120);
        }
    };
    HazelineCanvas.prototype.disposeCurrentElement = function () {
        this.currentElement.style.zIndex = this.currentElementOriginalZIndex;
        this.currentElement.style.position = this.currentElementOriginalCSSPosition;
    };
    HazelineCanvas.prototype.drawRectsAround = function () {
        this.ctx.fillStyle = this.overlayBackground ? this.overlayBackground : 'rgba(0,0,0,.8)';
        this.drawTopSideRect();
        this.drawLeftSideRect();
        this.drawRightSideRect();
        this.drawBottomSideRect();
    };
    HazelineCanvas.prototype.drawLeftSideRect = function () {
        this.ctx.fillRect(0, this.currentElementCoordinates.y, this.currentElementCoordinates.x, this.currentElementCoordinates.h);
    };
    HazelineCanvas.prototype.drawRightSideRect = function () {
        var width = this.canvas.width - (this.currentElementCoordinates.x + this.currentElementCoordinates.w);
        this.ctx.fillRect((this.currentElementCoordinates.x + this.currentElementCoordinates.w), (this.currentElementCoordinates.y), width, this.currentElementCoordinates.h);
    };
    HazelineCanvas.prototype.drawTopSideRect = function () {
        this.ctx.fillRect(0, 0, this.canvas.width, this.currentElementCoordinates.y);
    };
    HazelineCanvas.prototype.drawBottomSideRect = function () {
        this.ctx.fillRect(0, (this.currentElementCoordinates.y + this.currentElementCoordinates.h), this.canvas.width, this.canvas.height - (this.currentElementCoordinates.y + this.currentElementCoordinates.h));
    };
    return HazelineCanvas;
}());
exports.HazelineCanvas = HazelineCanvas;
