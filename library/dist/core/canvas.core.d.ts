export declare class HazelineCanvas {
    private canvas;
    private currentElement;
    private ctx;
    private useScalingAnimation;
    private canvasZIndex;
    private overlayBackground;
    private currentElementZIndex;
    private pleaseWaitIsVisible;
    private canvasID;
    private defaultFillStyle;
    private pleaseWaitLayerID;
    private currentElementCoordinates;
    private rectsToBeDrawn;
    private currentElementOriginalZIndex;
    private currentElementOriginalTransform;
    private currentElementOriginalTransition;
    private currentElementOriginalCSSPosition;
    enableScalingAnimation: boolean;
    init(): void;
    fill(color?: string): void;
    setCanvasBGColor(color: string): void;
    wrapElement(element: HTMLElement | string, skipScalingAnimation?: boolean): void;
    destroy(): void;
    writeMessage(message: string, opts?: {
        color: string;
        size: number;
        fontFamily: string;
    }): void;
    private initializeCanvas;
    private styleCanvas;
    private appendCanvasToBody;
    private bringElementToFront;
    private assignScalingStyleProperties;
    private assignBasicStyleProperties;
    private backupElementStyleProperties;
    private restoreCurrentElementStyleProperties;
    private computeRectsCoordinates;
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
    targetHeight: number;
}
//# sourceMappingURL=canvas.core.d.ts.map