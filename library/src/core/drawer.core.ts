import $ from 'jquery';
import Tether from 'tether';

import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, filter, tap } from 'rxjs/operators';

import { InfoBoxPlacement } from '../enums/info-box-placement.enum';
import { NextStepPossibilities } from '../enums/next-step-possibilities.enum';

import { SectionStep } from "../interfaces/section-step.interface";
import { StepStylableElements } from '../interfaces/stylable-elements';

import { StylesManager } from './styles-manager.core';

export class Drawer {

    private static tether: Tether;
    private static viewportSizes: ViewportSizes;
    private static windowResizeListenerAttached = false;
    private static _$nextStep: BehaviorSubject<NextStepPossibilities> = new BehaviorSubject(null);

    //  Custom triggers events wrappers
    private static nextStepCustomTriggerWrapper: (event: any) => void = null;

    //  Previous step element status properties
    private static prevElZIndex: string = null;
    private static prevElOpacity: string = null;
    private static prevElPosition: string = null;
    private static prevElSelector: string = null;
    private static prevElTransition: string = null;

    //  Elements misc properties
    private static clothZIndex = '999';
    private static infoBoxMargin = '10px';
    private static infoBoxAlreadyDrawn = false;

    //  Elements IDs
    private static clothId = 'HAZELINE-TUTORIAL-CLOTH';
    private static infoBoxId = 'HAZELINE-TUTORIAL-INFO-BOX';
    private static tutorialCloseBtnId = 'HAZELINE-TUTORIAL-CLOSE';
    private static nextStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-NEXT-STEP';
    private static prevStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-PREV-STEP';
    private static infoStepBoxContentElId = 'HAZELINE-TUTORIAL-INFO-BOX-CONTENT';

    //  Info box buttons stuff
    private static defaultEndButtonText = 'End';
    private static defaultNextButtonText = 'Next';
    private static defaultPreviousButtonText = 'Previous';

    ////////////////////////////////////////////////////////////    
    //  Static methods
    ////////////////////////////////////////////////////////////    
    public static drawCloth(): Observable<boolean> {
        const clothIsReady = new BehaviorSubject(false);

        const viewportSizes = this.getViewportSizes();
        const cloth = StylesManager.styleTutorialCloth(document.createElement('div'));

        cloth.setAttribute('id', this.clothId);
        cloth.style.width = `${viewportSizes.width.toString()}px`;
        cloth.style.height = `${viewportSizes.height.toString()}px`;

        $('body').prepend(cloth);

        setTimeout(() => {
            document.getElementById(this.clothId).style.opacity = '1';
            clothIsReady.next(true);
            clothIsReady.complete();

            if (!this.windowResizeListenerAttached) {
                window.onresize = () => {
                    this.updateClothSize();
                    this.windowResizeListenerAttached = true;
                }
            }
        }, 200);

        return clothIsReady;
    }

    public static drawStep(step: SectionStep, isFirstStep?: boolean, isLastStep?: boolean): Observable<NextStepPossibilities> {
        StylesManager.resetStyles();
        this.applyStepCustomStylesIfAny(step.styles);

        const element = $(step.selector);
        if (!!step.onStart) {
            step = step.onStart(element[0], step);
        }

        this.bringToFrontHTMLElement(step)
            .pipe(
                filter(elementIsReady => !!elementIsReady),
                switchMap(() => this.drawTutorialStepInfoBox(step, isFirstStep, isLastStep)),
        )
            .subscribe();

        return this._$nextStep;
    }

    public static removeEverything(): void {
        if (this.prevElSelector) {
            this.restorePreviousElementStatus();
        }

        document.getElementsByTagName('body')[0]
            .removeChild(document.getElementById(this.clothId));

        document.getElementsByTagName('body')[0]
            .removeChild(document.getElementById(this.infoBoxId));

        if (this.tether) {
            this.tether.destroy();
        }

        this.infoBoxAlreadyDrawn = false;
        this._$nextStep.complete();
        this._$nextStep = new BehaviorSubject(null);
    }

    private static getViewportSizes(): ViewportSizes {
        this.viewportSizes = {
            width: $(window).width(),
            height: $(window).height(),
        };

        return this.viewportSizes;
    }

