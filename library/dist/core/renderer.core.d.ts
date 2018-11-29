import { Observable } from 'rxjs';
import { HazelineOverlayCommonOptions } from './interfaces/tutorial-section.interface';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
export declare class HazelineOverlayRenderer {
    private topBox;
    private leftBox;
    private rightBox;
    private bottomBox;
    private endTutorialBtn;
    private overlayOptions;
    private _$prematureEndRequired;
    $premartureEndRequired(): Observable<boolean>;
    applyStyles(overlayOpts: HazelineOverlayCommonOptions): void;
    dispose(): void;
    updateElementsDimensions(dimensions: HazelineWrappingElementsDimensions): void;
    wrapElement(dimensions: HazelineWrappingElementsDimensions): void;
    private attachElementsToBody;
    private createWrappingElements;
    private destroyPreviousElementsIfAny;
    private setElementsProperties;
}
//# sourceMappingURL=renderer.core.d.ts.map