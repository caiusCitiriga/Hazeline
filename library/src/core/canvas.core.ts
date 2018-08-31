import { ElementCoordinates } from '../interfaces/element-coordinates.interface';

export class HazelineCanvas {
    private canvasZIndex = 2000;
    private currentElementZIndex = 2001;
    private currentElement: HTMLElement;
    private canvasID = 'hazeline-canvas';
    private defaultFillStyle = 'rgba(0,0,0,.8)';
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

    public init(): void {
        this.initializeCanvas();
        this.styleCanvas();
        this.appendCanvasToBody();
    }

    public setCanvasBGColor(color: string): void {
        this.ctx.fillStyle = color;
    }

    public wrapElement(element: HTMLElement | string): void {

        if (!!this.currentElement) {
            this.disposeCurrentElement();
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentElement = element instanceof HTMLElement ? element : this.fetchHTMLElementBySelector(element);

        if (!this.currentElement) {
            return;
        }

        this.getCoordinates();
        this.bringElementToFront();
        this.drawLeftSideRect();
        this.drawRightSideRect();
        this.drawTopSideRect();
        this.drawBottomSideRect();
    }

    public destroy(): void {
        this.ctx = null;
        this.canvas = null;
        document.querySelector('body').removeChild(document.getElementById(this.canvasID));
    }

    private initializeCanvas(): void {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    private styleCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.setAttribute('id', this.canvasID);

        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.position = 'absolute';
        this.canvas.style.zIndex = this.canvasZIndex.toString();
        this.ctx.fillStyle = this.defaultFillStyle;
    }

    private appendCanvasToBody(): void {
        document.querySelector('body').appendChild(this.canvas);
    }

    private fetchHTMLElementBySelector(selector: string): HTMLElement {
        const element = document.querySelector(selector) as HTMLElement;
        if (!element) {
            throw new Error(`HAZELINE-CANVAS: Cannot find the [${selector}] element`);
        }

        return element;
    }

    private getCoordinates(): void {
        this.currentElementCoordinates.y = this.currentElement.getBoundingClientRect().top;
        this.currentElementCoordinates.x = this.currentElement.getBoundingClientRect().left;
        this.currentElementCoordinates.w = this.currentElement.getBoundingClientRect().width;
        this.currentElementCoordinates.h = this.currentElement.getBoundingClientRect().height;
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