export declare class HazelineCanvas {
    private canvasZIndex;
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
