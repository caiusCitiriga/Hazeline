import { InfoBoxPlacement } from "../enums/info-box-placement.enum";
import { StepStylableElements } from "./stylable-elements";
export interface SectionStep {
    id: string;
    text: string;
    selector: string;
    infoBoxPlacement?: InfoBoxPlacement | string;
    onNext?: (element: HTMLElement, step: SectionStep) => SectionStep;
    onStart?: (element: HTMLElement, step: SectionStep) => SectionStep;
    endBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;
    triggers?: {
        next: {
            event: string;
            action: (event: any) => boolean;
        };
    };
    styles?: StepStylableElements;
}
//# sourceMappingURL=section-step.interface.d.ts.map