"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
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
        cloth.style.position = 'absolute';
        cloth.style.zIndex = this.clothZIndex;
        cloth.style.background = 'rgba(0,0,0,0.8)';
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
    static drawStep(step) {
        this.bringToFrontHTMLElement(step)
            .pipe(operators_1.filter(elementIsReady => !!elementIsReady), operators_1.switchMap(() => this.drawTutorialStepInfoBox(step)))
            .subscribe();
        return this._$goToNextStep;
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
        this.prevElSelector = step.selector;
        this.prevElZIndex = element.css('z-index');
        this.prevElOpacity = element.css('opacity');
        this.prevElPosition = element.css('position');
        this.prevElTransition = element.css('transition');
        element.css('opacity', 0);
        element.css('position', 'relative');
        element.css('z-index', this.clothZIndex);
        element.css('transition', 'opacity 120ms ease-in-out');
        setTimeout(() => {
            element.css('opacity', 1);
            elementBroughtToFront.next(true);
            elementBroughtToFront.complete();
        }, 200);
    }
    static restorePreviousElementStatus() {
        const elementStatusRestored = new rxjs_1.BehaviorSubject(false);
        const element = jquery_1.default(this.prevElSelector);
        element.fadeOut();
        setTimeout(() => {
            element.css('z-index', this.prevElZIndex);
            element.css('opacity', this.prevElOpacity);
            element.css('position', this.prevElPosition);
            element.css('transition', this.prevElTransition);
            element.fadeIn();
            elementStatusRestored.next(true);
        }, 100);
        return elementStatusRestored;
    }
    static drawTutorialStepInfoBox(step) {
        const infoBoxIsReady = new rxjs_1.BehaviorSubject(false);
        if (this.infoBoxAlreadyDrawn) {
            jquery_1.default(this.infoBoxId).fadeOut();
            this.setValuesOnInfoBox(step);
            jquery_1.default(this.infoBoxId).fadeIn();
            infoBoxIsReady.next(true);
            return infoBoxIsReady;
        }
        //  Define the box info element
        const infoBoxElement = document.createElement('div');
        infoBoxElement.id = this.infoBoxId;
        infoBoxElement.style.zIndex = this.clothZIndex;
        infoBoxElement.style.width = '300px';
        infoBoxElement.style.height = '200px';
        infoBoxElement.style.background = '#fff';
        infoBoxElement.style.position = 'absolute';
        infoBoxElement.style.border = '1px solid red';
        infoBoxElement.style.opacity = '0';
        //  Define the next step button element
        const nextStepButton = document.createElement('button');
        nextStepButton.id = this.nextStepBtnId;
        nextStepButton.style.zIndex = this.nextStepBtnZindex;
        nextStepButton.textContent = 'NEXT';
        //  Attach the listener for click that will trigger the goToNextStep to true
        nextStepButton.addEventListener('click', () => this.onNextStep());
        //  Append the button on the info box
        infoBoxElement.appendChild(nextStepButton);
        jquery_1.default('body').append(infoBoxElement);
        this.setValuesOnInfoBox(step);
        setTimeout(() => {
            infoBoxElement.style.opacity = '1';
            infoBoxIsReady.next(true);
            infoBoxIsReady.complete();
            this.infoBoxAlreadyDrawn = true;
        }, 200);
        return infoBoxIsReady;
    }
    static setValuesOnInfoBox(step) {
        const infoBoxElement = document.getElementById(this.infoBoxId);
        const idSpanElement = document.createElement('span');
        idSpanElement.textContent = step.id;
        idSpanElement.id = this.infoStepBoxContentElId;
        if (document.getElementById(this.infoStepBoxContentElId)) {
            infoBoxElement.removeChild(document.getElementById(this.infoStepBoxContentElId));
        }
        infoBoxElement.appendChild(idSpanElement);
    }
    static onNextStep() {
        this._$goToNextStep.next(true);
    }
    static updateClothSize() {
        const newSizes = this.getViewportSizes();
        document.getElementById(this.clothId).style.width = `${newSizes.width}px`;
        document.getElementById(this.clothId).style.height = `${newSizes.height}px`;
    }
    ////////////////////////////////////////////////////////////
    //  Instance methods
    ////////////////////////////////////////////////////////////
    canGoToNextStep() {
        return Drawer._$goToNextStep;
    }
}
Drawer.windowResizeListenerAttached = false;
Drawer._$goToNextStep = new rxjs_1.BehaviorSubject(false);
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
Drawer.nextStepBtnZindex = '999';
Drawer.nextStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-NEXT-STEP';
Drawer.infoStepBoxContentElId = 'HAZELINE-TUTORIAL-INFO-BOX-CONTENT';
exports.Drawer = Drawer;
//# sourceMappingURL=drawer.core.js.map