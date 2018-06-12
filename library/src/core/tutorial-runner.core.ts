import $ from 'jquery';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { Drawer } from './drawer.core';
import { TutorialStatuses } from '../enums/tutorial-statuses.enum';
import { TutorialStatus } from '../interfaces/tutorial-status.interface';
import { TutorialSection } from "../interfaces/tutorial-section.interface";

export class TutorialRunner {

    private _$tutorialStatus: BehaviorSubject<TutorialStatus> = new BehaviorSubject(null);

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
                filter(res => !!res),
                tap(res => {
                    section.steps.forEach((step, idx) => {
                        setTimeout(() => {
                            Drawer.drawBlocksAroundTutorialStepElement(step);
                        }, 100 * idx);
                    });
                    this.finalizeTutorial(section);
                }))
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