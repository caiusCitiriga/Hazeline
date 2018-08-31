export declare class HazelineCanvas {
    private canvas;
    private currentElement;
    private ctx;
    private useScalingAnimation;
    private canvasZIndex;
    private overlayBackground;
    private currentElementZIndex;
    private canvasID;
    private defaultFillStyle;
    private currentElementCoordinates;
    private rectsToBeDrawn;
    private currentElementOriginalZIndex;
    private currentElementOriginalDisplay;
    private currentElementOriginalTransform;
    private currentElementOriginalTransition;
    private currentElementOriginalCSSPosition;
    enableScalingAnimation: boolean;
    init(): void;
    setCanvasBGColor(color: string): void;
    wrapElement(element: HTMLElement | string, skipScalingAnimation?: boolean): void;
    destroy(): void;
    private initializeCanvas;
    private styleCanvas;
    private appendCanvasToBody;
    private bringElementToFront;
    private assignScalingStyleProperties;
    private assignBasicStyleProperties;
    private backupElementStyleProperties;
    private restoreCurrentElementStyleProperties;
    private calculateRectsCoordinates;
    private drawRectsAround;
    private drawLeftSideRect;
    private drawRightSideRect;
    private drawTopSideRect;
    private drawBottomSideRect;
}
export interface DrawableRects {
    top: DrawableRect;
    left: DrawableRect;
    right: DrawableRect;
    bottom: DrawableRect;
}
export interface DrawableRect {
    x: number;
    y: number;
    targetWidth: number;
    currentWidth: number;
    targetHeight: number;
    currentHeight: number;
}
