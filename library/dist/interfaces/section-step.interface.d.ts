import { StepStylableElements } from "./stylable-elements";
import { StepClassableElements } from "./classable-elements";
import { InfoBoxPlacement } from "../enums/info-box-placement.enum";
export interface SectionStep {
    text: string;
    selector: string;
    beforeStartDelay?: number;
    infoBoxPlacement?: InfoBoxPlacement | string;
    onNext?: (element: HTMLElement, step: SectionStep) => SectionStep;
    onStart?: (element: HTMLElement, step: SectionStep) => SectionStep;
    endBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;
    pleaseWaitText?: string;
    triggers?: {
        next: {
            event: string;
            action: (event: any) => boolean;
        };
    };
    styles?: StepStylableElements;
    classes?: StepClassableElements;
}
//# sourceMappingURL=section-step.interface.d.ts.map