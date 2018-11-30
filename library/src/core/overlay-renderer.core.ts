import { Subject, Observable } from 'rxjs';

import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineElementsDefaults } from './consts/elements-defaults.const';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';

import { HazelineStylesManager } from './styles-manager.core';
import { HazelineOverlayOptions } from './interfaces/hazeline-options.interface';

export class HazelineOverlayRenderer {

    private topBox: HTMLDivElement;
    private leftBox: HTMLDivElement;
    private rightBox: HTMLDivElement;
    private bottomBox: HTMLDivElement;
    private endTutorialBtn: HTMLButtonElement;

    private _$prematureEndRequired = new Subject<boolean>();
    private overlayOptions = HazelineElementsDefaults.overlay;

    private endTutorialBtnClickEvtListener = () => this._$prematureEndRequired.next(true);
    private endTutorialBtnMouseLeaveEvtListener = () => HazelineStylesManager.styleElement(this.endTutorialBtn, this.overlayOptions.endTutorialBtnCSS);
    private endTutorialBtnMouseEnterEvtListener = () => HazelineStylesManager.styleElement(this.endTutorialBtn, this.overlayOptions.endTutorialBtnHoverCSS);

    public $premartureEndRequired(): Observable<boolean> {
        return this._$prematureEndRequired;
    }

    public placeEndTutorialButton(): void {
        this.createEndTutorialButton();
        this.applyEndTutorialBtnOptions();
        this.attachEndTutorialButtonToBody();
        this.attachEndTutorialBtnEventsListeners();
    }

    public dispose(): void {
        this.detachEventListeners();
        this.destroyPreviousElementsIfAny();
    }

    public setDynamicOptions(overlayOpts: HazelineOverlayOptions): void {
        if (!overlayOpts) {
            return;
        }

        Object.keys(overlayOpts).forEach(optsKey => {
            if (typeof overlayOpts[optsKey] === 'object') {
                this.overlayOptions[optsKey] = Object.assign({}, this.overlayOptions[optsKey], overlayOpts[optsKey]);
            }

            if (!!overlayOpts[optsKey] && typeof overlayOpts[optsKey] !== 'object') {
                this.overlayOptions[optsKey] = overlayOpts[optsKey];
            }
        });
    }

    public setGlobalOptions(overlayOpts: HazelineOverlayOptions): void {
        if (!overlayOpts) {
            return;
        }

        Object.keys(overlayOpts).forEach(optsKey => {
            if (typeof overlayOpts[optsKey] === 'object') {
                this.overlayOptions[optsKey] = Object.assign({}, HazelineElementsDefaults.overlay[optsKey], overlayOpts[optsKey]);
            }

            if (!!overlayOpts[optsKey] && typeof overlayOpts[optsKey] !== 'object') {
                this.overlayOptions[optsKey] = overlayOpts[optsKey];
            }
        });
    }

    public updateElementsDimensions(dimensions: HazelineWrappingElementsDimensions): void {
        this.topBox = document.getElementById(HazelineElementsIds.topBox) as HTMLDivElement;
        this.leftBox = document.getElementById(HazelineElementsIds.leftBox) as HTMLDivElement;
        this.rightBox = document.getElementById(HazelineElementsIds.rightBox) as HTMLDivElement;
        this.bottomBox = document.getElementById(HazelineElementsIds.bottomBox) as HTMLDivElement;

        if (!!this.topBox) {
            // If a box is null or undefined, we are using a textual overlay. So there's no need to 
            // apply options on elements. Event because it would end in a error.
            this.applyOptionsOnElements({
                topBox: this.topBox,
                leftBox: this.leftBox,
                rightBox: this.rightBox,
                bottomBox: this.bottomBox,
            }, dimensions);
        }

        this.applyEndTutorialBtnOptions();
    }

    public wrapElement(dimensions: HazelineWrappingElementsDimensions): void {
        this.destroyPreviousElementsIfAny();
        const wrappingElements = this.createWrappingElements(dimensions);
        this.attachElementsToBody(wrappingElements);
    }

    private attachElementsToBody(elements: ElementsToAttachOnBody): void {
        const body = document.querySelector('body');

        (body as any).prepend(elements.topBox); // not fully supported. See browser tables
        (body as any).prepend(elements.leftBox); // not fully supported. See browser tables
        (body as any).prepend(elements.rightBox); // not fully supported. See browser tables
        (body as any).prepend(elements.bottomBox); // not fully supported. See browser tables
    }

    private attachEndTutorialButtonToBody(): void {
        const body = document.querySelector('body');
        (body as any).prepend(this.endTutorialBtn); // not fully supported. See browser tables
    }

