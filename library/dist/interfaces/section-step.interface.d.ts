export interface SectionStep {
    id: string;
    selector: string;
    infoBoxPlacement?: InfoBoxPlacement;
    onNext?: (element: HTMLElement, id: string, selector: string) => void;
    onStart?: (element: HTMLElement, id: string, selector: string) => void;
}
export declare enum InfoBoxPlacement {
    LEFT = "left",
    ABOVE = "above",
    BELOW = "below",
    RIGHT = "right"
}
//# sourceMappingURL=section-step.interface.d.ts.map