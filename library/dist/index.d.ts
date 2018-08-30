export declare class HazelineCanvas {
    private canvasZIndex;
    private currentElementZIndex;
    private currentElement;
    private currentElementOriginalZIndex;
    private currentElementOriginalCSSPosition;
    private currentElementCoordinates;
    private canvas;
    private ctx;
    constructor();
    setCanvasBGColor(color: string): void;
    surroundElement(html: HTMLElement | string): void;
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
export interface ElementCoordinates {
    x: number;
    y: number;
    h: number;
    w: number;
}
//# sourceMappingURL=index.d.ts.map