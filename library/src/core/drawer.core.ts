import $ from 'jquery';
import Tether from 'tether';

import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, filter, tap, delay } from 'rxjs/operators';

import { StylesManager } from './styles-manager.core';
import { SectionStep } from "../interfaces/section-step.interface";
import { InfoBoxPlacement } from '../enums/info-box-placement.enum';
import { NextStepPossibilities } from '../enums/next-step-possibilities.enum';

export class Drawer {

    private static tether: Tether;
    private static currentStep: SectionStep = null;
    private static _$nextStep: BehaviorSubject<NextStepPossibilities> = new BehaviorSubject(null);

    private static onResizeEventListener = () => {
        if (!document.getElementById(StylesManager.clothId)) {
            return;
        }

        StylesManager.updateClothSize(document.getElementById(StylesManager.clothId));
        if (Drawer.infoBoxAlreadyDrawn) {
            const infoBoxElement = document.getElementById(StylesManager.infoBoxId);
            Drawer.updateTetherPosition(Drawer.currentStep, infoBoxElement);
        }
    };

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
    private static infoBoxAlreadyDrawn = false;

    public static drawCloth(): Observable<boolean> {
        const clothIsReady = new BehaviorSubject(false);

        const cloth = StylesManager.styleTutorialCloth(document.createElement('div'));
        $('body').prepend(cloth);

        setTimeout(() => {
            StylesManager.revealCloth(cloth);
            clothIsReady.next(true);
            clothIsReady.complete();
        }, 200);

        return clothIsReady;
    }

    public static drawStep(step: SectionStep, isFirstStep?: boolean, isLastStep?: boolean): Observable<NextStepPossibilities> {
        //  Remove the old event listener attached if any
        window.removeEventListener('resize', this.onResizeEventListener);

        this.currentStep = step;
        window.addEventListener('resize', this.onResizeEventListener);

        StylesManager.resetStyles();
        StylesManager.applyStepCustomStylesIfAny(step.styles);

        if (step.beforeStartDelay !== null && step.beforeStartDelay !== undefined) {
            this.drawPleaseWait(step)
                .pipe(
                    filter(res => !!res),
                    delay(step.beforeStartDelay),
                    switchMap(() => this.hidePleaseWait()),
                    switchMap(() => this.bringToFrontHTMLElement(step)),
                    tap(() => this.callOnStartForThisStep(step)),
                    filter(elementIsReady => !!elementIsReady),
                    switchMap(() => this.drawTutorialStepInfoBox(step, isFirstStep, isLastStep))
                ).subscribe();
        } else {
            this.bringToFrontHTMLElement(step)
                .pipe(
                    tap(() => this.callOnStartForThisStep(step)),
                    filter(elementIsReady => !!elementIsReady),
                    switchMap(() => this.drawTutorialStepInfoBox(step, isFirstStep, isLastStep))
                ).subscribe();
        }

        return this._$nextStep;
    }

    public static drawPleaseWait(step: SectionStep): Observable<boolean> {
        const pleaseWaitIsReady = new BehaviorSubject(false);
        let pleaseWaitElement = document.getElementById(StylesManager.pleaseWaitId);

        if (!pleaseWaitElement) {
            pleaseWaitElement = document.createElement('h1');
        }

        //  Finally style it to prevent null values passed to the StylesManager
        pleaseWaitElement = step.classes && step.classes.pleaseWait
            ? StylesManager.applyPleaseWaitClasses(pleaseWaitElement, step.classes.pleaseWait, step.pleaseWaitText)
            : StylesManager.stylePleaseWait(pleaseWaitElement, step.pleaseWaitText);

        $('body').append(pleaseWaitElement);

        setTimeout(() => {
            pleaseWaitElement.style.opacity = '1';
            pleaseWaitIsReady.next(true);
            pleaseWaitIsReady.complete();
        }, 100);

        return pleaseWaitIsReady.asObservable();
    }

