//  Interfaces imports
import { StepStylableElements } from "./stylable-elements";
import { StepClassableElements } from "./classable-elements";

//  Enums imports
import { InfoBoxPlacement } from "../enums/info-box-placement.enum";

export interface SectionStep {
    //  General Properties
    text: string;
    selector: string;
    beforeStartDelay?: number;

    //  Placement options
    infoBoxPlacement?: InfoBoxPlacement | string;

    //  Step events
    onNext?: (element: HTMLElement, step: SectionStep) => SectionStep;
    onStart?: (element: HTMLElement, step: SectionStep) => SectionStep;

    //  Text customization
    endBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;
    pleaseWaitText?: string;

    triggers?: {
        next: {
            event: string;
            action: (event: any) => boolean;
        }
    }

    //  Styles override for current step
    styles?: StepStylableElements;
    //  Classes override for current step (wins over styles property if set)
    classes?: StepClassableElements;
}
