import { Observable } from 'rxjs';
import { NextStepPossibilities } from '../enums/next-step-possibilities.enum';
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
    private static infoBoxMargin;
    private static infoBoxAlreadyDrawn;
    private static clothId;
    private static infoBoxId;
    private static tutorialCloseBtnId;
    private static nextStepBtnId;
    private static prevStepBtnId;
    private static infoStepBoxContentElId;
    private static defaultEndButtonText;
    private static defaultNextButtonText;
    private static defaultPreviousButtonText;
    static drawCloth(): Observable<boolean>;
    static drawStep(step: SectionStep, isFirstStep?: boolean, isLastStep?: boolean): Observable<NextStepPossibilities>;
    static removeEverything(): void;
    private static getViewportSizes;
    private static bringToFrontHTMLElement;
    private static backupCurrentElementPropertiesAndChangeThem;
    private static restorePreviousElementStatus;
    private static drawTutorialStepInfoBox;
    private static defineInfoBoxElement;
    private static defineTutorialCloseButton;
    private static defineButtons;
    private static getNextButtonText;
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
    private static onTutorialCloseBtn;
    private static updateClothSize;
    private static applyStepCustomStylesIfAny;
}
//# sourceMappingURL=drawer.core.d.ts.map