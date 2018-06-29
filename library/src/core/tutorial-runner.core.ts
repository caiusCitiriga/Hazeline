//  Third party imports
import $ from 'jquery';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';

//  Core imports
import { Drawer } from './drawer.core';

//  Interfaces imports
import { TutorialStatus } from '../interfaces/tutorial-status.interface';
import { TutorialSection } from "../interfaces/tutorial-section.interface";

//  Enums imports
import { TutorialStatuses } from '../enums/tutorial-statuses.enum';
import { NextStepPossibilities } from '../enums/next-step-possibilities.enum';

export class TutorialRunner {

    private _$tutorialStatus: BehaviorSubject<TutorialStatus> = new BehaviorSubject(null);
    private currentTutorialStep = 0;

    public get $tutorialStatus(): Observable<TutorialStatus> {
        return this._$tutorialStatus;
    }

    public run(section: TutorialSection): void {
        if (!section) {
            throw new Error('HAZELINE: Cannot run a null section');
        }

        this.ensureAllStepsElementsExistsOrThrow(section);

        this.runInternal(section);
    }

    public ensureAllStepsElementsExistsOrThrow(section: TutorialSection): void {
        section.steps.forEach(sectionStep => {
            if (!this.getElement(sectionStep.selector).length) {
                throw new Error(`HAZELINE: The element cannot be found on the page. SELECTOR: ${sectionStep.selector}`);
            }
        });
    }

    private getElement(selector: string): JQuery<HTMLElement> | null {
        return $(selector) || null;
    }

    private runInternal(section: TutorialSection): void {
        this.initializeTutorial(section);
        Drawer
            .drawOverlay()
            .pipe(
                filter(overlayIsReady => !!overlayIsReady),
                switchMap(() => Drawer.drawStep(section.steps[this.currentTutorialStep], true, false)),
                tap(nextStep => {
                    if (nextStep === NextStepPossibilities.FORWARD) {
                        this.loadNextStep(section);
                    }
                    if (nextStep === NextStepPossibilities.BACKWARD) {
                        this.loadPreviousStep(section);
                    }
                    if (nextStep === NextStepPossibilities.FINISHED) {
                        this.finalizeTutorial(section);
                    }
                    if (nextStep === NextStepPossibilities.TUTORIAL_CLOSE) {
                        //  There might be some differences between normal end or premature close. So we'll keep them in two ifs
                        this.finalizeTutorial(section);
                    }
                })
            )
            .subscribe();
    }

    private loadNextStep(section: TutorialSection): void {
        if (this.currentTutorialStep === section.steps.length - 1) {
            this.finalizeTutorial(section);
            return;
        }

        this.currentTutorialStep++;
        const isFirstStep = this.currentTutorialStep === 0;
        const isLastStep = this.currentTutorialStep === section.steps.length - 1;

        Drawer.drawStep(section.steps[this.currentTutorialStep], isFirstStep, isLastStep)
            .subscribe();
    }

    private loadPreviousStep(section: TutorialSection): void {
        if (this.currentTutorialStep === 0) {
            return;
        }

        this.currentTutorialStep--;
        const isFirstStep = this.currentTutorialStep === 0;
        const isLastStep = this.currentTutorialStep === section.steps.length - 1;

        Drawer.drawStep(section.steps[this.currentTutorialStep], isFirstStep, isLastStep)
            .subscribe();
    }

    private initializeTutorial(section: TutorialSection): void {
        if (section.onStart) {
            section.onStart();
        }
        this._$tutorialStatus.next({
            runningSection: section,
            tutorialStatus: TutorialStatuses.Started
        });
    }

    private finalizeTutorial(section: TutorialSection): any {
        if (section.onEnd) {
            section.onEnd();
        }

        this.currentTutorialStep = 0;
        Drawer.removeEverything();

        this._$tutorialStatus.next({
            runningSection: null,
            tutorialStatus: TutorialStatuses.Stopped
        });
    }
}