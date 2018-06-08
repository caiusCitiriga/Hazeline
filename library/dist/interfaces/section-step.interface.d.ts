export interface SectionStep {
    id: string;
    selector: string;
    unskippable?: boolean;
    onSkip?: (element: HTMLElement, id: string, selector: string) => void;
    onNext?: (element: HTMLElement, id: string, selector: string) => void;
    onStart?: (element: HTMLElement, id: string, selector: string) => void;
}
//# sourceMappingURL=section-step.interface.d.ts.map