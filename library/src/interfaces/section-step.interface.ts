export interface SectionStep {
    //  Properties
    id: string;
    selector: string;
    unskippable?: boolean;

    //  Events
    onSkip?: (element: HTMLElement, id: string, selector: string) => void;
    onNext?: (element: HTMLElement, id: string, selector: string) => void;
    onStart?: (element: HTMLElement, id: string, selector: string) => void;
}
