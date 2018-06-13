import { Observable } from 'rxjs';
import { SectionStep } from "../interfaces/section-step.interface";
export declare class Drawer {
    private static viewportSizes;
    private static windowResizeListenerAttached;
    private static _$goToNextStep;
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
    private static nextStepBtnZindex;
    private static nextStepBtnId;
    private static infoStepBoxContentElId;
    static drawCloth(): Observable<boolean>;
    static drawStep(step: SectionStep): Observable<boolean>;
    private static getViewportSizes;
    private static bringToFrontHTMLElement;
    private static backupCurrentElementPropertiesAndChangeThem;
    private static restorePreviousElementStatus;
    private static drawTutorialStepInfoBox;
    private static setValuesOnInfoBox;
    private static onNextStep;
    private static updateClothSize;
    canGoToNextStep(): Observable<boolean>;
}
//# sourceMappingURL=drawer.core.d.ts.map