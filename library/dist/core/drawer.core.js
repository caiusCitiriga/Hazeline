"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const tether_1 = __importDefault(require("tether"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
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
        cloth.style.zIndex = this.clothZIndex;
        cloth.style.background = 'rgba(0,0,0,0.9)';
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
        const infoBoxElement = this.defineInfoBoxElement();
        jquery_1.default('body').append(infoBoxElement);
        this.setValuesOnInfoBox(step, isFirstStep, isLastStep);
        setTimeout(() => {
            infoBoxIsReady.next(true);
            infoBoxIsReady.complete();
            this.infoBoxAlreadyDrawn = true;
        }, 100);
        return infoBoxIsReady;
    }
    static defineInfoBoxElement() {
        const infoBoxElement = document.createElement('div');
        infoBoxElement.id = this.infoBoxId;
        infoBoxElement.style.opacity = '0';
        infoBoxElement.style.color = '#fff';
        infoBoxElement.style.width = '300px';
        infoBoxElement.style.height = '200px';
        infoBoxElement.style.marginTop = '10px';
        infoBoxElement.style.borderRadius = '5px';
        infoBoxElement.style.position = 'relative';
        infoBoxElement.style.border = '2px solid #fff';
        infoBoxElement.style.zIndex = this.infoBoxZIndex;
        infoBoxElement.style.background = 'rgba(0,0,0,0.3)';
        infoBoxElement.style.transition = 'opacity 200ms ease-in-out';
        return infoBoxElement;
    }
    static defineButtons(infoBoxElement, step, isLastStep) {
        //  Define the next step button element
        const nextStepButton = document.createElement('button');
        nextStepButton.textContent = isLastStep ? 'END' : 'NEXT';
        nextStepButton.style.right = '0';
        nextStepButton.style.bottom = '0';
        nextStepButton.style.padding = '10px';
        nextStepButton.id = this.nextStepBtnId;
        nextStepButton.style.position = 'absolute';
        nextStepButton.style.zIndex = this.nextStepBtnZindex;
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
        prevStepButton.style.padding = '10px';
        prevStepButton.id = this.prevStepBtnId;
        prevStepButton.style.position = 'absolute';
        prevStepButton.style.zIndex = this.prevStepBtnZindex;
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
        const infoBoxElement = document.getElementById(this.infoBoxId);
        const idSpanElement = document.createElement('span');
        idSpanElement.textContent = step.id;
        idSpanElement.id = this.infoStepBoxContentElId;
        if (document.getElementById(this.infoStepBoxContentElId)) {
            infoBoxElement.removeChild(document.getElementById(this.infoStepBoxContentElId));
        }
        infoBoxElement.appendChild(idSpanElement);
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
        setTimeout(() => {
            if (this.tether) {
                this.tether.setOptions({
                    element: infoBoxElement,
                    target: jquery_1.default(step.selector),
                    attachment: 'top left',
                    targetAttachment: 'bottom left'
                });
            }
            else {
                this.tether = new tether_1.default({
                    element: infoBoxElement,
                    target: jquery_1.default(step.selector),
                    attachment: 'top left',
                    targetAttachment: 'bottom left'
                });
            }
            infoBoxElement.style.opacity = '1';
        }, 150);
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