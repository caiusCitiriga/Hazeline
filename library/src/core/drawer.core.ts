import $ from 'jquery';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, filter, tap, debounceTime } from 'rxjs/operators';

import { SectionStep } from "../interfaces/section-step.interface";

export class Drawer {

    private static viewportSizes: ViewportSizes;
    private static windowResizeListenerAttached = false;
    private static _$goToNextStep: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
    private static infoBoxZIndex = '999';
    private static infoBoxAlreadyDrawn = false;
    private static infoBoxId = 'HAZELINE-TUTORIAL-INFO-BOX';
    private static nextStepBtnZindex = '999';
    private static nextStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-NEXT-STEP';
    private static infoStepBoxContentElId = 'HAZELINE-TUTORIAL-INFO-BOX-CONTENT';

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
        cloth.style.position = 'absolute';
        cloth.style.zIndex = this.clothZIndex;
        cloth.style.background = 'rgba(0,0,0,0.8)';
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

    public static drawStep(step: SectionStep): Observable<boolean> {
        this.bringToFrontHTMLElement(step)
            .pipe(
                filter(elementIsReady => !!elementIsReady),
                switchMap(() => this.drawTutorialStepInfoBox(step)),
        )
            .subscribe();

        return this._$goToNextStep;
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

    private static restorePreviousElementStatus(): Observable<boolean> {
        const elementStatusRestored: BehaviorSubject<boolean> = new BehaviorSubject(false);

        const element = $(this.prevElSelector);
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

    private static drawTutorialStepInfoBox(step: SectionStep): Observable<boolean> {
        const infoBoxIsReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
        if (this.infoBoxAlreadyDrawn) {
            $(this.infoBoxId).fadeOut();
            this.setValuesOnInfoBox(step);
            $(this.infoBoxId).fadeIn();

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

        $('body').append(infoBoxElement);
        this.setValuesOnInfoBox(step);

        setTimeout(() => {
            infoBoxElement.style.opacity = '1';
            infoBoxIsReady.next(true);
            infoBoxIsReady.complete();
            this.infoBoxAlreadyDrawn = true;
        }, 200);

        return infoBoxIsReady;
    }

    private static setValuesOnInfoBox(step: SectionStep): void {
        const infoBoxElement = document.getElementById(this.infoBoxId);
        const idSpanElement = document.createElement('span');

        idSpanElement.textContent = step.id;
        idSpanElement.id = this.infoStepBoxContentElId;

        if (document.getElementById(this.infoStepBoxContentElId)) {
            infoBoxElement.removeChild(document.getElementById(this.infoStepBoxContentElId));
        }

        infoBoxElement.appendChild(idSpanElement);
    }

    private static onNextStep(): void {
        this._$goToNextStep.next(true);
    }

    private static updateClothSize(): void {
        const newSizes = this.getViewportSizes();

        document.getElementById(this.clothId).style.width = `${newSizes.width}px`;
        document.getElementById(this.clothId).style.height = `${newSizes.height}px`;
    }

    ////////////////////////////////////////////////////////////
    //  Instance methods
    ////////////////////////////////////////////////////////////
    public canGoToNextStep(): Observable<boolean> {
        return Drawer._$goToNextStep;
    }
}

interface ViewportSizes {
    width: number;
    height: number;
}
