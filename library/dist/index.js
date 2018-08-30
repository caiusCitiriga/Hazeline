var HazelineCanvas = /** @class */ (function () {
    function HazelineCanvas() {
        this.initializeCanvas();
        this.resizeCanvas();
        this.appendCanvasToBody();
    }
    HazelineCanvas.prototype.setCanvasBGColor = function (color) {
        this.canvas.style.background = color;
    };
    HazelineCanvas.prototype.initializeCanvas = function () {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    };
    HazelineCanvas.prototype.resizeCanvas = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    };
    HazelineCanvas.prototype.appendCanvasToBody = function () {
        document.querySelector('body').appendChild(this.canvas);
    };
    return HazelineCanvas;
}());
export { HazelineCanvas };
//# sourceMappingURL=index.js.map