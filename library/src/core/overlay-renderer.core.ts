import { Subject, Observable } from 'rxjs';

import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineElementsDefaults } from './consts/elements-defaults.const';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';

import { HazelineStylesManager } from './styles-manager.core';
import { HazelineOverlayOptions } from './interfaces/hazeline-options.interface';
import { HazelineCSSRules } from './interfaces/css-rules.interface';

export class HazelineOverlayRenderer {

    private topBox: HTMLDivElement;
    private leftBox: HTMLDivElement;
    private rightBox: HTMLDivElement;
    private bottomBox: HTMLDivElement;
    private endTutorialBtn: HTMLButtonElement;
    private delayInProgressOverlay: HTMLDivElement;

    private backupProperties = {
        topBox: {
            opacity: null,
            transition: null,
        },
        leftBox: {
            opacity: null,
            transition: null,
        },
        rightBox: {
            opacity: null,
            transition: null,
        },
        bottomBox: {
            opacity: null,
            transition: null,
        },
    }

    private _$prematureEndRequired = new Subject<boolean>();
    private overlayOptions = HazelineElementsDefaults.overlay;

    private endTutorialBtnClickEvtListener = () => this._$prematureEndRequired.next(true);
    private endTutorialBtnMouseLeaveEvtListener = () => HazelineStylesManager.styleElement(this.endTutorialBtn, this.overlayOptions.endTutorialBtnCSS);
    private endTutorialBtnMouseEnterEvtListener = () => HazelineStylesManager.styleElement(this.endTutorialBtn, this.overlayOptions.endTutorialBtnHoverCSS);

    public $premartureEndRequired(): Observable<boolean> {
        return this._$prematureEndRequired;
    }

    public dispose(): void {
        this.detachEndTutorialBtnEventListeners();
        this.destroyPreviousElementsIfAny();
    }

    public hideCurrentOverlays(): void {
        this.backupPropertiesOfOverlayBoxes();
        this.fadeOutOverlayBoxes();
    }

    public showCurrentOverlays(): void {
        this.restorePropertiesOfOverlayBoxes();
    }

