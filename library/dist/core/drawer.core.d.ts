import { Observable } from 'rxjs';
import { SectionStep } from "../interfaces/section-step.interface";
export declare class Drawer {
    private static tether;
    private static viewportSizes;
    private static windowResizeListenerAttached;
    private static _$nextStep;
    private static prevElZIndex;
    private static prevElOpacity;
    private static prevElPosition;
    private static prevElSelector;
    private static prevElTransition;
    private static clothZIndex;
    private static clothId;
    private static infoBoxZIndex;
    private static infoBoxAlreadyDrawn;
    private static infoBoxId;
    private static infoStepBoxContentElId;
    private static nextStepBtnZindex;
    private static nextStepBtnId;
    private static prevStepBtnZindex;
    private static prevStepBtnId;
    static drawCloth(): Observable<boolean>;
    static drawStep(step: SectionStep, isFirstStep?: boolean, isLastStep?: boolean): Observable<NextStepPossibilities>;
    private static getViewportSizes;
    private static bringToFrontHTMLElement;
    private static backupCurrentElementPropertiesAndChangeThem;
    private static restorePreviousElementStatus;
    private static drawTutorialStepInfoBox;
    private static defineInfoBoxElement;
    private static defineButtons;
    private static setValuesOnInfoBox;
    private static onNextStep;
    private static onPreviousStep;
    private static updateClothSize;
}
export declare enum NextStepPossibilities {
    FORWARD = 0,
    BACKWARD = 1
}
//# sourceMappingURL=drawer.core.d.ts.map