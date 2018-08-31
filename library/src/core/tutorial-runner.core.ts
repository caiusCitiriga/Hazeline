import { BehaviorSubject } from 'rxjs';
import { HazelineCanvas } from './canvas.core';
import { HazelineLightbox } from './lightbox.core';

export class HazelineTutorialRunner {

    private canvas: HazelineCanvas;
    private lightbox: HazelineLightbox;

    private currentStepIndex: number;
    private tutorialSections: TutorialSection[] = [];
    private tutorialStatus: BehaviorSubject<TutorialStatus> = new BehaviorSubject(TutorialStatus.STOPPED);

    public constructor() {
        this.canvas = new HazelineCanvas();
    }

    public addSection(section: TutorialSection): void {
        this.tutorialSections.push(section);
    }

    public addSections(sections: TutorialSection[]): void {
        sections.forEach(s => this.tutorialSections.push(s));
    }

    public runSection(sectionId: string): void {
        const section = this.tutorialSections.find(s => s.id === sectionId);
        if (!section) {
            throw new Error(`HAZELINE-RUNNER: Cannot find the given section id: [${sectionId}]`);
        }

        if (section.onStart) {
            section.onStart();
        }

        this.canvas.init();
        this.lightbox = new HazelineLightbox();

        this.currentStepIndex = -1;
        this.loadStep(this.tutorialSections.find(s => s.id === sectionId));
    }

    private loadStep(section: TutorialSection, backwards?: boolean): void {
        if (backwards) {
            this.currentStepIndex--;
            this.currentStepIndex = this.currentStepIndex === -1 ? 0 : this.currentStepIndex;
        } else {
            this.currentStepIndex++;
            this.currentStepIndex = this.currentStepIndex === section.steps.length ? this.currentStepIndex - 1 : this.currentStepIndex;
        }

        if (!section.steps[this.currentStepIndex]) {
            return;
        }

        const step = section.steps[this.currentStepIndex];

        this.lightbox.onNextBtnClick = () => {
            this.loadStep(section);
        };

        this.lightbox.onPrevBtnClick = () => {
            this.loadStep(section, true);
        };

        this.canvas.wrapElement(step.elementSelector);
        this.lightbox.showLightbox({
            text: step.text,
            disablePrev: this.currentStepIndex === 0 ? true : false,
            disableNext: this.currentStepIndex === section.steps.length - 1 ? true : false,
        });
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