    private static bringToFrontHTMLElement(step: SectionStep): Observable<boolean> {
        const elementBroughtToFront: BehaviorSubject<boolean> = new BehaviorSubject(false);
        const element = $(step.selector)[0];

        if (!!this.prevElSelector) {
            this.restorePreviousElementStatus()
                .pipe(
                    filter(elementRestored => !!elementRestored),
                    tap(() => this.backupCurrentElementPropertiesAndChangeThem(element, step, elementBroughtToFront)),
            )
                .subscribe();
        } else {
            this.backupCurrentElementPropertiesAndChangeThem(element, step, elementBroughtToFront);
        }

        return elementBroughtToFront;
    }

    private static backupCurrentElementPropertiesAndChangeThem(element: HTMLElement, step: SectionStep, elementBroughtToFront: BehaviorSubject<boolean>): void {
        const skipFirstOpacityChange = !this.prevElSelector;
        this.prevElSelector = step.selector;
        this.prevElZIndex = element.style.zIndex;
        this.prevElOpacity = element.style.opacity;
        this.prevElPosition = element.style.position;
        this.prevElTransition = element.style.transition;

        if (!skipFirstOpacityChange) {
            element.style.opacity = '0';
        }

        element = this.attachCustomTriggersIfAny(element, step);

        setTimeout(() => {
            element.style.position = 'relative';
            element.style.zIndex = this.clothZIndex;
            element.style.transition = 'opacity 200ms ease-in-out';

            setTimeout(() => {
                if (!skipFirstOpacityChange) {
                    element.style.opacity = '1';
                }
                elementBroughtToFront.next(true);
                elementBroughtToFront.complete();
            }, 100);
        }, 100);

    }

    private static attachCustomTriggersIfAny(element: HTMLElement, step: SectionStep): HTMLElement {
        if (step.triggers && step.triggers.next) {
            this.nextStepCustomTriggerWrapper = (event: any) => {
                if (step.triggers.next.action(event)) {
                    this.onNextStep(step);
                }
            };

            element.addEventListener(step.triggers.next.event, this.nextStepCustomTriggerWrapper);
        }

        return element;
    }

    private static detachCustomTriggersIfAny(element: HTMLElement, step: SectionStep): void {
        if (step.triggers && step.triggers.next) {
            element.removeEventListener(step.triggers.next.event, this.nextStepCustomTriggerWrapper);
        }
    }

    private static restorePreviousElementStatus(): Observable<boolean> {
        const elementStatusRestored: BehaviorSubject<boolean> = new BehaviorSubject(false);

        const element = $(this.prevElSelector);

        setTimeout(() => {
            element.css('z-index', this.prevElZIndex);
            element.css('opacity', this.prevElOpacity);
            element.css('position', this.prevElPosition);
            element.css('transition', this.prevElTransition);
            elementStatusRestored.next(true);
        }, 100);

        return elementStatusRestored;
    }

    private static drawTutorialStepInfoBox(step: SectionStep, isFirstStep?: boolean, isLastStep?: boolean): Observable<boolean> {
        const infoBoxIsReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
        if (this.infoBoxAlreadyDrawn) {
            this.setValuesOnInfoBox(step, isFirstStep, isLastStep);
            infoBoxIsReady.next(true);
            return infoBoxIsReady;
        }

        const infoBoxElement = this.defineInfoBoxElement(step);
        //  Define the div that will act as tutorial interrupt (close) button 
        const tutorialCloseButton = this.defineTutorialCloseButton(step);
        $(infoBoxElement).append(tutorialCloseButton);

        $('body').append(infoBoxElement);
        this.setValuesOnInfoBox(step, isFirstStep, isLastStep);

        setTimeout(() => {
            infoBoxIsReady.next(true);
            infoBoxIsReady.complete();
            this.infoBoxAlreadyDrawn = true;
        }, 100);

        return infoBoxIsReady;
    }

    private static defineInfoBoxElement(step: SectionStep): HTMLDivElement {
        const infoBoxElement = StylesManager.styleInfoBox(document.createElement('div'));
        const infoBoxMarginSettings = this.getMarginSettingsBasedOnPositioning(step.infoBoxPlacement);

        infoBoxElement.id = this.infoBoxId;
        infoBoxElement.style[infoBoxMarginSettings.margin] = infoBoxMarginSettings.value;

        return infoBoxElement as HTMLDivElement;
    }

    private static defineTutorialCloseButton(step: SectionStep): HTMLDivElement {
        const tutorialCloseButton = StylesManager.styleTutorialCloseButton(document.createElement('div'));
        tutorialCloseButton.id = this.tutorialCloseBtnId;
        tutorialCloseButton.textContent = 'X';

        tutorialCloseButton.addEventListener('click', () => {
            this.onTutorialCloseBtn();
        });

        return tutorialCloseButton as HTMLDivElement;
    }

