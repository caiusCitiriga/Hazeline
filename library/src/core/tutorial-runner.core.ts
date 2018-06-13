import $ from 'jquery';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap, switchMap } from 'rxjs/operators';

import { Drawer } from './drawer.core';
import { TutorialStatuses } from '../enums/tutorial-statuses.enum';
import { TutorialStatus } from '../interfaces/tutorial-status.interface';
import { TutorialSection } from "../interfaces/tutorial-section.interface";

export class TutorialRunner {

    private _$tutorialStatus: BehaviorSubject<TutorialStatus> = new BehaviorSubject(null);
    private currentTutorialStep = 0;

    public get $tutorialStatus(): Observable<TutorialStatus> {
        return this._$tutorialStatus;
    }

    public run(section: TutorialSection): void {
        if (!section) {
            console.log('HAZELINE: Cannot run a null section');
            return;
        }

        this.ensureAllStepsElementsExistsOrThrow(section);

        this.runInternal(section);
    }

    public ensureAllStepsElementsExistsOrThrow(section: TutorialSection): void {
        section.steps.forEach(sectionStep => {
            if (!this.getElement(sectionStep.selector).length) {
                throw new Error(`HAZELINE: The element cannot be found on the page. SELECTOR: ${sectionStep.selector} ID: ${sectionStep.id}`);
            }
        });
    }

    private getElement(selector: string): JQuery<HTMLElement> | null {
        return $(selector) || null;
    }

    private runInternal(section: TutorialSection): void {
        this.initializeTutorial(section);
        Drawer
            .drawCloth()
            .pipe(
                filter(clothIsReady => !!clothIsReady),
                switchMap(() => Drawer.drawStep(section.steps[this.currentTutorialStep])),
                filter(nextStepRequested => !!nextStepRequested),
                tap(() => this.loadNextStep(section)))
            .subscribe();
    }

    private loadNextStep(section: TutorialSection): void {
        if (this.currentTutorialStep === section.steps.length - 1) {
            this.finalizeTutorial(section);
            return;
        }

        this.currentTutorialStep++;
        Drawer.drawStep(section.steps[this.currentTutorialStep])
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
        this._$tutorialStatus.next({
            runningSection: null,
            tutorialStatus: TutorialStatuses.Stopped
        });
    }

}