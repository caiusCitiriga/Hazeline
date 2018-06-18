import { InfoBoxPlacement } from "../enums/info-box-placement.enum";
import { StepStylableElements } from "./stylable-elements";
export interface SectionStep {
    id: string;
    selector: string;
    text: string;
    infoBoxPlacement?: InfoBoxPlacement | string;
    onNext?: (element: HTMLElement, step: SectionStep) => SectionStep;
    onStart?: (element: HTMLElement, step: SectionStep) => SectionStep;
    endBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;
    styles?: StepStylableElements;
}
//# sourceMappingURL=section-step.interface.d.ts.map