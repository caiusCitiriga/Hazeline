"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const tether_1 = __importDefault(require("tether"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const info_box_placement_enum_1 = require("../enums/info-box-placement.enum");
const next_step_possibilities_enum_1 = require("../enums/next-step-possibilities.enum");
const styles_manager_core_1 = require("./styles-manager.core");
class Drawer {
    ////////////////////////////////////////////////////////////    
    //  Static methods
    ////////////////////////////////////////////////////////////    
    static drawCloth() {
        const clothIsReady = new rxjs_1.BehaviorSubject(false);
        const viewportSizes = this.getViewportSizes();
        const cloth = styles_manager_core_1.StylesManager.styleTutorialCloth(document.createElement('div'));
        cloth.setAttribute('id', this.clothId);
        cloth.style.width = `${viewportSizes.width.toString()}px`;
        cloth.style.height = `${viewportSizes.height.toString()}px`;
        jquery_1.default('body').prepend(cloth);
        setTimeout(() => {
            document.getElementById(this.clothId).style.opacity = '1';
            clothIsReady.next(true);
            clothIsReady.complete();
            if (!this.windowResizeListenerAttached) {
                window.onresize = () => {
                    this.updateClothSize();
                    this.windowResizeListenerAttached = true;
                };
            }
        }, 200);
        return clothIsReady;
    }
    static drawStep(step, isFirstStep, isLastStep) {
        styles_manager_core_1.StylesManager.resetStyles();
        this.applyStepCustomStylesIfAny(step.styles);
        const element = jquery_1.default(step.selector);
        if (!!step.onStart) {
            step = step.onStart(element[0], step);
        }
        this.bringToFrontHTMLElement(step)
            .pipe(operators_1.filter(elementIsReady => !!elementIsReady), operators_1.switchMap(() => this.drawTutorialStepInfoBox(step, isFirstStep, isLastStep)))
            .subscribe();
        return this._$nextStep;
    }
    static removeEverything() {
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
        this._$nextStep = new rxjs_1.BehaviorSubject(null);
    }
    static getViewportSizes() {
        this.viewportSizes = {
            width: jquery_1.default(window).width(),
            height: jquery_1.default(window).height(),
        };
        return this.viewportSizes;
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
        const infoBoxElement = styles_manager_core_1.StylesManager.styleInfoBox(document.createElement('div'));
        const infoBoxMarginSettings = this.getMarginSettingsBasedOnPositioning(step.infoBoxPlacement);
        infoBoxElement.id = this.infoBoxId;
        infoBoxElement.style[infoBoxMarginSettings.margin] = infoBoxMarginSettings.value;
        return infoBoxElement;
    }
    static defineTutorialCloseButton(step) {
        const tutorialCloseButton = styles_manager_core_1.StylesManager.styleTutorialCloseButton(document.createElement('div'));
        tutorialCloseButton.id = this.tutorialCloseBtnId;
        tutorialCloseButton.textContent = 'X';
        tutorialCloseButton.addEventListener('click', () => {
            this.onTutorialCloseBtn();
        });
        return tutorialCloseButton;
    }
    static defineButtons(infoBoxElement, step, isLastStep) {
        const nextStepButton = styles_manager_core_1.StylesManager.styleInfoBoxNextBtn(document.createElement('button'));
        nextStepButton.id = this.nextStepBtnId;
        nextStepButton.textContent = this.getNextButtonText(step, isLastStep);
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
        const prevStepButton = styles_manager_core_1.StylesManager.styleInfoBoxPrevBtn(document.createElement('button'));
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
    static getNextButtonText(step, isLastStep) {
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
    static setValuesOnInfoBox(step, isFirstStep, isLastStep) {
        this.updateInfoBoxContent(step);
        this.updateInfoBoxButtons(step, isFirstStep, isLastStep);
        this.updateInfoBoxMargins(step);
        const infoBoxElement = document.getElementById(this.infoBoxId);
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
    static updateInfoBoxMargins(step) {
        const marginSettings = this.getMarginSettingsBasedOnPositioning(step.infoBoxPlacement);
        const infoBoxElement = document.getElementById(this.infoBoxId);
        //  Reset all the margins
        infoBoxElement.style.margin = '0';
        //  Apply the new margins
        infoBoxElement.style[marginSettings.margin] = marginSettings.value;
    }
    static updateInfoBoxContent(step) {
        const infoBoxElement = styles_manager_core_1.StylesManager.styleInfoBox(document.getElementById(this.infoBoxId));
        const stepDescriptionParagraphElement = styles_manager_core_1.StylesManager.styleInfoBoxContent(document.createElement('p'));
        stepDescriptionParagraphElement.textContent = step.text;
        stepDescriptionParagraphElement.id = this.infoStepBoxContentElId;
        if (document.getElementById(this.infoStepBoxContentElId)) {
            infoBoxElement.removeChild(document.getElementById(this.infoStepBoxContentElId));
        }
        infoBoxElement.appendChild(stepDescriptionParagraphElement);
    }
    static updateInfoBoxButtons(step, isFirstStep, isLastStep) {
        const infoBoxElement = document.getElementById(this.infoBoxId);
        //  Define the buttons for the info box
        const buttons = this.defineButtons(infoBoxElement, step, isLastStep);
        if (!isFirstStep) {
            if (infoBoxElement.contains(document.getElementById(this.prevStepBtnId))) {
                //  Remove the previous button and it's listeners
                infoBoxElement.removeChild(document.getElementById(this.prevStepBtnId));
            }
            //  Append the button on the info box
            infoBoxElement.appendChild(buttons.prevButton);
        }
        if (!!isFirstStep && infoBoxElement.contains(document.getElementById(this.prevStepBtnId))) {
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
        }
        if (!!isLastStep && infoBoxElement.contains(document.getElementById(this.nextStepBtnId))) {
            //  Remove the button from the info box if is present
            infoBoxElement.removeChild(document.getElementById(this.nextStepBtnId));
            //  Now add the "next" button, this time configured to end the tutorial
            infoBoxElement.appendChild(buttons.nextButton);
        }
    }
    static getMarginSettingsBasedOnPositioning(infoBoxPlacement) {
        const result = {
            margin: null,
            value: null,
        };
        switch (infoBoxPlacement) {
            case info_box_placement_enum_1.InfoBoxPlacement.LEFT:
                result.margin = 'marginLeft';
                result.value = `-${this.infoBoxMargin}`;
                break;
            case info_box_placement_enum_1.InfoBoxPlacement.ABOVE:
                result.margin = 'marginTop';
                result.value = `-${this.infoBoxMargin}`;
                break;
            case info_box_placement_enum_1.InfoBoxPlacement.RIGHT:
                result.margin = 'marginLeft';
                result.value = this.infoBoxMargin;
                break;
            case info_box_placement_enum_1.InfoBoxPlacement.BELOW:
            default:
                result.margin = 'marginTop';
                result.value = this.infoBoxMargin;
                break;
        }
        return result;
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
    static updateClothSize() {
        const newSizes = this.getViewportSizes();
        document.getElementById(this.clothId).style.width = `${newSizes.width}px`;
        document.getElementById(this.clothId).style.height = `${newSizes.height}px`;
    }
    static applyStepCustomStylesIfAny(customStyles) {
        if (!customStyles) {
            return;
        }
        if (customStyles.infoBox) {
            styles_manager_core_1.StylesManager.deafultInfoBoxStyle = customStyles.infoBox;
        }
        if (customStyles.infoBoxContent) {
            styles_manager_core_1.StylesManager.defaultInfoBoxContentStyle = customStyles.infoBoxContent;
        }
        if (customStyles.infoBoxPreviousBtn) {
            styles_manager_core_1.StylesManager.defaultInfoBoxPrevBtnStyle = customStyles.infoBoxPreviousBtn;
        }
        if (customStyles.infoBoxNextOrEndBtn) {
            styles_manager_core_1.StylesManager.defaultInfoBoxNextBtnStyle = customStyles.infoBoxNextOrEndBtn;
        }
    }
}
Drawer.windowResizeListenerAttached = false;
Drawer._$nextStep = new rxjs_1.BehaviorSubject(null);
//  Custom triggers events wrappers
Drawer.nextStepCustomTriggerWrapper = null;
//  Previous step element status properties
Drawer.prevElZIndex = null;
Drawer.prevElOpacity = null;
Drawer.prevElPosition = null;
Drawer.prevElSelector = null;
Drawer.prevElTransition = null;
//  Elements misc properties
Drawer.clothZIndex = '999';
Drawer.infoBoxMargin = '10px';
Drawer.infoBoxAlreadyDrawn = false;
//  Elements IDs
Drawer.clothId = 'HAZELINE-TUTORIAL-CLOTH';
Drawer.infoBoxId = 'HAZELINE-TUTORIAL-INFO-BOX';
Drawer.tutorialCloseBtnId = 'HAZELINE-TUTORIAL-CLOSE';
Drawer.nextStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-NEXT-STEP';
Drawer.prevStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-PREV-STEP';
Drawer.infoStepBoxContentElId = 'HAZELINE-TUTORIAL-INFO-BOX-CONTENT';
//  Info box buttons stuff
Drawer.defaultEndButtonText = 'End';
Drawer.defaultNextButtonText = 'Next';
Drawer.defaultPreviousButtonText = 'Previous';
exports.Drawer = Drawer;
//# sourceMappingURL=drawer.core.js.map