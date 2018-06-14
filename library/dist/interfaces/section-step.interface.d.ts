export interface SectionStep {
    id: string;
    selector: string;
    onNext?: (element: HTMLElement, id: string, selector: string) => void;
    onStart?: (element: HTMLElement, id: string, selector: string) => void;
}
//# sourceMappingURL=section-step.interface.d.ts.map