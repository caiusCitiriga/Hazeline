import { ElementCoordinates } from '../interfaces/element-coordinates.interface';
import { ElementUtils } from '../utilities/element.utils';

export class HazelineCanvas {

    //  Objects properties
    private canvas: HTMLCanvasElement;
    private currentElement: HTMLElement;
    private ctx: CanvasRenderingContext2D;

    //  Behaviour control properties
    private useScalingAnimation = false;

    //  Canvas style properties
    private canvasZIndex = 2000;
    private overlayBackground: string;
    private currentElementZIndex = 2001;
    private canvasID = 'hazeline-canvas';
    private defaultFillStyle = 'rgba(0,0,0,.8)';
    private currentElementCoordinates: ElementCoordinates = {
        x: null,
        y: null,
        w: null,
        h: null,
    };

    //  Current element style backup properties
    private currentElementOriginalZIndex = undefined;
    private currentElementOriginalDisplay = undefined;
    private currentElementOriginalTransform = undefined;
    private currentElementOriginalTransition = undefined;
    private currentElementOriginalCSSPosition = undefined;


    public set enableScalingAnimation(value: boolean) {
        this.useScalingAnimation = value;
    }

    public get enableScalingAnimation(): boolean {
        return this.useScalingAnimation;
    }

    public init(): void {
        this.initializeCanvas();
        this.styleCanvas();
        this.appendCanvasToBody();
    }

    public setCanvasBGColor(color: string): void {
        this.overlayBackground = color;
    }

    public wrapElement(element: HTMLElement | string): void {

        if (!!this.currentElement) {
            this.restoreCurrentElementStyleProperties();
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentElement = element instanceof HTMLElement
            ? element
            : ElementUtils.getHTMLElementBySelector(element);

        if (!this.currentElement) {
            throw new Error(`HAZELINE-CANVAS: Cannot find the wanted element: [${element}]`);
        }

        this.currentElementCoordinates = ElementUtils.getCoordinates(this.currentElement);

        this.bringElementToFront();
        this.drawRectsAround();
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
        this.ctx.fillStyle = this.defaultFillStyle;
        this.canvas.setAttribute('id', this.canvasID);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.canvas.style.position = 'fixed';
        this.canvas.style.top = `0`;
        this.canvas.style.left = `0`;
        this.canvas.style.zIndex = this.canvasZIndex.toString();
    }

    private appendCanvasToBody(): void {
        document.querySelector('body').appendChild(this.canvas);
    }

    private bringElementToFront(): void {
        this.backupElementStyleProperties();
        this.assignBasicStyleProperties();

        if (this.useScalingAnimation) {
            this.assignScalingStyleProperties();
        }
    }

    private assignScalingStyleProperties(): void {
        this.currentElement.style.transform = 'scale(1.8)';
        this.currentElement.style.display = 'inline-block';
        this.currentElement.style.transition = 'all 120ms ease-in-out';
        setTimeout(() => {
            this.currentElement.style.transform = 'scale(1)';
        }, 120);
    }

    private assignBasicStyleProperties(): void {
        this.currentElement.style.borderRadius = '0';
        this.currentElement.style.position = 'relative';
        this.currentElement.style.zIndex = this.currentElementZIndex.toString();
    }

    private backupElementStyleProperties(): void {
        this.currentElementOriginalZIndex = this.currentElement.style.zIndex;
        this.currentElementOriginalDisplay = this.currentElement.style.display;
        this.currentElementOriginalTransform = this.currentElement.style.transform;
        this.currentElementOriginalCSSPosition = this.currentElement.style.position;
        this.currentElementOriginalTransition = this.currentElement.style.transition;
    }

    private restoreCurrentElementStyleProperties(): void {
        this.currentElement.style.zIndex = this.currentElementOriginalZIndex;
        this.currentElement.style.display = this.currentElementOriginalDisplay;
        this.currentElement.style.transform = this.currentElementOriginalTransform;
        this.currentElement.style.position = this.currentElementOriginalCSSPosition;
        this.currentElement.style.transition = this.currentElementOriginalTransition;
    }

    private drawRectsAround(): void {
        this.ctx.fillStyle = this.overlayBackground ? this.overlayBackground : 'rgba(0,0,0,.8)';

        this.drawTopSideRect();
        this.drawLeftSideRect();
        this.drawRightSideRect();
        this.drawBottomSideRect();
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
            (this.currentElementCoordinates.x + this.currentElementCoordinates.w),
            (this.currentElementCoordinates.y),
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
            (this.currentElementCoordinates.y + this.currentElementCoordinates.h),
            this.canvas.width,
            this.canvas.height - (this.currentElementCoordinates.y + this.currentElementCoordinates.h)
        );
    }

}