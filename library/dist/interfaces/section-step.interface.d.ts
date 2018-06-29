import { StepTriggers } from "./step-triggers.interface";
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
    triggers?: StepTriggers;
    styles?: StepStylableElements;
    classes?: StepClassableElements;
}
//# sourceMappingURL=section-step.interface.d.ts.map