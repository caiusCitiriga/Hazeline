export class HazelineCanvas {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public constructor() {
        this.initializeCanvas();
        this.resizeCanvas();
        this.appendCanvasToBody();
    }

    public setCanvasBGColor(color: string): void {
        this.canvas.style.background = color;
    }

    private initializeCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private appendCanvasToBody(): void {
        document.querySelector('body').appendChild(this.canvas);
    }
}