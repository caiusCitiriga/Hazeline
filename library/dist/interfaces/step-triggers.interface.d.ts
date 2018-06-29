export interface StepTriggers {
    next: {
        event: string;
        action: (event: any) => boolean;
    };
}
