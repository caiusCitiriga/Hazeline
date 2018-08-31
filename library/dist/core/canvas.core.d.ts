export declare class HazelineCanvas {
    private canvasZIndex;
    private currentElementZIndex;
    private currentElement;
    private canvasID;
    private defaultFillStyle;
    private currentElementOriginalZIndex;
    private currentElementOriginalCSSPosition;
    private currentElementCoordinates;
    private canvas;
    private ctx;
    init(): void;
    setCanvasBGColor(color: string): void;
    wrapElement(element: HTMLElement | string): void;
    destroy(): void;
    private initializeCanvas;
    private styleCanvas;
    private appendCanvasToBody;
    private fetchHTMLElementBySelector;
    private getCoordinates;
    private bringElementToFront;
    private disposeCurrentElement;
    private drawLeftSideRect;
    private drawRightSideRect;
    private drawTopSideRect;
    private drawBottomSideRect;
}
//# sourceMappingURL=canvas.core.d.ts.map