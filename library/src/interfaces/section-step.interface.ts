export interface SectionStep {
    //  Properties
    id: string;
    selector: string;

    //  Events
    onNext?: (element: HTMLElement, id: string, selector: string) => void;
    onStart?: (element: HTMLElement, id: string, selector: string) => void;
}