    public static hidePleaseWait(): Observable<boolean> {
        const pleaseWaitIsGone = new BehaviorSubject(false);

        let pleaseWaitElement = document.getElementById(StylesManager.pleaseWaitId);
        if (!pleaseWaitElement) {
            return;
        }

        pleaseWaitElement.style.opacity = '0';

        setTimeout(() => {
            document.getElementsByTagName('body')[0].removeChild(pleaseWaitElement);
            pleaseWaitIsGone.next(true);
            pleaseWaitIsGone.complete();
        }, +pleaseWaitElement.style.transitionDuration);

        return pleaseWaitIsGone.asObservable();
    }

    public static removeEverything(): void {
        if (this.prevElSelector) {
            this.restorePreviousElementStatus();
        }

        document.removeEventListener('resize', this.onResizeEventListener);
        document.getElementsByTagName('body')[0]
            .removeChild(document.getElementById(StylesManager.clothId));

        document.getElementsByTagName('body')[0]
            .removeChild(document.getElementById(StylesManager.infoBoxId));

        if (this.tether) {
            this.tether.destroy();
        }

        this.infoBoxAlreadyDrawn = false;
        this._$nextStep.complete();
        this._$nextStep = new BehaviorSubject(null);
    }

    private static callOnStartForThisStep(step: SectionStep): void {
        const element = $(step.selector);
        if (!!step.onStart) {
            step = step.onStart(element[0], step);
        }
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
        const skipFirstAnimation = !this.prevElSelector;
        this.prevElSelector = step.selector;
        this.prevElZIndex = element.style.zIndex;
        this.prevElOpacity = element.style.opacity;
        this.prevElPosition = element.style.position;
        this.prevElTransition = element.style.transition;

        if (!skipFirstAnimation) {
            $(element).animate({ 'opacity': '0' }, 100);
        }

        element = this.attachCustomTriggersIfAny(element, step);

        setTimeout(() => {
            element.style.position = 'relative';
            element.style.zIndex = this.clothZIndex;

            setTimeout(() => {
                if (!skipFirstAnimation) {
                    $(element).animate({ 'opacity': '1' }, 100);
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
        const infoBoxElement = step.classes && step.classes.infoBox
            ? StylesManager.applyInfoBoxClasses(document.createElement('div'), step.classes.infoBox, step.infoBoxPlacement)
            : StylesManager.styleInfoBox(document.createElement('div'), step.infoBoxPlacement);

        return infoBoxElement as HTMLDivElement;
    }

    private static defineTutorialCloseButton(step: SectionStep): HTMLDivElement {
        const tutorialCloseButton = step.classes && step.classes.tutorialCloseBtn
            ? StylesManager.applyTutorialCloseBtnClasses(document.createElement('div'), step.classes.tutorialCloseBtn)
            : StylesManager.styleTutorialCloseButton(document.createElement('div'));

        tutorialCloseButton.addEventListener('click', () => this.onTutorialCloseBtn());

        return tutorialCloseButton as HTMLDivElement;
    }

    private static defineButtons(infoBoxElement: HTMLDivElement, step: SectionStep, isLastStep?: boolean): ButtonsDefinitionResult {
        const nextStepButton = step.classes && step.classes.infoBoxNextOrEndBtn
            ? StylesManager.applyInfoBoxNextBtnClasses(document.createElement('button'), step.classes.infoBoxNextOrEndBtn, step.nextBtnText, isLastStep)
            : StylesManager.styleInfoBoxNextBtn(document.createElement('button'), step.nextBtnText, isLastStep);

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
        const prevStepButton = step.classes && step.classes.infoBoxPreviousBtn
            ? StylesManager.applyInfoBoxPrevBtnClasses(document.createElement('button'), step.classes.infoBoxPreviousBtn)
            : StylesManager.styleInfoBoxPrevBtn(document.createElement('button'), step.prevBtnText);

        prevStepButton.addEventListener('click', () => {
            infoBoxElement.style.opacity = '0';
            this.onPreviousStep();
        });

        return {
            nextButton: nextStepButton,
            prevButton: prevStepButton
        };
    }

    private static setValuesOnInfoBox(step: SectionStep, isFirstStep?: boolean, isLastStep?: boolean): void {
        const infoBoxElement = document.getElementById(StylesManager.infoBoxId) as HTMLDivElement;
        this.updateInfoBoxContent(step, infoBoxElement);
        this.updateInfoBoxButtons(step, isFirstStep, isLastStep);
        this.updateTetherPosition(step, infoBoxElement);
    }

    private static updateTetherPosition(step: SectionStep, infoBoxElement: HTMLElement): void {
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

    private static updateInfoBoxContent(step: SectionStep, infoBoxEl: HTMLElement): void {
        const infoBoxElement = step.classes && step.classes.infoBox
            ? StylesManager.applyInfoBoxClasses(infoBoxEl, step.classes.infoBox, step.infoBoxPlacement)
            : StylesManager.styleInfoBox(infoBoxEl, step.infoBoxPlacement);

        //  Update styles on the close button 
        step.classes && step.classes.tutorialCloseBtn
            ? StylesManager.applyTutorialCloseBtnClasses(document.getElementById(StylesManager.tutorialCloseBtnId), step.classes.tutorialCloseBtn)
            : StylesManager.styleTutorialCloseButton(document.getElementById(StylesManager.tutorialCloseBtnId));

        const stepDescriptionParagraphElement = step.classes && step.classes.infoBoxContent
            ? StylesManager.applyInfoBoxContentClasses(document.createElement('p'), step.classes.infoBoxContent, step.text)
            : StylesManager.styleInfoBoxContent(document.createElement('p'), step.text);

        if (document.getElementById(StylesManager.infoStepBoxContentElId)) {
            infoBoxElement.removeChild(document.getElementById(StylesManager.infoStepBoxContentElId));
        }

        infoBoxElement.appendChild(stepDescriptionParagraphElement);
    }

    private static updateInfoBoxButtons(step: SectionStep, isFirstStep: boolean, isLastStep: boolean): void {
        const infoBoxElement = document.getElementById(StylesManager.infoBoxId) as HTMLDivElement;

        //  Define the buttons for the info box
        const buttons = this.defineButtons(infoBoxElement, step, isLastStep);
        if (!isFirstStep) {
            if (infoBoxElement.contains(document.getElementById(StylesManager.prevStepBtnId))) {
                //  Remove the previous button and it's listeners
                infoBoxElement.removeChild(document.getElementById(StylesManager.prevStepBtnId));
            }

            //  Append the button on the info box
            infoBoxElement.appendChild(buttons.prevButton);
        } if (!!isFirstStep && infoBoxElement.contains(document.getElementById(StylesManager.prevStepBtnId))) {
            //  Remove the button from the info box if is present
            infoBoxElement.removeChild(document.getElementById(StylesManager.prevStepBtnId));
        }

        if (!isLastStep) {
            if (infoBoxElement.contains(document.getElementById(StylesManager.nextStepBtnId))) {
                //  Remove the previous button and it's listeners
                infoBoxElement.removeChild(document.getElementById(StylesManager.nextStepBtnId));
            }
            //  Append the button on the info box
            infoBoxElement.appendChild(buttons.nextButton);
        } if (!!isLastStep && infoBoxElement.contains(document.getElementById(StylesManager.nextStepBtnId))) {
            //  Remove the button from the info box if is present
            infoBoxElement.removeChild(document.getElementById(StylesManager.nextStepBtnId));
            //  Now add the "next" button, this time configured to end the tutorial
            infoBoxElement.appendChild(buttons.nextButton);
        }
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
}

interface ButtonsDefinitionResult {
    nextButton: HTMLElement,
    prevButton: HTMLElement
}
