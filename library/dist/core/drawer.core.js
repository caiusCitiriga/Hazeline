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
        const element = jquery_1.default(step.selector);
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
        //  Define the box info element
        const infoBoxElement = this.defineInfoBoxElement(step);
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
    static defineButtons(infoBoxElement, step, isLastStep) {
        const nextStepButton = styles_manager_core_1.StylesManager.styleInfoBoxNextBtn(document.createElement('button'));
        nextStepButton.id = this.nextStepBtnId;
        nextStepButton.textContent = this.getNextButtonText(step, isLastStep);
        nextStepButton.setAttribute('class', `btn ${isLastStep ? 'btn-success' : 'btn-primary'}`);
        nextStepButton.addEventListener('click', () => {
            if (step.onNext) {
                step = step.onNext(jquery_1.default(step.selector)[0], step);
            }
            infoBoxElement.style.opacity = '0';
            if (isLastStep) {
                this.onLastStep();
            }
            else {
                this.onNextStep();
            }
        });
        //  Define the previous step button element
        const prevStepButton = styles_manager_core_1.StylesManager.styleInfoBoxPrevBtn(document.createElement('button'));
        prevStepButton.id = this.prevStepBtnId;
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
    static onNextStep() {
        this._$nextStep.next(next_step_possibilities_enum_1.NextStepPossibilities.FORWARD);
    }
    static onLastStep() {
        this._$nextStep.next(next_step_possibilities_enum_1.NextStepPossibilities.FINISHED);
    }
    static onPreviousStep() {
        this._$nextStep.next(next_step_possibilities_enum_1.NextStepPossibilities.BACKWARD);
    }
    static updateClothSize() {
        const newSizes = this.getViewportSizes();
        document.getElementById(this.clothId).style.width = `${newSizes.width}px`;
        document.getElementById(this.clothId).style.height = `${newSizes.height}px`;
    }
}
Drawer.windowResizeListenerAttached = false;
Drawer._$nextStep = new rxjs_1.BehaviorSubject(null);
//  Previous step element status properties
Drawer.prevElZIndex = null;
Drawer.prevElOpacity = null;
Drawer.prevElPosition = null;
Drawer.prevElSelector = null;
Drawer.prevElTransition = null;
//  Cloth stuff
Drawer.clothZIndex = '999';
Drawer.clothId = 'HAZELINE-TUTORIAL-CLOTH';
//  Info box stuff
Drawer.infoBoxMargin = '10px';
Drawer.infoBoxZIndex = '999';
Drawer.infoBoxAlreadyDrawn = false;
Drawer.infoBoxId = 'HAZELINE-TUTORIAL-INFO-BOX';
Drawer.infoStepBoxContentElId = 'HAZELINE-TUTORIAL-INFO-BOX-CONTENT';
Drawer.nextStepBtnZindex = '999';
Drawer.nextStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-NEXT-STEP';
Drawer.prevStepBtnZindex = '999';
Drawer.prevStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-PREV-STEP';
//  Info box buttons stuff
Drawer.defaultEndButtonText = 'End';
Drawer.defaultNextButtonText = 'Next';
Drawer.defaultPreviousButtonText = 'Previous';
exports.Drawer = Drawer;
//# sourceMappingURL=drawer.core.js.map