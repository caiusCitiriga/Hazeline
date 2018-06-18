import { InfoBoxPlacement } from "../enums/info-box-placement.enum";

import { StepStylableElements } from "./stylable-elements";

export interface SectionStep {
    //  Properties
    id: string;
    selector: string;
    text: string;

    //  Info box placement options
    infoBoxPlacement?: InfoBoxPlacement | string;

    //  Events
    onNext?: (element: HTMLElement, step: SectionStep) => SectionStep;
    onStart?: (element: HTMLElement, step: SectionStep) => SectionStep;

    //  Buttons customization
    endBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;

    styles?: StepStylableElements;
}
