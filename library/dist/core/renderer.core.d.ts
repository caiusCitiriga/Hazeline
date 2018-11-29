import { Observable } from 'rxjs';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
import { HazelineCSSRules } from './interfaces/css-rules.interface';
export declare class HazelineOverlayRenderer {
    private topBox;
    private leftBox;
    private rightBox;
    private bottomBox;
    private endTutorialBtn;
    private overlayOptions;
    private _$prematureEndRequired;
    $premartureEndRequired(): Observable<boolean>;
    applyStyles(overlayOpts: HazelineCSSRules): void;
    dispose(): void;
    updateElementsDimensions(dimensions: HazelineWrappingElementsDimensions): void;
    wrapElement(dimensions: HazelineWrappingElementsDimensions): void;
    private attachElementsToBody;
    private createWrappingElements;
    private destroyPreviousElementsIfAny;
    private setElementsProperties;
}
//# sourceMappingURL=renderer.core.d.ts.map