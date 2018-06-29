"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//  Third party imports
const jquery_1 = __importDefault(require("jquery"));
const tether_1 = __importDefault(require("tether"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
//  Core imports
const styles_manager_core_1 = require("./styles-manager.core");
//  Enums imports
const info_box_placement_enum_1 = require("../enums/info-box-placement.enum");
const next_step_possibilities_enum_1 = require("../enums/next-step-possibilities.enum");
class Drawer {
    static drawOverlay() {
        const overlayIsReady = new rxjs_1.BehaviorSubject(false);
        const overlay = styles_manager_core_1.StylesManager.styleTutorialOverlay(document.createElement('div'));
        jquery_1.default('body').prepend(overlay);
        setTimeout(() => {
            styles_manager_core_1.StylesManager.revealOverlay(overlay);
            overlayIsReady.next(true);
            overlayIsReady.complete();
        }, 200);
        return overlayIsReady;
    }
    static drawStep(step, isFirstStep, isLastStep) {
        //  Remove the old event listener attached if any
        window.removeEventListener('resize', this.onResizeEventListener);
        this.currentStep = step;
        window.addEventListener('resize', this.onResizeEventListener);
        styles_manager_core_1.StylesManager.resetStyles();
        styles_manager_core_1.StylesManager.applyStepCustomStylesIfAny(step.styles);
        if (step.beforeStartDelay !== null && step.beforeStartDelay !== undefined) {
            this.drawPleaseWait(step)
                .pipe(operators_1.filter(res => !!res), operators_1.delay(step.beforeStartDelay), operators_1.switchMap(() => this.hidePleaseWait()), operators_1.switchMap(() => this.bringToFrontHTMLElement(step)), operators_1.tap(() => this.callOnStartForThisStep(step)), operators_1.filter(elementIsReady => !!elementIsReady), operators_1.switchMap(() => this.drawTutorialStepInfoBox(step, isFirstStep, isLastStep))).subscribe();
        }
        else {
            this.bringToFrontHTMLElement(step)
                .pipe(operators_1.tap(() => this.callOnStartForThisStep(step)), operators_1.filter(elementIsReady => !!elementIsReady), operators_1.switchMap(() => this.drawTutorialStepInfoBox(step, isFirstStep, isLastStep))).subscribe();
        }
        return this._$nextStep;
    }
    static drawPleaseWait(step) {
        const pleaseWaitIsReady = new rxjs_1.BehaviorSubject(false);
        let pleaseWaitElement = document.getElementById(styles_manager_core_1.StylesManager.pleaseWaitId);
        if (!pleaseWaitElement) {
            pleaseWaitElement = document.createElement('h1');
        }
        //  Finally style it to prevent null values passed to the StylesManager
        pleaseWaitElement = step.classes && step.classes.pleaseWait
            ? styles_manager_core_1.StylesManager.applyPleaseWaitClasses(pleaseWaitElement, step.classes.pleaseWait, step.pleaseWaitText)
            : styles_manager_core_1.StylesManager.stylePleaseWait(pleaseWaitElement, step.pleaseWaitText);
        jquery_1.default('body').append(pleaseWaitElement);
        setTimeout(() => {
            pleaseWaitElement.style.opacity = '1';
            pleaseWaitIsReady.next(true);
            pleaseWaitIsReady.complete();
        }, 100);
        return pleaseWaitIsReady.asObservable();
    }
    static hidePleaseWait() {
        const pleaseWaitIsGone = new rxjs_1.BehaviorSubject(false);
        let pleaseWaitElement = document.getElementById(styles_manager_core_1.StylesManager.pleaseWaitId);
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
    static removeEverything() {
        if (this.prevElSelector) {
            this.restorePreviousElementStatus();
        }
        document.removeEventListener('resize', this.onResizeEventListener);
        document.getElementsByTagName('body')[0]
            .removeChild(document.getElementById(styles_manager_core_1.StylesManager.overlayId));
        document.getElementsByTagName('body')[0]
            .removeChild(document.getElementById(styles_manager_core_1.StylesManager.infoBoxId));
        if (this.tether) {
            this.tether.destroy();
        }
        this.infoBoxAlreadyDrawn = false;
        this._$nextStep.complete();
        this._$nextStep = new rxjs_1.BehaviorSubject(null);
    }
    static callOnStartForThisStep(step) {
        const element = jquery_1.default(step.selector);
        if (!!step.onStart) {
            step = step.onStart(element[0], step);
        }
    }
    static bringToFrontHTMLElement(step) {
        const elementBroughtToFront = new rxjs_1.BehaviorSubject(false);
        const element = jquery_1.default(step.selector)[0];
        if (!!this.prevElSelector) {
            this.restorePreviousElementStatus()
                .pipe(operators_1.filter(elementRestored => !!elementRestored), operators_1.tap(() => this.backupCurrentElementPropertiesAndChangeThem(element, step, elementBroughtToFront)))
                .subscribe();
        }
        else {
            this.backupCurrentElementPropertiesAndChangeThem(element, step, elementBroughtToFront);
        }
        return elementBroughtToFront;
    }
    static backupCurrentElementPropertiesAndChangeThem(element, step, elementBroughtToFront) {
        const skipFirstAnimation = !this.prevElSelector;
        this.prevElSelector = step.selector;
        this.prevElZIndex = element.style.zIndex;
        this.prevElOpacity = element.style.opacity;
        this.prevElPosition = element.style.position;
        this.prevElTransition = element.style.transition;
        if (!skipFirstAnimation) {
            jquery_1.default(element).animate({ 'opacity': '0' }, 100);
        }
        element = this.attachCustomTriggersIfAny(element, step);
        setTimeout(() => {
            element.style.position = 'relative';
            element.style.zIndex = this.overlayZIndex;
            setTimeout(() => {
                if (!skipFirstAnimation) {
                    jquery_1.default(element).animate({ 'opacity': '1' }, 100);
                }
                elementBroughtToFront.next(true);
                elementBroughtToFront.complete();
            }, 100);
        }, 100);
    }
    static attachCustomTriggersIfAny(element, step) {
        if (step.triggers && step.triggers.next) {
            this.nextStepCustomTriggerWrapper = (event) => {
                if (step.triggers.next.action(event)) {
                    this.onNextStep(step);
                }
            };
            element.addEventListener(step.triggers.next.event, this.nextStepCustomTriggerWrapper);
        }
        return element;
    }
    static detachCustomTriggersIfAny(element, step) {
        if (step.triggers && step.triggers.next) {
            element.removeEventListener(step.triggers.next.event, this.nextStepCustomTriggerWrapper);
        }
    }
    static restorePreviousElementStatus() {
        const elementStatusRestored = new rxjs_1.BehaviorSubject(false);
        const element = jquery_1.default(this.prevElSelector);
        setTimeout(() => {
            element.css('z-index', this.prevElZIndex);
            element.css('opacity', this.prevElOpacity);
            element.css('position', this.prevElPosition);
            element.css('transition', this.prevElTransition);
            elementStatusRestored.next(true);
        }, 100);
        return elementStatusRestored;
    }
    static drawTutorialStepInfoBox(step, isFirstStep, isLastStep) {
        const infoBoxIsReady = new rxjs_1.BehaviorSubject(false);
        if (this.infoBoxAlreadyDrawn) {
            this.setValuesOnInfoBox(step, isFirstStep, isLastStep);
            infoBoxIsReady.next(true);
            return infoBoxIsReady;
        }
        const infoBoxElement = this.defineInfoBoxElement(step);
        //  Define the div that will act as tutorial interrupt (close) button 
        const tutorialCloseButton = this.defineTutorialCloseButton(step);
        jquery_1.default(infoBoxElement).append(tutorialCloseButton);
        jquery_1.default('body').append(infoBoxElement);
        this.setValuesOnInfoBox(step, isFirstStep, isLastStep);
        setTimeout(() => {
            infoBoxIsReady.next(true);
            infoBoxIsReady.complete();
            this.infoBoxAlreadyDrawn = true;
        }, 100);
        return infoBoxIsReady;
    }
    static defineInfoBoxElement(step) {
        const infoBoxElement = step.classes && step.classes.infoBox
            ? styles_manager_core_1.StylesManager.applyInfoBoxClasses(document.createElement('div'), step.classes.infoBox, step.infoBoxPlacement)
            : styles_manager_core_1.StylesManager.styleInfoBox(document.createElement('div'), step.infoBoxPlacement);
        return infoBoxElement;
    }
    static defineTutorialCloseButton(step) {
        const tutorialCloseButton = step.classes && step.classes.tutorialCloseBtn
            ? styles_manager_core_1.StylesManager.applyTutorialCloseBtnClasses(document.createElement('div'), step.classes.tutorialCloseBtn)
            : styles_manager_core_1.StylesManager.styleTutorialCloseButton(document.createElement('div'));
        tutorialCloseButton.addEventListener('click', () => this.onTutorialCloseBtn());
        return tutorialCloseButton;
    }
    static defineButtons(infoBoxElement, step, isLastStep) {
        const nextStepButton = step.classes && step.classes.infoBoxNextOrEndBtn
            ? styles_manager_core_1.StylesManager.applyInfoBoxNextBtnClasses(document.createElement('button'), step.classes.infoBoxNextOrEndBtn, step.nextBtnText, isLastStep)
            : styles_manager_core_1.StylesManager.styleInfoBoxNextBtn(document.createElement('button'), step.nextBtnText, isLastStep);
        nextStepButton.addEventListener('click', () => {
            if (step.onNext) {
                step = step.onNext(jquery_1.default(step.selector)[0], step);
            }
            infoBoxElement.style.opacity = '0';
            if (isLastStep) {
                this.onLastStep();
            }
            else {
                this.onNextStep(step);
            }
        });
        //  Define the previous step button element
        const prevStepButton = step.classes && step.classes.infoBoxPreviousBtn
            ? styles_manager_core_1.StylesManager.applyInfoBoxPrevBtnClasses(document.createElement('button'), step.classes.infoBoxPreviousBtn)
            : styles_manager_core_1.StylesManager.styleInfoBoxPrevBtn(document.createElement('button'), step.prevBtnText);
        prevStepButton.addEventListener('click', () => {
            infoBoxElement.style.opacity = '0';
            this.onPreviousStep();
        });
        return {
            nextButton: nextStepButton,
            prevButton: prevStepButton
        };
    }
    static setValuesOnInfoBox(step, isFirstStep, isLastStep) {
        const infoBoxElement = document.getElementById(styles_manager_core_1.StylesManager.infoBoxId);
        this.updateInfoBoxContent(step, infoBoxElement);
        this.updateInfoBoxButtons(step, isFirstStep, isLastStep);
        this.updateTetherPosition(step, infoBoxElement);
    }
    static updateTetherPosition(step, infoBoxElement) {
        setTimeout(() => {
            if (this.tether) {
                this.tether.setOptions({
                    element: infoBoxElement,
                    target: jquery_1.default(step.selector),
                    attachment: this.getTetherAttachmentForInfoBox(step.infoBoxPlacement),
                    targetAttachment: this.getTetherTargetAttachmentForInfoBox(step.infoBoxPlacement)
                });
            }
            else {
                this.tether = new tether_1.default({
                    element: infoBoxElement,
                    target: jquery_1.default(step.selector),
                    attachment: this.getTetherAttachmentForInfoBox(step.infoBoxPlacement),
                    targetAttachment: this.getTetherTargetAttachmentForInfoBox(step.infoBoxPlacement)
                });
            }
            infoBoxElement.style.opacity = '1';
        }, 150);
    }
    static updateInfoBoxContent(step, infoBoxEl) {
        const infoBoxElement = step.classes && step.classes.infoBox
            ? styles_manager_core_1.StylesManager.applyInfoBoxClasses(infoBoxEl, step.classes.infoBox, step.infoBoxPlacement)
            : styles_manager_core_1.StylesManager.styleInfoBox(infoBoxEl, step.infoBoxPlacement);
        //  Update styles on the close button 
        step.classes && step.classes.tutorialCloseBtn
            ? styles_manager_core_1.StylesManager.applyTutorialCloseBtnClasses(document.getElementById(styles_manager_core_1.StylesManager.tutorialCloseBtnId), step.classes.tutorialCloseBtn)
            : styles_manager_core_1.StylesManager.styleTutorialCloseButton(document.getElementById(styles_manager_core_1.StylesManager.tutorialCloseBtnId));
        const stepDescriptionParagraphElement = step.classes && step.classes.infoBoxContent
            ? styles_manager_core_1.StylesManager.applyInfoBoxContentClasses(document.createElement('p'), step.classes.infoBoxContent, step.text)
            : styles_manager_core_1.StylesManager.styleInfoBoxContent(document.createElement('p'), step.text);
        if (document.getElementById(styles_manager_core_1.StylesManager.infoStepBoxContentElId)) {
            infoBoxElement.removeChild(document.getElementById(styles_manager_core_1.StylesManager.infoStepBoxContentElId));
        }
        infoBoxElement.appendChild(stepDescriptionParagraphElement);
    }
    static updateInfoBoxButtons(step, isFirstStep, isLastStep) {
        const infoBoxElement = document.getElementById(styles_manager_core_1.StylesManager.infoBoxId);
        //  Define the buttons for the info box
        const buttons = this.defineButtons(infoBoxElement, step, isLastStep);
        if (!isFirstStep) {
            if (infoBoxElement.contains(document.getElementById(styles_manager_core_1.StylesManager.prevStepBtnId))) {
                //  Remove the previous button and it's listeners
                infoBoxElement.removeChild(document.getElementById(styles_manager_core_1.StylesManager.prevStepBtnId));
            }
            //  Append the button on the info box
            infoBoxElement.appendChild(buttons.prevButton);
        }
        if (!!isFirstStep && infoBoxElement.contains(document.getElementById(styles_manager_core_1.StylesManager.prevStepBtnId))) {
            //  Remove the button from the info box if is present
            infoBoxElement.removeChild(document.getElementById(styles_manager_core_1.StylesManager.prevStepBtnId));
        }
        if (!isLastStep) {
            if (infoBoxElement.contains(document.getElementById(styles_manager_core_1.StylesManager.nextStepBtnId))) {
                //  Remove the previous button and it's listeners
                infoBoxElement.removeChild(document.getElementById(styles_manager_core_1.StylesManager.nextStepBtnId));
            }
            //  Append the button on the info box
            infoBoxElement.appendChild(buttons.nextButton);
        }
        if (!!isLastStep && infoBoxElement.contains(document.getElementById(styles_manager_core_1.StylesManager.nextStepBtnId))) {
            //  Remove the button from the info box if is present
            infoBoxElement.removeChild(document.getElementById(styles_manager_core_1.StylesManager.nextStepBtnId));
            //  Now add the "next" button, this time configured to end the tutorial
            infoBoxElement.appendChild(buttons.nextButton);
        }
    }
    static getTetherAttachmentForInfoBox(infoBoxPlacement) {
        switch (infoBoxPlacement) {
            case info_box_placement_enum_1.InfoBoxPlacement.LEFT: return 'middle right';
            case info_box_placement_enum_1.InfoBoxPlacement.ABOVE: return 'bottom middle';
            case info_box_placement_enum_1.InfoBoxPlacement.RIGHT: return 'middle left';
            case info_box_placement_enum_1.InfoBoxPlacement.BELOW:
            default: return 'top middle';
        }
    }
    static getTetherTargetAttachmentForInfoBox(infoBoxPlacement) {
        switch (infoBoxPlacement) {
            case info_box_placement_enum_1.InfoBoxPlacement.LEFT: return 'middle top';
            case info_box_placement_enum_1.InfoBoxPlacement.ABOVE: return 'top middle';
            case info_box_placement_enum_1.InfoBoxPlacement.RIGHT: return 'middle right';
            case info_box_placement_enum_1.InfoBoxPlacement.BELOW: return 'bottom middle';
            default: return 'bottom middle';
        }
    }
    static onNextStep(step) {
        this.detachCustomTriggersIfAny(jquery_1.default(step.selector)[0], step);
        this._$nextStep.next(next_step_possibilities_enum_1.NextStepPossibilities.FORWARD);
    }
    static onLastStep() {
        this._$nextStep.next(next_step_possibilities_enum_1.NextStepPossibilities.FINISHED);
    }
    static onPreviousStep() {
        this._$nextStep.next(next_step_possibilities_enum_1.NextStepPossibilities.BACKWARD);
    }
    static onTutorialCloseBtn() {
        this._$nextStep.next(next_step_possibilities_enum_1.NextStepPossibilities.TUTORIAL_CLOSE);
    }
}
Drawer.currentStep = null;
Drawer._$nextStep = new rxjs_1.BehaviorSubject(null);
Drawer.onResizeEventListener = () => {
    if (!document.getElementById(styles_manager_core_1.StylesManager.overlayId)) {
        return;
    }
    styles_manager_core_1.StylesManager.updateOverlaySize(document.getElementById(styles_manager_core_1.StylesManager.overlayId));
    if (Drawer.infoBoxAlreadyDrawn) {
        const infoBoxElement = document.getElementById(styles_manager_core_1.StylesManager.infoBoxId);
        Drawer.updateTetherPosition(Drawer.currentStep, infoBoxElement);
    }
};
//  Custom triggers events wrappers
Drawer.nextStepCustomTriggerWrapper = null;
//  Previous step element status properties
Drawer.prevElZIndex = null;
Drawer.prevElOpacity = null;
Drawer.prevElPosition = null;
Drawer.prevElSelector = null;
Drawer.prevElTransition = null;
//  Elements misc properties
Drawer.overlayZIndex = '999';
Drawer.infoBoxAlreadyDrawn = false;
exports.Drawer = Drawer;
//# sourceMappingURL=drawer.core.js.map