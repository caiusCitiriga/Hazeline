export declare class HazelineTutorialRunner {
    private canvas;
    private lightbox;
    private currentStepIndex;
    private tutorialSections;
    private currentStep;
    private currentSection;
    private tutorialStatus;
    constructor();
    addSection(section: TutorialSection): void;
    addSections(sections: TutorialSection[]): void;
    setOverlayBackground(color: string): void;
    runSection(sectionId: string): void;
    private pauseAndResume;
    private loadStep;
}
export interface TutorialSection {
    id: string;
    steps: TutorialStep[];
    onStart?: () => void;
    onEnd?: () => void;
}
export interface TutorialStep {
    id?: string;
    text: string;
    elementSelector: string;
    onEnd?: (step: TutorialStep) => void;
    onStart?: (step: TutorialStep) => void;
}
export declare enum TutorialStatus {
    RUNNING = 0,
    STOPPED = 1
}
