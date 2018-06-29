import { Observable } from 'rxjs';
import { TutorialStatus } from '../interfaces/tutorial-status.interface';
import { TutorialSection } from "../interfaces/tutorial-section.interface";
export declare class TutorialRunner {
    private _$tutorialStatus;
    private currentTutorialStep;
    readonly $tutorialStatus: Observable<TutorialStatus>;
    run(section: TutorialSection): void;
    ensureAllStepsElementsExistsOrThrow(section: TutorialSection): void;
    private getElement;
    private runInternal;
    private loadNextStep;
    private loadPreviousStep;
    private initializeTutorial;
    private finalizeTutorial;
}
