import { Subject, Observable } from 'rxjs';

import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineElementsDefaultStyles } from './consts/elements-default-styles.const';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';

import { HazelineStylesManager } from './styles-manager.core';
import { HazelineCSSRules } from './interfaces/css-rules.interface';

export class HazelineOverlayRenderer {

    private topBox: HTMLDivElement;
    private leftBox: HTMLDivElement;
    private rightBox: HTMLDivElement;
    private bottomBox: HTMLDivElement;
    private endTutorialBtn: HTMLButtonElement;

    private overlayOptions: HazelineCSSRules;
    private _$prematureEndRequired = new Subject<boolean>();

    public $premartureEndRequired(): Observable<boolean> {
        return this._$prematureEndRequired;
    }

    public applyStyles(overlayOpts: HazelineCSSRules): void {
        this.overlayOptions = overlayOpts;
    }

    public dispose(): void {
        this.destroyPreviousElementsIfAny();
    }

    public updateElementsDimensions(dimensions: HazelineWrappingElementsDimensions): void {
        this.topBox = document.getElementById(HazelineElementsIds.topBox) as HTMLDivElement;
        this.leftBox = document.getElementById(HazelineElementsIds.leftBox) as HTMLDivElement;
        this.rightBox = document.getElementById(HazelineElementsIds.rightBox) as HTMLDivElement;
        this.bottomBox = document.getElementById(HazelineElementsIds.bottomBox) as HTMLDivElement;

        this.setElementsProperties({
            topBox: this.topBox,
            leftBox: this.leftBox,
            rightBox: this.rightBox,
            bottomBox: this.bottomBox,
        }, dimensions);
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
        (body as any).prepend(this.endTutorialBtn); // not fully supported. See browser tables
    }

    private createWrappingElements(dimensions: HazelineWrappingElementsDimensions): ElementsToAttachOnBody {
        this.topBox = document.createElement('div');
        this.leftBox = document.createElement('div');
        this.rightBox = document.createElement('div');
        this.bottomBox = document.createElement('div');
        this.endTutorialBtn = document.createElement('button');

        const elements = this.setElementsProperties({
            topBox: this.topBox,
            leftBox: this.leftBox,
            rightBox: this.rightBox,
            bottomBox: this.bottomBox,
        }, dimensions);

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

    private setElementsProperties(elements: ElementsToAttachOnBody, dimensions: HazelineWrappingElementsDimensions): ElementsToAttachOnBody {
        elements.topBox.id = HazelineElementsIds.topBox;
        elements.leftBox.id = HazelineElementsIds.leftBox;
        elements.rightBox.id = HazelineElementsIds.rightBox;
        elements.bottomBox.id = HazelineElementsIds.bottomBox;
        elements.bottomBox.id = HazelineElementsIds.bottomBox;
        this.endTutorialBtn.id = HazelineElementsIds.endTutorialButton;

        Object.keys(elements).forEach(el => {
            HazelineStylesManager.styleElement(elements[el], (HazelineElementsDefaultStyles as any).overlayBoxesInternalCommonData);
            if (this.overlayOptions) {
                HazelineStylesManager.styleElement(elements[el], this.overlayOptions);
            }
        });

        this.endTutorialBtn.innerHTML = 'End tutorial';
        this.endTutorialBtn.addEventListener('click', () => this._$prematureEndRequired.next(true));
        this.endTutorialBtn.addEventListener('mouseleave', () => HazelineStylesManager.styleElement(this.endTutorialBtn, HazelineElementsDefaultStyles.endTutorialBtnCSS));
        this.endTutorialBtn.addEventListener('mouseenter', () => HazelineStylesManager.styleElement(this.endTutorialBtn, HazelineElementsDefaultStyles.endTutorialBtnHoverCSS));
        HazelineStylesManager.styleElement(this.endTutorialBtn, HazelineElementsDefaultStyles.endTutorialBtnCSS);

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