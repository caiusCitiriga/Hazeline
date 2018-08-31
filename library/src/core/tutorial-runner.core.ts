import { BehaviorSubject } from 'rxjs';
import { HazelineCanvas } from './canvas.core';
import { HazelineLightbox } from './lightbox.core';

export class HazelineTutorialRunner {

    private canvas: HazelineCanvas;
    private lightbox: HazelineLightbox;

    private currentStepIndex: number;
    private tutorialSections: TutorialSection[] = [];
    private currentStep: BehaviorSubject<TutorialStep> = new BehaviorSubject(null);
    private currentSection: BehaviorSubject<TutorialSection> = new BehaviorSubject(null);
    private tutorialStatus: BehaviorSubject<TutorialStatus> = new BehaviorSubject(TutorialStatus.STOPPED);

    public constructor() {
        this.canvas = new HazelineCanvas();
        this.lightbox = new HazelineLightbox();
    }

    public addSection(section: TutorialSection): void {
        this.tutorialSections.push(section);
    }

    public addSections(sections: TutorialSection[]): void {
        sections.forEach(s => this.tutorialSections.push(s));
    }

    public setOverlayBackground(color: string): void {
        this.canvas.setCanvasBGColor(color);
    }

    public runSection(sectionId: string): void {
        this.currentSection.next(this.tutorialSections.find(s => s.id === sectionId));

        if (!this.currentSection.getValue()) {
            throw new Error(`HAZELINE-RUNNER: Cannot find the given section id: [${sectionId}]`);
        }

        if (this.currentSection.getValue().onStart) {
            this.currentSection.getValue().onStart();
        }

        this.canvas.init();
        this.currentStepIndex = -1;

        window.addEventListener('resize', () => this.pauseAndResume(sectionId));
        window.addEventListener('scroll', () => this.pauseAndResume(sectionId));

        this.loadStep();
    }

    private pauseAndResume(sectionId: string): void {
        this.canvas.destroy();
        this.lightbox.destroy();
        this.canvas.init();

        this.lightbox.init({
            text: this.currentStep.getValue().text,
            elementSelector: this.currentStep.getValue().elementSelector,
            disablePrev: this.currentStepIndex === 0 ? true : false,
            disableNext: this.currentStepIndex === this.currentSection.getValue().steps.length - 1 ? true : false,
        });
        this.lightbox = new HazelineLightbox();

        this.currentStepIndex--;
        this.loadStep();
    }

    private loadStep(backwards?: boolean): void {
        if (backwards) {
            this.currentStepIndex--;
            this.currentStepIndex = this.currentStepIndex === -1 ? 0 : this.currentStepIndex;
        } else {
            this.currentStepIndex++;
            this.currentStepIndex = this.currentStepIndex === this.currentSection.getValue().steps.length ? this.currentStepIndex - 1 : this.currentStepIndex;
        }

        if (!this.currentSection.getValue().steps[this.currentStepIndex]) {
            return;
        }

        this.currentStep.next(this.currentSection.getValue().steps[this.currentStepIndex]);

        this.lightbox.onNextBtnClick = () => {
            this.loadStep();
            this.lightbox.init({
                text: this.currentStep.getValue().text,
                elementSelector: this.currentStep.getValue().elementSelector,
                disablePrev: this.currentStepIndex === 0 ? true : false,
                disableNext: this.currentStepIndex === this.currentSection.getValue().steps.length - 1 ? true : false,
            });
        };

        this.lightbox.onPrevBtnClick = () => {
            this.loadStep(true);
            this.lightbox.init({
                text: this.currentStep.getValue().text,
                elementSelector: this.currentStep.getValue().elementSelector,
                disablePrev: this.currentStepIndex === 0 ? true : false,
                disableNext: this.currentStepIndex === this.currentSection.getValue().steps.length - 1 ? true : false,
            });
        };

        this.canvas.wrapElement(this.currentStep.getValue().elementSelector);

        this.lightbox.init({
            text: this.currentStep.getValue().text,
            elementSelector: this.currentStep.getValue().elementSelector,
            disablePrev: this.currentStepIndex === 0 ? true : false,
            disableNext: this.currentStepIndex === this.currentSection.getValue().steps.length - 1 ? true : false,
        });

        this.lightbox.showLightbox();
    }
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

export enum TutorialStatus {
    RUNNING,
    STOPPED
}