    private static defineButtons(infoBoxElement: HTMLDivElement, step: SectionStep, isLastStep?: boolean): ButtonsDefinitionResult {
        const nextStepButton = StylesManager.styleInfoBoxNextBtn(document.createElement('button'));
        nextStepButton.id = this.nextStepBtnId;
        nextStepButton.textContent = this.getNextButtonText(step, isLastStep);

        nextStepButton.addEventListener('click', () => {
            if (step.onNext) {
                step = step.onNext($(step.selector)[0], step);
            }

            infoBoxElement.style.opacity = '0';

            if (isLastStep) {
                this.onLastStep();
            } else {
                this.onNextStep(step);
            }
        });

        //  Define the previous step button element
        const prevStepButton = StylesManager.styleInfoBoxPrevBtn(document.createElement('button'));
        prevStepButton.id = this.prevStepBtnId;
        prevStepButton.textContent = step.prevBtnText ? step.prevBtnText : this.defaultPreviousButtonText;

        prevStepButton.addEventListener('click', () => {
            infoBoxElement.style.opacity = '0';
            this.onPreviousStep();
        });

        return {
            nextButton: nextStepButton,
            prevButton: prevStepButton
        };
    }

    private static getNextButtonText(step: SectionStep, isLastStep: boolean): string {
        if (isLastStep) {
            if (step.endBtnText) {
                return step.endBtnText;
            }
            return this.defaultEndButtonText;
        }

        if (step.nextBtnText) {
            return step.nextBtnText;
        }

        return this.defaultNextButtonText;
    }

    private static setValuesOnInfoBox(step: SectionStep, isFirstStep?: boolean, isLastStep?: boolean): void {
        this.updateInfoBoxContent(step);
        this.updateInfoBoxButtons(step, isFirstStep, isLastStep);
        this.updateInfoBoxMargins(step);
        const infoBoxElement = document.getElementById(this.infoBoxId) as HTMLDivElement;

        setTimeout(() => {
            if (this.tether) {
                this.tether.setOptions({
                    element: infoBoxElement,
                    target: $(step.selector),
                    attachment: this.getTetherAttachmentForInfoBox(step.infoBoxPlacement),
                    targetAttachment: this.getTetherTargetAttachmentForInfoBox(step.infoBoxPlacement)
                });

            } else {
                this.tether = new Tether({
                    element: infoBoxElement,
                    target: $(step.selector),
                    attachment: this.getTetherAttachmentForInfoBox(step.infoBoxPlacement),
                    targetAttachment: this.getTetherTargetAttachmentForInfoBox(step.infoBoxPlacement)
                });
            }

            infoBoxElement.style.opacity = '1';
        }, 150);
    }

    private static updateInfoBoxMargins(step: SectionStep): void {
        const marginSettings = this.getMarginSettingsBasedOnPositioning(step.infoBoxPlacement);
        const infoBoxElement = document.getElementById(this.infoBoxId) as HTMLDivElement;

        //  Reset all the margins
        infoBoxElement.style.margin = '0';
        //  Apply the new margins
        infoBoxElement.style[marginSettings.margin] = marginSettings.value;
    }

    private static updateInfoBoxContent(step: SectionStep): void {
        const infoBoxElement = StylesManager.styleInfoBox(document.getElementById(this.infoBoxId));
        const stepDescriptionParagraphElement = StylesManager.styleInfoBoxContent(document.createElement('p'));

        stepDescriptionParagraphElement.innerHTML = step.htmlContent;
        stepDescriptionParagraphElement.id = this.infoStepBoxContentElId;

        if (document.getElementById(this.infoStepBoxContentElId)) {
            infoBoxElement.removeChild(document.getElementById(this.infoStepBoxContentElId));
        }

        infoBoxElement.appendChild(stepDescriptionParagraphElement);
    }

