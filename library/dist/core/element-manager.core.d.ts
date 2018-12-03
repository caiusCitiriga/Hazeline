import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
import { HazelineOverlayOptions } from './interfaces/hazeline-options.interface';
export declare class HazelineElementManager {
    getWrappingElementsDimensions(elementSelector: string, overlayOpts?: HazelineOverlayOptions): HazelineWrappingElementsDimensions;
    static getElementBySelector<T>(selector: string): T;
    private computeWrappingElements;
}
export declare const NullDimensions: HazelineWrappingElementsDimensions;
//# sourceMappingURL=element-manager.core.d.ts.map