import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
import { HazelineOverlayCommonOptions } from './interfaces/tutorial-section.interface';
export declare class HazelineOverlayRenderer {
    private topBox;
    private leftBox;
    private rightBox;
    private bottomBox;
    private overlayOptions;
    applyStyles(overlayOpts: HazelineOverlayCommonOptions): void;
    destroyPreviousElementsIfAny(): void;
    updateElementsDimensions(dimensions: HazelineWrappingElementsDimensions): void;
    wrapElement(dimensions: HazelineWrappingElementsDimensions): void;
    private attachElementsToBody;
    private createWrappingElements;
    private setElementsProperties;
}
//# sourceMappingURL=renderer.core.d.ts.map