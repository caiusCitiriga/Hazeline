import $ from 'jquery';
import Tether from 'tether';

import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, filter, tap, skip } from 'rxjs/operators';

import { InfoBoxPlacement } from '../enums/info-box-placement.enum';
import { NextStepPossibilities } from '../enums/next-step-possibilities.enum';

import { SectionStep } from "../interfaces/section-step.interface";

export class Drawer {

    private static tether: Tether;
    private static viewportSizes: ViewportSizes;
    private static windowResizeListenerAttached = false;
    private static _$nextStep: BehaviorSubject<NextStepPossibilities> = new BehaviorSubject(null);

    //  Previous step element status properties
    private static prevElZIndex: string = null;
    private static prevElOpacity: string = null;
    private static prevElPosition: string = null;
    private static prevElSelector: string = null;
    private static prevElTransition: string = null;

    //  Cloth stuff
    private static clothZIndex = '999';
    private static clothId = 'HAZELINE-TUTORIAL-CLOTH';

    //  Info box stuff
    private static infoBoxMargin = '10px';

    private static infoBoxZIndex = '999';
    private static infoBoxAlreadyDrawn = false;
    private static infoBoxId = 'HAZELINE-TUTORIAL-INFO-BOX';
    private static infoStepBoxContentElId = 'HAZELINE-TUTORIAL-INFO-BOX-CONTENT';

    private static nextStepBtnZindex = '999';
    private static nextStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-NEXT-STEP';

    private static prevStepBtnZindex = '999';
    private static prevStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-PREV-STEP';

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
        const cloth = document.createElement('div');
        cloth.setAttribute('id', this.clothId);

        cloth.style.top = '0';
        cloth.style.left = '0';
        cloth.style.opacity = '0';
        cloth.style.position = 'fixed';
        cloth.style.background = '#007bffe6';
        cloth.style.zIndex = this.clothZIndex;
        cloth.style.transition = 'opacity 120ms ease-in-out';
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
        const element = $(step.selector);

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

    private static backupCurrentElementPropertiesAndChangeThem(element: JQuery<HTMLElement>, step: SectionStep, elementBroughtToFront: BehaviorSubject<boolean>): void {
        const skipFirstOpacityChange = !this.prevElSelector;
        this.prevElSelector = step.selector;
        this.prevElZIndex = element.css('z-index');
        this.prevElOpacity = element.css('opacity');
        this.prevElPosition = element.css('position');
        this.prevElTransition = element.css('transition');

        if (!skipFirstOpacityChange) {
            element.css('opacity', 0);
        }

        setTimeout(() => {
            element.css('position', 'relative');
            element.css('z-index', this.clothZIndex);
            element.css('transition', 'opacity 200ms ease-in-out');

            setTimeout(() => {
                if (!skipFirstOpacityChange) {
                    element.css('opacity', 1);
                }
                elementBroughtToFront.next(true);
                elementBroughtToFront.complete();
            }, 100);
        }, 100);

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

        //  Define the box info element
        const infoBoxElement = this.defineInfoBoxElement(step);

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
        const infoBoxElement = document.createElement('div');
        const infoBoxMarginSettings = this.getMarginSettingsBasedOnPositioning(step.infoBoxPlacement);

        infoBoxElement.id = this.infoBoxId;
        infoBoxElement.style.opacity = '0';
        infoBoxElement.style.color = '#333';
        infoBoxElement.style.width = '300px';
        infoBoxElement.style.padding = '10px';
        infoBoxElement.style.minHeight = '210px';
        infoBoxElement.style.background = '#fff';
        infoBoxElement.style.borderRadius = '5px';
        infoBoxElement.style.position = 'relative';
        infoBoxElement.style.zIndex = this.infoBoxZIndex;
        infoBoxElement.style.boxShadow = 'rgb(0, 0, 0) 0px 3px 12px -6px';
        infoBoxElement.style.transition = 'opacity 200ms ease-in-out';
        infoBoxElement.style[infoBoxMarginSettings.margin] = infoBoxMarginSettings.value;

        return infoBoxElement;
    }

    private static defineButtons(infoBoxElement: HTMLDivElement, step: SectionStep, isLastStep?: boolean): ButtonsDefinitionResult {
        //  Define the next step button element
        const nextStepButton = document.createElement('button');
        //  If the user has specified a text for next/end btn use it, otherwise use the defaults
        nextStepButton.style.right = '0';
        nextStepButton.style.bottom = '0';
        nextStepButton.style.padding = '10px';
        nextStepButton.id = this.nextStepBtnId;
        nextStepButton.style.marginRight = '10px';
        nextStepButton.style.marginBottom = '10px';
        nextStepButton.style.position = 'absolute';
        nextStepButton.style.zIndex = this.nextStepBtnZindex;
        nextStepButton.textContent = this.getNextButtonText(step, isLastStep);
        nextStepButton.setAttribute('class', `btn ${isLastStep ? 'btn-success' : 'btn-primary'}`);
        //  Attach the listener for click that will trigger the goToNextStep to true
        nextStepButton.addEventListener('click', () => {
            if (step.onNext) {
                step = step.onNext($(step.selector)[0], step);
            }

            infoBoxElement.style.opacity = '0';

            if (isLastStep) {
                this.onLastStep();
            } else {
                this.onNextStep();
            }
        });

        //  Define the previous step button element
        const prevStepButton = document.createElement('button');
        prevStepButton.style.left = '0';
        prevStepButton.style.bottom = '0';
        prevStepButton.style.padding = '10px';
        prevStepButton.id = this.prevStepBtnId;
        prevStepButton.style.marginLeft = '10px';
        prevStepButton.style.marginBottom = '10px';
        prevStepButton.style.position = 'absolute';
        prevStepButton.style.zIndex = this.prevStepBtnZindex;
        prevStepButton.setAttribute('class', 'btn btn-secondary');
        prevStepButton.textContent = step.prevBtnText ? step.prevBtnText : this.defaultPreviousButtonText;
        //  Attach the listener for click that will trigger the goToPreviousStep to true
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

        infoBoxElement.style[marginSettings.margin] = marginSettings.value;
    }

    private static updateInfoBoxContent(step: SectionStep): void {
        const infoBoxElement = document.getElementById(this.infoBoxId) as HTMLDivElement;
        const stepDescriptionParagraphElement = document.createElement('p');

        stepDescriptionParagraphElement.textContent = step.text;
        stepDescriptionParagraphElement.style.height = '130px';
        stepDescriptionParagraphElement.style.overflowY = 'scroll';
        stepDescriptionParagraphElement.style.textAlign = 'center';
        stepDescriptionParagraphElement.style.borderRadius = '5px';
        stepDescriptionParagraphElement.id = this.infoStepBoxContentElId;
        stepDescriptionParagraphElement.style.border = '1px solid #eee';

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

    private static onNextStep(): void {
        this._$nextStep.next(NextStepPossibilities.FORWARD);
    }

    private static onLastStep(): void {
        this._$nextStep.next(NextStepPossibilities.FINISHED);
    }

    private static onPreviousStep(): void {
        this._$nextStep.next(NextStepPossibilities.BACKWARD);
    }

    private static updateClothSize(): void {
        const newSizes = this.getViewportSizes();

        document.getElementById(this.clothId).style.width = `${newSizes.width}px`;
        document.getElementById(this.clothId).style.height = `${newSizes.height}px`;
    }
}

interface ViewportSizes {
    width: number;
    height: number;
}

interface ButtonsDefinitionResult {
    nextButton: HTMLButtonElement,
    prevButton: HTMLButtonElement
}