    public placeWaitForDelayOverlay(message: string, textColor: string): Observable<boolean> {
        const overlayShown = new Subject<boolean>();
        const delayInProgressCSS = <HazelineCSSRules>{
            zIndex: this.overlayOptions.overlayCSS.zIndex,
            top: '0',
            left: '0',
            opacity: '0',
            display: 'flex',
            color: textColor,
            fontSize: '30px',
            position: 'fixed',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`,
            transition: 'opacity 200ms ease-in-out',
            background: this.overlayOptions.overlayCSS.background,
        };

        this.hideCurrentOverlays();
        this.delayInProgressOverlay = document.createElement('div');
        (document.body as any).prepend(this.delayInProgressOverlay);
        this.delayInProgressOverlay = HazelineStylesManager.styleElement(this.delayInProgressOverlay, delayInProgressCSS);
        this.delayInProgressOverlay.id = HazelineElementsIds.waitForDelayOverlay;
        this.delayInProgressOverlay.innerHTML = message;

        setTimeout(() => {
            this.delayInProgressOverlay.style.opacity = '1';
            overlayShown.next(true);
        }, 220);

        return overlayShown;
    }

    public removeWaitForDelayOverlay(): void {
        if (!document.getElementById(HazelineElementsIds.waitForDelayOverlay)) {
            return;
        }

        document.body.removeChild(document.getElementById(HazelineElementsIds.waitForDelayOverlay));
        this.showCurrentOverlays();
        this.delayInProgressOverlay = null;
    }

    public placeEndTutorialButton(): void {
        this.createEndTutorialButton();
        this.applyEndTutorialBtnOptions();
        this.attachEndTutorialButtonToBody();
        this.attachEndTutorialBtnEventsListeners();
    }

    public removeEndTutorialButton(): void {
        if (!!document.getElementById(HazelineElementsIds.endTutorialButton)) {
            this.detachEndTutorialBtnEventListeners();
            document.body.removeChild(document.getElementById(HazelineElementsIds.endTutorialButton));
        }
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

        if (!this.topBox) {
            this.wrapElement(dimensions);
            this.backupPropertiesOfOverlayBoxes();
        }

        if (this.topBox.style.opacity === '0') {
            this.showCurrentOverlays();
        }

        this.applyOptionsOnElements({
            topBox: this.topBox,
            leftBox: this.leftBox,
            rightBox: this.rightBox,
            bottomBox: this.bottomBox,
        }, dimensions);

        this.applyEndTutorialBtnOptions();
    }

    public wrapElement(dimensions: HazelineWrappingElementsDimensions): void {
        this.destroyPreviousElementsIfAny();
        const wrappingElements = this.createWrappingElements(dimensions);
        this.attachElementsToBody(wrappingElements);
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

        // if (this.overlayOptions.topSideWrapOffset) {
        //     elements.topBox.style.top = `-${this.overlayOptions.topSideWrapOffset}px`;
        // }

        // if (this.overlayOptions.rightSideWrapOffset) {
        //     elements.rightBox.style.left = `unset`;
        //     elements.rightBox.style.right = `-${this.overlayOptions.rightSideWrapOffset}px`;
        //     elements.topBox.style.width = `${dimensions.topBox.width + this.overlayOptions.rightSideWrapOffset}px`;
        //     elements.bottomBox.style.width = `${dimensions.bottomBox.width + this.overlayOptions.rightSideWrapOffset}px`;
        // }

        // if (this.overlayOptions.bottomSideWrapOffset) {
        //     elements.bottomBox.style.top = `unset`;
        //     elements.bottomBox.style.bottom = `-${this.overlayOptions.bottomSideWrapOffset}px`;
        // }

        return elements;
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

    private backupPropertiesOfOverlayBoxes() {
        if (!this.topBox) {
            return;
        }

        this.backupProperties.topBox.opacity =
            this.topBox.style.opacity;
        this.backupProperties.topBox.transition =
            this.topBox.style.transition;
        this.backupProperties.leftBox.opacity =
            this.leftBox.style.opacity;
        this.backupProperties.leftBox.transition =
            this.leftBox.style.transition;
        this.backupProperties.rightBox.opacity =
            this.rightBox.style.opacity;
        this.backupProperties.rightBox.transition =
            this.rightBox.style.transition;
        this.backupProperties.bottomBox.opacity =
            this.bottomBox.style.opacity;
        this.backupProperties.bottomBox.transition =
            this.bottomBox.style.transition;
    }

    private restorePropertiesOfOverlayBoxes() {
        if (!this.topBox) {
            return;
        }

        this.topBox.style.opacity = this.backupProperties.topBox.opacity;
        this.topBox.style.transition = this.backupProperties.topBox.transition;

        this.leftBox.style.opacity = this.backupProperties.leftBox.opacity;
        this.leftBox.style.transition = this.backupProperties.leftBox.transition;

        this.rightBox.style.opacity = this.backupProperties.rightBox.opacity;
        this.rightBox.style.transition = this.backupProperties.rightBox.transition;

        this.bottomBox.style.opacity = this.backupProperties.bottomBox.opacity;
        this.bottomBox.style.transition = this.backupProperties.bottomBox.transition;

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

    private detachEndTutorialBtnEventListeners(): void {
        if (this.endTutorialBtn) {
            this.endTutorialBtn.removeEventListener('click', this.endTutorialBtnClickEvtListener);
            this.endTutorialBtn.removeEventListener('mouseleave', this.endTutorialBtnMouseLeaveEvtListener);
            this.endTutorialBtn.removeEventListener('mouseenter', this.endTutorialBtnMouseEnterEvtListener);
        }
    }

    private fadeOutOverlayBoxes() {
        if (!this.topBox) {
            return;
        }

        ['topBox', 'leftBox', 'rightBox', 'bottomBox']
            .forEach(k => (this[k] as HTMLDivElement).style.transition = 'opacity 200ms ease-in-out');
        setTimeout(() => ['topBox', 'leftBox', 'rightBox', 'bottomBox']
            .forEach(k => (this[k] as HTMLDivElement).style.opacity = '0'), 10);
    }
}

interface ElementsToAttachOnBody {
    topBox: HTMLDivElement;
    leftBox: HTMLDivElement;
    rightBox: HTMLDivElement;
    bottomBox: HTMLDivElement;
}