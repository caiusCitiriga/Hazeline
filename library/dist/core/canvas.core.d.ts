export declare class HazelineCanvas {
    private canvasZIndex;
    private useScalingAnimation;
    private currentElementZIndex;
    private currentElement;
    private canvasID;
    private defaultFillStyle;
    private currentElementOriginalZIndex;
    private currentElementOriginalCSSPosition;
    private currentElementCoordinates;
    private overlayBackground;
    private canvas;
    private ctx;
    enableScalingAnimation: boolean;
    init(): void;
    setCanvasBGColor(color: string): void;
    wrapElement(element: HTMLElement | string): void;
    destroy(): void;
    private initializeCanvas;
    private styleCanvas;
    private appendCanvasToBody;
    private bringElementToFront;
    private disposeCurrentElement;
    private drawRectsAround;
    private drawLeftSideRect;
    private drawRightSideRect;
    private drawTopSideRect;
    private drawBottomSideRect;
}
