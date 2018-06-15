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
    private static infoBoxMargin;
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
    static removeEverything(): void;
    private static getViewportSizes;
    private static bringToFrontHTMLElement;
    private static backupCurrentElementPropertiesAndChangeThem;
    private static restorePreviousElementStatus;
    private static drawTutorialStepInfoBox;
    private static defineInfoBoxElement;
    private static defineButtons;
    private static setValuesOnInfoBox;
    private static updateInfoBoxMargins;
    private static updateInfoBoxContent;
    private static updateInfoBoxButtons;
    private static getMarginSettingsBasedOnPositioning;
    private static getTetherAttachmentForInfoBox;
    private static getTetherTargetAttachmentForInfoBox;
    private static onNextStep;
    private static onLastStep;
    private static onPreviousStep;
    private static updateClothSize;
}
export declare enum NextStepPossibilities {
    FORWARD = 0,
    BACKWARD = 1,
    FINISHED = 2
}
//# sourceMappingURL=drawer.core.d.ts.map