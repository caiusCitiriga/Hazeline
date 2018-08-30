var HazelineCanvas = /** @class */ (function () {
    function HazelineCanvas() {
        this.canvasZIndex = 2000;
        this.currentElementZIndex = 2001;
        this.currentElementOriginalZIndex = undefined;
        this.currentElementOriginalCSSPosition = undefined;
        this.currentElementCoordinates = {
            x: null,
            y: null,
            w: null,
            h: null,
        };
        this.initializeCanvas();
        this.styleCanvas();
        this.appendCanvasToBody();
    }
    HazelineCanvas.prototype.setCanvasBGColor = function (color) {
        this.ctx.fillStyle = color;
    };
    HazelineCanvas.prototype.surroundElement = function (html) {
        if (!!this.currentElement) {
            this.disposeCurrentElement();
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentElement = html instanceof HTMLElement ? html : this.fetchHTMLElementBySelector();
        this.getCoordinates();
        this.bringElementToFront();
        this.drawLeftSideRect();
        this.drawRightSideRect();
        this.drawTopSideRect();
        this.drawBottomSideRect();
    };
    HazelineCanvas.prototype.initializeCanvas = function () {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    };
    HazelineCanvas.prototype.styleCanvas = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.position = 'absolute';
    };
    HazelineCanvas.prototype.appendCanvasToBody = function () {
        document.querySelector('body').appendChild(this.canvas);
    };
    HazelineCanvas.prototype.fetchHTMLElementBySelector = function () {
        return null;
    };
    HazelineCanvas.prototype.getCoordinates = function () {
        this.currentElementCoordinates.y = this.currentElement.offsetTop;
        this.currentElementCoordinates.x = this.currentElement.offsetLeft;
        this.currentElementCoordinates.w = this.currentElement.offsetWidth;
        this.currentElementCoordinates.h = this.currentElement.offsetHeight;
    };
    HazelineCanvas.prototype.bringElementToFront = function () {
        this.currentElementOriginalZIndex = this.currentElement.style.zIndex;
        this.currentElementOriginalCSSPosition = this.currentElement.style.position;
        this.currentElement.style.position = 'relative';
        this.currentElement.style.zIndex = this.currentElementZIndex.toString();
    };
    HazelineCanvas.prototype.disposeCurrentElement = function () {
        this.currentElement.style.zIndex = this.currentElementOriginalZIndex;
        this.currentElement.style.position = this.currentElementOriginalCSSPosition;
    };
    HazelineCanvas.prototype.drawLeftSideRect = function () {
        this.ctx.fillRect(0, this.currentElementCoordinates.y, this.currentElementCoordinates.x, this.currentElementCoordinates.h);
    };
    HazelineCanvas.prototype.drawRightSideRect = function () {
        var width = this.canvas.width - (this.currentElementCoordinates.x + this.currentElementCoordinates.w);
        this.ctx.fillRect(this.currentElementCoordinates.x + this.currentElementCoordinates.w, this.currentElementCoordinates.y, width, this.currentElementCoordinates.h);
    };
    HazelineCanvas.prototype.drawTopSideRect = function () {
        this.ctx.fillRect(0, 0, this.canvas.width, this.currentElementCoordinates.y);
    };
    HazelineCanvas.prototype.drawBottomSideRect = function () {
        this.ctx.fillRect(0, this.currentElementCoordinates.y + this.currentElementCoordinates.h, this.canvas.width, this.canvas.height - (this.currentElementCoordinates.y + this.currentElementCoordinates.h));
    };
    return HazelineCanvas;
}());
export { HazelineCanvas };
//# sourceMappingURL=index.js.map