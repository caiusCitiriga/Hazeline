export interface SectionStep {
    //  Properties
    id: string;
    selector: string;

    //  Info box placement options
    infoBoxPlacement?: InfoBoxPlacement | string;

    //  Events
    onNext?: (element: HTMLElement, id: string, selector: string) => void;
    onStart?: (element: HTMLElement, id: string, selector: string) => void;
}

export enum InfoBoxPlacement {
    LEFT = 'left',
    ABOVE = 'above',
    BELOW = 'below',
    RIGHT = 'right',
}
