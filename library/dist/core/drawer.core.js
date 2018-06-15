"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const tether_1 = __importDefault(require("tether"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const section_step_interface_1 = require("../interfaces/section-step.interface");
class Drawer {
    ////////////////////////////////////////////////////////////    
    //  Static methods
    ////////////////////////////////////////////////////////////    
    static drawCloth() {
        const clothIsReady = new rxjs_1.BehaviorSubject(false);
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
            step.onStart(element[0], step.id, step.selector);
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
        const infoBoxElement = document.createElement('div');
        const infoBoxMarginSettings = this.getMarginSettingsBasedOnPositioning(step.infoBoxPlacement);
        infoBoxElement.id = this.infoBoxId;
        infoBoxElement.style.opacity = '0';
        infoBoxElement.style.color = '#333';
        infoBoxElement.style.width = '300px';
        infoBoxElement.style.height = '200px';
        infoBoxElement.style.padding = '10px';
        infoBoxElement.style.background = '#fff';
        infoBoxElement.style.borderRadius = '5px';
        infoBoxElement.style.position = 'relative';
        infoBoxElement.style.zIndex = this.infoBoxZIndex;
        infoBoxElement.style.transition = 'opacity 200ms ease-in-out';
        infoBoxElement.style[infoBoxMarginSettings.margin] = infoBoxMarginSettings.value;
        return infoBoxElement;
    }
    static defineButtons(infoBoxElement, step, isLastStep) {
        //  Define the next step button element
        const nextStepButton = document.createElement('button');
        nextStepButton.textContent = isLastStep ? 'END' : 'NEXT';
        nextStepButton.style.right = '0';
        nextStepButton.style.bottom = '0';
        nextStepButton.style.margin = '5px';
        nextStepButton.style.padding = '10px';
        nextStepButton.id = this.nextStepBtnId;
        nextStepButton.style.position = 'absolute';
        nextStepButton.style.zIndex = this.nextStepBtnZindex;
        nextStepButton.setAttribute('class', `btn ${isLastStep ? 'btn-success' : 'btn-primary'}`);
        //  Attach the listener for click that will trigger the goToNextStep to true
        nextStepButton.addEventListener('click', () => {
            if (step.onNext) {
                step.onNext(jquery_1.default(step.selector)[0], step.id, step.selector);
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
        const prevStepButton = document.createElement('button');
        prevStepButton.textContent = 'PREVIOUS';
        prevStepButton.style.left = '0';
        prevStepButton.style.bottom = '0';
        prevStepButton.style.margin = '5px';
        prevStepButton.style.padding = '10px';
        prevStepButton.id = this.prevStepBtnId;
        prevStepButton.style.position = 'absolute';
        prevStepButton.style.zIndex = this.prevStepBtnZindex;
        prevStepButton.setAttribute('class', 'btn btn-secondary');
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
        infoBoxElement.style[marginSettings.margin] = marginSettings.value;
    }
    static updateInfoBoxContent(step) {
        const infoBoxElement = document.getElementById(this.infoBoxId);
        const idSpanElement = document.createElement('span');
        idSpanElement.textContent = step.id;
        idSpanElement.id = this.infoStepBoxContentElId;
        if (document.getElementById(this.infoStepBoxContentElId)) {
            infoBoxElement.removeChild(document.getElementById(this.infoStepBoxContentElId));
        }
        infoBoxElement.appendChild(idSpanElement);
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
            case section_step_interface_1.InfoBoxPlacement.LEFT:
                result.margin = 'marginLeft';
                result.value = `-${this.infoBoxMargin}`;
                break;
            case section_step_interface_1.InfoBoxPlacement.ABOVE:
                result.margin = 'marginTop';
                result.value = `-${this.infoBoxMargin}`;
                break;
            case section_step_interface_1.InfoBoxPlacement.RIGHT:
                result.margin = 'marginLeft';
                result.value = this.infoBoxMargin;
                break;
            case section_step_interface_1.InfoBoxPlacement.BELOW:
            default:
                result.margin = 'marginTop';
                result.value = this.infoBoxMargin;
                break;
        }
        return result;
    }
    static getTetherAttachmentForInfoBox(infoBoxPlacement) {
        switch (infoBoxPlacement) {
            case section_step_interface_1.InfoBoxPlacement.LEFT: return 'top right';
            case section_step_interface_1.InfoBoxPlacement.ABOVE: return 'bottom left';
            case section_step_interface_1.InfoBoxPlacement.RIGHT: return 'top left';
            case section_step_interface_1.InfoBoxPlacement.BELOW:
            default: return 'top left';
        }
    }
    static getTetherTargetAttachmentForInfoBox(infoBoxPlacement) {
        switch (infoBoxPlacement) {
            case section_step_interface_1.InfoBoxPlacement.LEFT: return 'left top';
            case section_step_interface_1.InfoBoxPlacement.ABOVE: return 'top left';
            case section_step_interface_1.InfoBoxPlacement.RIGHT: return 'top right';
            case section_step_interface_1.InfoBoxPlacement.BELOW: return 'bottom left';
            default: return 'bottom left';
        }
    }
    static onNextStep() {
        this._$nextStep.next(NextStepPossibilities.FORWARD);
    }
    static onLastStep() {
        this._$nextStep.next(NextStepPossibilities.FINISHED);
    }
    static onPreviousStep() {
        this._$nextStep.next(NextStepPossibilities.BACKWARD);
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
exports.Drawer = Drawer;
var NextStepPossibilities;
(function (NextStepPossibilities) {
    NextStepPossibilities[NextStepPossibilities["FORWARD"] = 0] = "FORWARD";
    NextStepPossibilities[NextStepPossibilities["BACKWARD"] = 1] = "BACKWARD";
    NextStepPossibilities[NextStepPossibilities["FINISHED"] = 2] = "FINISHED";
})(NextStepPossibilities = exports.NextStepPossibilities || (exports.NextStepPossibilities = {}));
//# sourceMappingURL=drawer.core.js.map