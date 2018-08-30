export class HazelineCanvas {
    private canvasZIndex = 2000;
    private currentElementZIndex = 2001;
    private currentElement: HTMLElement;
    private currentElementOriginalZIndex = undefined;
    private currentElementOriginalCSSPosition = undefined;
    private currentElementCoordinates: ElementCoordinates = {
        x: null,
        y: null,
        w: null,
        h: null,
    };

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public constructor() {
        this.initializeCanvas();
        this.styleCanvas();
        this.appendCanvasToBody();
    }

    public setCanvasBGColor(color: string): void {
        this.ctx.fillStyle = color;
    }

    public surroundElement(html: HTMLElement | string): void {

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
    }

    private initializeCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    private styleCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.position = 'absolute';
    }

    private appendCanvasToBody(): void {
        document.querySelector('body').appendChild(this.canvas);
    }

    private fetchHTMLElementBySelector(): HTMLElement {
        return null;
    }

    private getCoordinates(): void {
        this.currentElementCoordinates.y = this.currentElement.offsetTop;
        this.currentElementCoordinates.x = this.currentElement.offsetLeft;
        this.currentElementCoordinates.w = this.currentElement.offsetWidth;
        this.currentElementCoordinates.h = this.currentElement.offsetHeight;
    }

    private bringElementToFront(): void {
        this.currentElementOriginalZIndex = this.currentElement.style.zIndex;
        this.currentElementOriginalCSSPosition = this.currentElement.style.position;

        this.currentElement.style.position = 'relative';
        this.currentElement.style.zIndex = this.currentElementZIndex.toString();
    }

    private disposeCurrentElement(): void {
        this.currentElement.style.zIndex = this.currentElementOriginalZIndex;
        this.currentElement.style.position = this.currentElementOriginalCSSPosition;
    }

    private drawLeftSideRect(): void {
        this.ctx.fillRect(
            0,
            this.currentElementCoordinates.y,
            this.currentElementCoordinates.x,
            this.currentElementCoordinates.h
        );
    }

    private drawRightSideRect(): void {
        const width = this.canvas.width - (this.currentElementCoordinates.x + this.currentElementCoordinates.w);

        this.ctx.fillRect(
            this.currentElementCoordinates.x + this.currentElementCoordinates.w,
            this.currentElementCoordinates.y,
            width,
            this.currentElementCoordinates.h
        );
    }

    private drawTopSideRect(): void {
        this.ctx.fillRect(
            0,
            0,
            this.canvas.width,
            this.currentElementCoordinates.y
        );
    }

    private drawBottomSideRect(): void {
        this.ctx.fillRect(
            0,
            this.currentElementCoordinates.y + this.currentElementCoordinates.h,
            this.canvas.width,
            this.canvas.height - (this.currentElementCoordinates.y + this.currentElementCoordinates.h)
        );
    }
}

export interface ElementCoordinates {
    x: number;
    y: number;
    h: number;
    w: number;
}