import { BehaviorSubject } from 'rxjs';
import { HazelineCanvas } from './canvas.core';
import { HazelineLightbox, LightboxPlacement, LightboxOptions } from './lightbox.core';

export class HazelineTutorialRunner {

    private canvas: HazelineCanvas;
    private lightbox: HazelineLightbox;

    private currentStepIndex: number;
    private lightboxOptions: LightboxOptions;
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

    public disableScalingAnimation(): void {
        this.canvas.enableScalingAnimation = false;
    }

    public enableScalingAnimation(): void {
        this.canvas.enableScalingAnimation = true;
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

        window.addEventListener('resize', () => this.pauseAndResume());
        window.addEventListener('scroll', () => this.pauseAndResume());

        this.loadStep();
    }

    private pauseAndResume(): void {
        this.canvas.destroy();
        this.canvas.init();

        //  no need to destroy lightbox, init updates props if lightbox exists
        this.lightbox.init(this.lightboxOptions);

        this.currentStepIndex--;
        this.loadStep(false, true);
    }

    private loadStep(backwards?: boolean, skipScalingAnimation?: boolean): void {
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
            this.lightbox.init(this.lightboxOptions);

            if (this.currentStep.getValue().onEnd) {
                this.currentStep.getValue().onEnd(this.currentStep.getValue());
            }
        };

        this.lightbox.onPrevBtnClick = () => {
            this.loadStep(true);
            this.lightbox.init(this.lightboxOptions);

            if (this.currentStep.getValue().onEnd) {
                this.currentStep.getValue().onEnd(this.currentStep.getValue());
            }
        };

        if (this.currentStep.getValue().onStart) {
            this.currentStep.getValue().onStart(this.currentStep.getValue());
        }

        if (this.currentStep.getValue().delayBeforeStart) {
            this.lightbox.fadeOut();
            this.canvas.writeMessage('Please wait...');

            setTimeout(() => {
                this.lightbox.fadeIn();
                this.renderStep(skipScalingAnimation);
            }, this.currentStep.getValue().delayBeforeStart);
            return;
        }

        this.renderStep(skipScalingAnimation);
    }

    private renderStep(skipScalingAnimation?: boolean): void {
        this.lightboxOptions = {
            text: this.currentStep.getValue().text,
            placement: this.currentStep.getValue().lightboxPlacement,
            elementSelector: this.currentStep.getValue().elementSelector,
            disablePrev: this.currentStepIndex <= 0 ? true : false,
            disableNext: this.currentStepIndex >= this.currentSection.getValue().steps.length - 1 ? true : false,
        };

        this.canvas.wrapElement(this.currentStep.getValue().elementSelector, skipScalingAnimation);
        this.lightbox.init(this.lightboxOptions);

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
    delayBeforeStart?: number;
    lightboxPlacement?: LightboxPlacement | string;

    onEnd?: (step: TutorialStep) => void;
    onStart?: (step: TutorialStep) => void;
}

export enum TutorialStatus {
    RUNNING,
    STOPPED
}