import { InfoBoxPlacement } from "../enums/info-box-placement.enum";

export interface SectionStep {
    //  Properties
    id: string;
    selector: string;
    text: string;

    //  Info box placement options
    infoBoxPlacement?: InfoBoxPlacement | string;

    //  Events
    onNext?: (element: HTMLElement, id: string, selector: string) => void;
    onStart?: (element: HTMLElement, id: string, selector: string) => void;
}
