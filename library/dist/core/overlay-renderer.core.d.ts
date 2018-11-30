import { Observable } from 'rxjs';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
import { HazelineOverlayOptions } from './interfaces/hazeline-options.interface';
export declare class HazelineOverlayRenderer {
    private topBox;
    private leftBox;
    private rightBox;
    private bottomBox;
    private endTutorialBtn;
    private _$prematureEndRequired;
    private overlayOptions;
    private endTutorialBtnClickEvtListener;
    private endTutorialBtnMouseLeaveEvtListener;
    private endTutorialBtnMouseEnterEvtListener;
    $premartureEndRequired(): Observable<boolean>;
    dispose(): void;
    setDynamicOptions(overlayOpts: HazelineOverlayOptions): void;
    setGlobalOptions(overlayOpts: HazelineOverlayOptions): void;
    updateElementsDimensions(dimensions: HazelineWrappingElementsDimensions): void;
    wrapElement(dimensions: HazelineWrappingElementsDimensions): void;
    private attachElementsToBody;
    private attachEventListeners;
    private detachEventListeners;
    private createWrappingElements;
    private destroyPreviousElementsIfAny;
    private applyOptionsOnElements;
}
//# sourceMappingURL=overlay-renderer.core.d.ts.map