    private static updateInfoBoxButtons(step: SectionStep, isFirstStep: boolean, isLastStep: boolean): void {
        const infoBoxElement = document.getElementById(this.infoBoxId) as HTMLDivElement;

        //  Define the buttons for the info box
        const buttons = this.defineButtons(infoBoxElement, step, isLastStep);
        if (!isFirstStep) {
            if (infoBoxElement.contains(document.getElementById(this.prevStepBtnId))) {
                //  Remove the previous button and it's listeners
                infoBoxElement.removeChild(document.getElementById(this.prevStepBtnId));
            }

            //  Append the button on the info box
            infoBoxElement.appendChild(buttons.prevButton);
        } if (!!isFirstStep && infoBoxElement.contains(document.getElementById(this.prevStepBtnId))) {
            //  Remove the button from the info box if is present
            infoBoxElement.removeChild(document.getElementById(this.prevStepBtnId));
        }

        if (!isLastStep) {
            if (infoBoxElement.contains(document.getElementById(this.nextStepBtnId))) {
                //  Remove the previous button and it's listeners
                infoBoxElement.removeChild(document.getElementById(this.nextStepBtnId));
            }
            //  Append the button on the info box
            infoBoxElement.appendChild(buttons.nextButton);
        } if (!!isLastStep && infoBoxElement.contains(document.getElementById(this.nextStepBtnId))) {
            //  Remove the button from the info box if is present
            infoBoxElement.removeChild(document.getElementById(this.nextStepBtnId));
            //  Now add the "next" button, this time configured to end the tutorial
            infoBoxElement.appendChild(buttons.nextButton);
        }
    }

    private static getMarginSettingsBasedOnPositioning(infoBoxPlacement: InfoBoxPlacement | string): { margin: string, value: string } {
        const result = {
            margin: null,
            value: null,
        };

        switch (infoBoxPlacement) {
            case InfoBoxPlacement.LEFT:
                result.margin = 'marginLeft';
                result.value = `-${this.infoBoxMargin}`;
                break;

            case InfoBoxPlacement.ABOVE:
                result.margin = 'marginTop';
                result.value = `-${this.infoBoxMargin}`;
                break;

            case InfoBoxPlacement.RIGHT:
                result.margin = 'marginLeft';
                result.value = this.infoBoxMargin;
                break;


            case InfoBoxPlacement.BELOW:
            default:
                result.margin = 'marginTop';
                result.value = this.infoBoxMargin;
                break;
        }

        return result;
    }

    private static getTetherAttachmentForInfoBox(infoBoxPlacement: InfoBoxPlacement | string): string {
        switch (infoBoxPlacement) {
            case InfoBoxPlacement.LEFT: return 'middle right';
            case InfoBoxPlacement.ABOVE: return 'bottom middle';
            case InfoBoxPlacement.RIGHT: return 'middle left';
            case InfoBoxPlacement.BELOW: default: return 'top middle';
        }
    }

    private static getTetherTargetAttachmentForInfoBox(infoBoxPlacement: InfoBoxPlacement | string): string {
        switch (infoBoxPlacement) {
            case InfoBoxPlacement.LEFT: return 'middle top';
            case InfoBoxPlacement.ABOVE: return 'top middle';
            case InfoBoxPlacement.RIGHT: return 'middle right';
            case InfoBoxPlacement.BELOW: return 'bottom middle';
            default: return 'bottom middle';
        }
    }

    private static onNextStep(step: SectionStep): void {
        this.detachCustomTriggersIfAny($(step.selector)[0], step);
        this._$nextStep.next(NextStepPossibilities.FORWARD);
    }

    private static onLastStep(): void {
        this._$nextStep.next(NextStepPossibilities.FINISHED);
    }

    private static onPreviousStep(): void {
        this._$nextStep.next(NextStepPossibilities.BACKWARD);
    }

    private static onTutorialCloseBtn(): void {
        this._$nextStep.next(NextStepPossibilities.TUTORIAL_CLOSE);
    }

    private static updateClothSize(): void {
        const newSizes = this.getViewportSizes();

        document.getElementById(this.clothId).style.width = `${newSizes.width}px`;
        document.getElementById(this.clothId).style.height = `${newSizes.height}px`;
    }

    private static applyStepCustomStylesIfAny(customStyles: StepStylableElements): void {
        if (!customStyles) {
            return;
        }

        if (customStyles.infoBox) { StylesManager.deafultInfoBoxStyle = customStyles.infoBox; }
        if (customStyles.infoBoxContent) { StylesManager.defaultInfoBoxContentStyle = customStyles.infoBoxContent; }
        if (customStyles.infoBoxPreviousBtn) { StylesManager.defaultInfoBoxPrevBtnStyle = customStyles.infoBoxPreviousBtn; }
        if (customStyles.infoBoxNextOrEndBtn) { StylesManager.defaultInfoBoxNextBtnStyle = customStyles.infoBoxNextOrEndBtn; }
    }
}

interface ViewportSizes {
    width: number;
    height: number;
}

interface ButtonsDefinitionResult {
    nextButton: HTMLElement,
    prevButton: HTMLElement
}
