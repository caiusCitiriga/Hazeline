import { InfoBoxPlacement } from "../enums/info-box-placement.enum";

import { StepStylableElements } from "./stylable-elements";

export interface SectionStep {
    //  Properties
    id: string;
    htmlContent: string;
    selector: string;

    //  Placement options
    infoBoxPlacement?: InfoBoxPlacement | string;

    //  Step events
    onNext?: (element: HTMLElement, step: SectionStep) => SectionStep;
    onStart?: (element: HTMLElement, step: SectionStep) => SectionStep;

    //  Buttons text customization
    endBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;

    triggers?: {
        next: {
            event: string;
            action: (event: any) => boolean;
        }
    }

    //  Styles override for current step
    styles?: StepStylableElements;
}
