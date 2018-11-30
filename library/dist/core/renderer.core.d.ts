import { Observable } from 'rxjs';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
import { HazelineOverlyOptions } from './interfaces/tutorial-section.interface';
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
    setOptions(overlayOpts: HazelineOverlyOptions): void;
    updateElementsDimensions(dimensions: HazelineWrappingElementsDimensions): void;
    wrapElement(dimensions: HazelineWrappingElementsDimensions): void;
    private attachElementsToBody;
    private attachEventListeners;
    private detachEventListeners;
    private createWrappingElements;
    private destroyPreviousElementsIfAny;
    private applyOptionsOnElements;
}
//# sourceMappingURL=renderer.core.d.ts.map