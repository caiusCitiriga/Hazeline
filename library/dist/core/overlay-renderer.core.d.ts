import { Observable } from 'rxjs';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
import { HazelineOverlayOptions } from './interfaces/hazeline-options.interface';
export declare class HazelineOverlayRenderer {
    private topBox;
    private leftBox;
    private rightBox;
    private bottomBox;
    private endTutorialBtn;
    private delayInProgressOverlay;
    private backupProperties;
    private _$prematureEndRequired;
    private overlayOptions;
    private endTutorialBtnClickEvtListener;
    private endTutorialBtnMouseLeaveEvtListener;
    private endTutorialBtnMouseEnterEvtListener;
    $premartureEndRequired(): Observable<boolean>;
    dispose(): void;
    placeWaitForDelayOverlay(message: string, textColor: string): Observable<boolean>;
    removeWaitForDelayOverlay(): void;
    placeEndTutorialButton(): void;
    removeEndTutorialButton(): void;
    setDynamicOptions(overlayOpts: HazelineOverlayOptions): void;
    setGlobalOptions(overlayOpts: HazelineOverlayOptions): void;
    updateElementsDimensions(dimensions: HazelineWrappingElementsDimensions): void;
    wrapElement(dimensions: HazelineWrappingElementsDimensions): void;
    private applyEndTutorialBtnOptions;
    private applyOptionsOnElements;
    private attachElementsToBody;
    private attachEndTutorialButtonToBody;
    private attachEndTutorialBtnEventsListeners;
    private backupPropertiesOfOverlayBoxes;
    private createEndTutorialButton;
    private createWrappingElements;
    private destroyPreviousElementsIfAny;
    private detachEndTutorialBtnEventListeners;
    private fadeOutOverlayBoxes;
}
//# sourceMappingURL=overlay-renderer.core.d.ts.map