    private attachEndTutorialBtnEventsListeners(): void {
        this.endTutorialBtn.addEventListener('click', this.endTutorialBtnClickEvtListener);
        this.endTutorialBtn.addEventListener('mouseleave', this.endTutorialBtnMouseLeaveEvtListener);
        this.endTutorialBtn.addEventListener('mouseenter', this.endTutorialBtnMouseEnterEvtListener);
    }

    private detachEventListeners(): void {
        if (this.endTutorialBtn) {
            this.endTutorialBtn.removeEventListener('click', this.endTutorialBtnClickEvtListener);
            this.endTutorialBtn.removeEventListener('mouseleave', this.endTutorialBtnMouseLeaveEvtListener);
            this.endTutorialBtn.removeEventListener('mouseenter', this.endTutorialBtnMouseEnterEvtListener);
        }
    }

    private createEndTutorialButton(): void {
        this.endTutorialBtn = document.createElement('button');
        this.endTutorialBtn.id = HazelineElementsIds.endTutorialButton;
    }

    private createWrappingElements(dimensions: HazelineWrappingElementsDimensions): ElementsToAttachOnBody {
        this.topBox = document.createElement('div');
        this.leftBox = document.createElement('div');
        this.rightBox = document.createElement('div');
        this.bottomBox = document.createElement('div');

        const elements = this.applyOptionsOnElements({
            topBox: this.topBox,
            leftBox: this.leftBox,
            rightBox: this.rightBox,
            bottomBox: this.bottomBox,
        }, dimensions);

        this.applyEndTutorialBtnOptions();

        return elements;
    }

    private destroyPreviousElementsIfAny(): void {
        if (!!document.getElementById(HazelineElementsIds.topBox)) {
            document.body.removeChild(document.getElementById(HazelineElementsIds.topBox));
        }
        if (!!document.getElementById(HazelineElementsIds.leftBox)) {
            document.body.removeChild(document.getElementById(HazelineElementsIds.leftBox));
        }
        if (!!document.getElementById(HazelineElementsIds.rightBox)) {
            document.body.removeChild(document.getElementById(HazelineElementsIds.rightBox));
        }
        if (!!document.getElementById(HazelineElementsIds.bottomBox)) {
            document.body.removeChild(document.getElementById(HazelineElementsIds.bottomBox));
        }
        if (!!document.getElementById(HazelineElementsIds.endTutorialButton)) {
            document.body.removeChild(document.getElementById(HazelineElementsIds.endTutorialButton));
        }
    }

    private applyEndTutorialBtnOptions(): void {
        this.endTutorialBtn.innerHTML = this.overlayOptions.closeBtnText;
        HazelineStylesManager.styleElement(this.endTutorialBtn, this.overlayOptions.endTutorialBtnCSS);
    }

    private applyOptionsOnElements(elements: ElementsToAttachOnBody, dimensions: HazelineWrappingElementsDimensions): ElementsToAttachOnBody {
        elements.topBox.id = HazelineElementsIds.topBox;
        elements.leftBox.id = HazelineElementsIds.leftBox;
        elements.rightBox.id = HazelineElementsIds.rightBox;
        elements.bottomBox.id = HazelineElementsIds.bottomBox;
        elements.bottomBox.id = HazelineElementsIds.bottomBox;

        Object.keys(elements).forEach(el => {
            HazelineStylesManager.styleElement(elements[el], this.overlayOptions.overlayCSS);
        });


        elements.topBox.style.width = `${dimensions.topBox.width}px`;
        elements.topBox.style.height = `${dimensions.topBox.height}px`;
        elements.topBox.style.left = `${dimensions.topBox.offsetLeft}px`;

        elements.leftBox.style.width = `${dimensions.leftBox.width}px`;
        elements.leftBox.style.height = `${dimensions.leftBox.height}px`;

        elements.rightBox.style.width = `${dimensions.rightBox.width}px`;
        elements.rightBox.style.height = `${dimensions.rightBox.height}px`;
        elements.rightBox.style.left = `${dimensions.rightBox.offsetLeft}px`;

        elements.bottomBox.style.width = `${dimensions.bottomBox.width}px`;
        elements.bottomBox.style.height = `${dimensions.bottomBox.height}px`;
        elements.bottomBox.style.top = `${dimensions.bottomBox.offsetTop}px`;
        elements.bottomBox.style.left = `${dimensions.bottomBox.offsetLeft}px`;

        return elements;
    }
}

interface ElementsToAttachOnBody {
    topBox: HTMLDivElement;
    leftBox: HTMLDivElement;
    rightBox: HTMLDivElement;
    bottomBox: HTMLDivElement;
}