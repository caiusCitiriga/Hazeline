import { SectionStep } from "../interfaces/section-step.interface";
import { Observable } from 'rxjs';
export declare class Drawer {
    private static viewportSizes;
    private static clothZIndex;
    private static clothId;
    static drawBlocksAroundTutorialStepElement(step: SectionStep): any;
    private static getViewportSizes;
    private static cloneStepHTMLElement;
    static drawCloth(): Observable<boolean>;
}
//# sourceMappingURL=drawer.core.d.ts.map