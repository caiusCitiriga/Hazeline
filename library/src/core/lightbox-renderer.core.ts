import Tether from 'tether';
import { Observable, Subject, BehaviorSubject, timer } from 'rxjs';

import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineTutorialStep } from './interfaces/tutorial-step.interface';
import { HazelineElementsDefaults } from './consts/elements-defaults.const';
import { HazelineLightboxOptions, HazelineTextualOverlayOptions } from './interfaces/hazeline-options.interface';

import { HazelineStylesManager } from './styles-manager.core';

export class HazelineLightboxRenderer {

    private _$eventTrigger = new Subject<{ type: HazelineEventTrigger }>();

    private tether: Tether;

    private lightboxWrp: HTMLDivElement;
    private lightboxTextWrp: HTMLDivElement;
    private lightboxNextBtn: HTMLButtonElement;
    private lightboxPrevBtn: HTMLButtonElement;
    private lightboxControlsWrp: HTMLDivElement;

    private lightboxNextBtnOriginalDisplayMode: string;
    private lightboxPrevBtnOriginalDisplayMode: string;

    private textualOverlay: HTMLDivElement;
    private textualOverlayParagraph: HTMLDivElement;

    private ligthboxOptions: HazelineLightboxOptions = HazelineElementsDefaults.lightbox;
    private textualOverlayOptions: HazelineTextualOverlayOptions = HazelineElementsDefaults.textualOverlay;

    //  User defined events listeners for this step
    private customNextBtnClickEvtListener: (evt: any) => void = undefined;
    private customPrevBtnClickEvtListener: (evt: any) => void = undefined;
    //  Hazeline's default events listeners for this step
    private nextBtnClickEvtListener = () => this._$eventTrigger.next({ type: HazelineEventTrigger.next });
    private prevBtnClickEvtListener = () => this._$eventTrigger.next({ type: HazelineEventTrigger.previous });

    private prevBtnMouseLeaveEvtListener = () =>
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.ligthboxOptions.lightboxPrevBtnCSS || HazelineElementsDefaults.lightbox.lightboxPrevBtnCSS);
    private prevBtnMouseEnterEvtListener = () =>
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.ligthboxOptions.lightboxPrevBtnHoverCSS || HazelineElementsDefaults.lightbox.lightboxPrevBtnHoverCSS);

    private nextBtnMouseLeaveEvtListener = () =>
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.ligthboxOptions.lightboxNextBtnCSS || HazelineElementsDefaults.lightbox.lightboxNextBtnCSS);
    private nextBtnMouseEnterEvtListener = () =>
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.ligthboxOptions.lightboxNextBtnHoverCSS || HazelineElementsDefaults.lightbox.lightboxNextBtnHoverCSS);


    public $eventTriggered(): Observable<{ type: HazelineEventTrigger }> { return this._$eventTrigger; }

    public attachCustomNextEventListenerOnElement(opts: CustomEventListenerOpts): void {
        this.customNextBtnClickEvtListener = (evt: any) => {
            opts.listener(evt, opts.step, opts.element)
                .then(() => this._$eventTrigger.next({ type: HazelineEventTrigger.next }))
                .catch(() => null);
        };

        opts.element.addEventListener(opts.event, this.customNextBtnClickEvtListener);
    }

    public detachCustomEventsListeners(opts: CustomEventListenerDetachOpts): void {
        if (this.customNextBtnClickEvtListener) {
            opts.element.removeEventListener(opts.event, this.customNextBtnClickEvtListener);
        }
        if (this.customPrevBtnClickEvtListener) {
            opts.element.removeEventListener(opts.event, this.customPrevBtnClickEvtListener);
        }
    }

    public disableNextPrevBtns(): void {
        this.lightboxNextBtnOriginalDisplayMode = this.lightboxNextBtn.style.display;
        this.lightboxPrevBtnOriginalDisplayMode = this.lightboxPrevBtn.style.display;

        this.lightboxNextBtn.style.display = 'none';
        this.lightboxPrevBtn.style.display = 'none';
    }

    public dispose(detachListeners = false): void {
        if (document.getElementById(HazelineElementsIds.lightbox)) {
            if (detachListeners) {
                this.detachNextPrevEventsListeneres();
                this.detachNextPrevHoverModesEventsListeners();
            }

            this.tether.disable();
            this.tether.destroy();
            this.tether = null;

            document.body.removeChild(this.lightboxWrp);
            this.lightboxWrp = null;
        }
    }

    public disposeTextualOverlay(detachListeners = false, fadeOutBeforeRemoving = false): Observable<boolean> {
        const elementRemoved = new Subject<boolean>();
        if (document.getElementById(HazelineElementsIds.lightboxTextualOverlay)) {
            if (detachListeners) {
                this.detachNextPrevHoverModesEventsListeners();
            }

            this.textualOverlay.removeEventListener('click', this.nextBtnClickEvtListener);

            //  Restore the original lightbox event listeners
            this.prevBtnMouseLeaveEvtListener = () =>
                HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.ligthboxOptions.lightboxPrevBtnCSS || HazelineElementsDefaults.lightbox.lightboxPrevBtnCSS);
            this.prevBtnMouseEnterEvtListener = () =>
                HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.ligthboxOptions.lightboxPrevBtnHoverCSS || HazelineElementsDefaults.lightbox.lightboxPrevBtnHoverCSS);

            this.nextBtnMouseLeaveEvtListener = () =>
                HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.ligthboxOptions.lightboxNextBtnCSS || HazelineElementsDefaults.lightbox.lightboxNextBtnCSS);
            this.nextBtnMouseEnterEvtListener = () =>
                HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.ligthboxOptions.lightboxNextBtnHoverCSS || HazelineElementsDefaults.lightbox.lightboxNextBtnHoverCSS);

            this.attachNextPrevEventsListeneres();
            this.attachNextPrevHoverModesEventsListeners();

            if (fadeOutBeforeRemoving) {
                this.textualOverlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(this.textualOverlay);
                    this.textualOverlay = null;
                    this.textualOverlayParagraph = null;
                    elementRemoved.next(true);
                }, this.textualOverlayOptions.bgFadeInTimeInMs || 0);
                return elementRemoved;
            }
            document.body.removeChild(this.textualOverlay);
            this.textualOverlay = null;
            this.textualOverlayParagraph = null;

            timer(10).subscribe(() => elementRemoved.next(true));
            return elementRemoved;
        }

        timer(10).subscribe(() => elementRemoved.next(true));
        return elementRemoved;
    }

    public enableNextPrevBtns(): void {
        this.lightboxNextBtn.style.display = !!this.lightboxNextBtnOriginalDisplayMode ? this.lightboxNextBtnOriginalDisplayMode : 'unset';
        this.lightboxPrevBtn.style.display = !!this.lightboxPrevBtnOriginalDisplayMode ? this.lightboxPrevBtnOriginalDisplayMode : 'unset';

        this.lightboxNextBtnOriginalDisplayMode = undefined;
        this.lightboxPrevBtnOriginalDisplayMode = undefined;
    }

    public hideLightbox(): void {
        this.lightboxWrp.style.opacity = '0';
    }

    public showLightbox(): void {
        this.lightboxWrp.style.opacity = '1';
    }

    public placeLightbox(target: HTMLElement, sectionStep: HazelineTutorialStep, isLastStep = false): void {
        this.lightboxWrp = document.getElementById(HazelineElementsIds.lightbox) as HTMLDivElement;

        if (!this.lightboxWrp) {
            this.createLightbox();
            (document.body as any).prepend(this.lightboxWrp); // not fully supported. See browser tables
        }

        this.applyTexts(sectionStep, isLastStep);
        this.styleWholeLigthboxElement();

        this.updateLightboxPlacement(target, sectionStep, isLastStep);
    }

    public placeTextOverlay(sectionStep: HazelineTutorialStep, isLastStep = false): Observable<boolean> {
        const overlayPlaced = new BehaviorSubject<boolean>(null);

        this.createLightboxButtons();
        this.setButttonsIds();
        this.lightboxPrevBtn.innerText = this.ligthboxOptions.prevBtnText;
        this.lightboxNextBtn.innerText = isLastStep ? this.ligthboxOptions.lastStepNextBtnText : this.ligthboxOptions.nextBtnText;
        this.lightboxNextBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.textualOverlayOptions.prevNextButtonsCSS);
        this.lightboxPrevBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.textualOverlayOptions.prevNextButtonsCSS);
        this.attachNextPrevEventsListeneres();

        this.textualOverlayParagraph = document.createElement('div');
        this.textualOverlayParagraph.innerHTML = sectionStep.text;
        this.textualOverlayParagraph = HazelineStylesManager.styleElement<HTMLDivElement>(this.textualOverlayParagraph, this.textualOverlayOptions.paragraphCSS);

        if (!this.textualOverlayOptions.disableTextFadeIn) {
            this.textualOverlayParagraph.style.transition = `all ${this.textualOverlayOptions.textFadeInTimeInMs}ms ease-in-out`;
            this.textualOverlayParagraph.style.transitionProperty = this.textualOverlayOptions.paragraphCSS.transitionProperty;
        }

        this.textualOverlay = document.createElement('div');
        this.textualOverlay.id = HazelineElementsIds.lightboxTextualOverlay;
        this.textualOverlay = HazelineStylesManager.styleElement<HTMLDivElement>(this.textualOverlay, this.textualOverlayOptions.overlayCSS);

        this.textualOverlay.style.width = '100%';
        this.textualOverlay.style.height = '100%';
        this.textualOverlay.style.zIndex = (+this.textualOverlay.style.zIndex + 1).toString();

        if (!this.textualOverlayOptions.disableBgFadeIn) {
            this.textualOverlay.style.transition = `all ${this.textualOverlayOptions.bgFadeInTimeInMs}ms ease-in-out`;
            this.textualOverlay.style.transitionProperty = this.textualOverlayOptions.overlayCSS.transitionProperty;
        }

        if (!this.textualOverlayOptions.hideButtons) {
            this.textualOverlay.appendChild(this.lightboxPrevBtn);
            this.textualOverlay.appendChild(this.textualOverlayParagraph);
            this.textualOverlay.appendChild(this.lightboxNextBtn);
        } else {
            this.textualOverlay.appendChild(this.textualOverlayParagraph);
        }

        if (this.textualOverlayOptions.hideButtons || this.textualOverlayOptions.clickAnywhereForNextStep) {
            //  remove previously added listener if any
            this.textualOverlay.removeEventListener('click', this.nextBtnClickEvtListener);
            this.textualOverlay.addEventListener('click', this.nextBtnClickEvtListener);
            this.textualOverlay.style.cursor = 'pointer';
        } else {
            this.textualOverlay.style.cursor = 'default';
        }

        this.dispose();
        (document.body as any).prepend(this.textualOverlay);

        setTimeout(() => {
            this.textualOverlay.style.opacity = this.textualOverlayOptions.overlayBgFadeInOpacity.toString();
            setTimeout(() => {
                this.textualOverlayParagraph.style.opacity = this.textualOverlayOptions.overlayParagraphFadeInOpacity.toString();

                this.prevBtnMouseEnterEvtListener = () =>
                    this.lightboxPrevBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.textualOverlayOptions.prevNextButtonsHoverCSS);
                this.nextBtnMouseEnterEvtListener = () =>
                    this.lightboxNextBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.textualOverlayOptions.prevNextButtonsHoverCSS);

                this.nextBtnMouseLeaveEvtListener = () =>
                    this.lightboxNextBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.textualOverlayOptions.prevNextButtonsCSS);
                this.prevBtnMouseLeaveEvtListener = () =>
                    this.lightboxPrevBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.textualOverlayOptions.prevNextButtonsCSS);
                this.attachNextPrevHoverModesEventsListeners();

                overlayPlaced.next(true);
                overlayPlaced.complete();
            },
                this.textualOverlayOptions.disableTextFadeIn
                    ? 0
                    : 10
            );
        },
            this.textualOverlayOptions.disableBgFadeIn
                ? 0
                : 10
        );

        return overlayPlaced;
    }

    public setLightboxDynamicOptions(opts: HazelineLightboxOptions): void {
        Object.keys(opts).forEach(optKey => {
            if (typeof opts[optKey] === 'object') {
                this.ligthboxOptions[optKey] = Object.assign({}, this.ligthboxOptions[optKey], opts[optKey]);
                return;
            }

            if (!!opts[optKey]) {
                this.ligthboxOptions[optKey] = opts[optKey];
            }

        });
    }

    public setTextualOverlayDynamicOptions(opts: HazelineTextualOverlayOptions): void {
        Object.keys(opts).forEach(optKey => {
            if (typeof opts[optKey] === 'object') {
                this.textualOverlayOptions[optKey] = Object.assign({}, this.textualOverlayOptions[optKey], opts[optKey]);
                return;
            }

            if (!!opts[optKey]) {
                this.textualOverlayOptions[optKey] = opts[optKey];
            }

        });
    }

    public setLightboxGlobalOptions(opts: HazelineLightboxOptions): void {
        Object.keys(opts).forEach(optKey => {
            if (typeof opts[optKey] === 'object') {
                this.ligthboxOptions[optKey] = Object.assign({}, HazelineElementsDefaults.textualOverlay[optKey], opts[optKey]);
                return;
            }

            if (!!opts[optKey]) {
                this.ligthboxOptions[optKey] = opts[optKey];
            }

        });
    }

    public setTextualOverlayGlobalOptions(opts: HazelineTextualOverlayOptions): void {
        Object.keys(opts).forEach(optKey => {
            if (typeof opts[optKey] === 'object') {
                this.textualOverlayOptions[optKey] = Object.assign({}, HazelineElementsDefaults.textualOverlay[optKey], opts[optKey]);
                return;
            }

            if (!!opts[optKey]) {
                this.textualOverlayOptions[optKey] = opts[optKey];
            }

        });
    }

    public updateLightboxPlacement(target: HTMLElement, step: HazelineTutorialStep, isLastStep = false): void {
        if (!!this.textualOverlay) {
            return;
        }
        if (!this.lightboxWrp) {
            this.placeLightbox(target, step, isLastStep);
            return;
        }

        const offset = this.ligthboxOptions.positioning.offset;
        const attachment = this.ligthboxOptions.positioning.attachment;
        const constraints = this.ligthboxOptions.positioning.constraints;
        const targetAttachment = this.ligthboxOptions.positioning.targetAttachment;

        if (!this.tether) {
            this.tether = new Tether({
                target: target,
                offset: offset,
                element: this.lightboxWrp,
                attachment: attachment,
                constraints: constraints,
                targetAttachment: targetAttachment,
            });
        } else {
            this.tether.setOptions({
                target: target,
                offset: offset,
                element: this.lightboxWrp,
                attachment: attachment,
                constraints: constraints,
                targetAttachment: targetAttachment,
            });
        }

        this.applyTexts(step, isLastStep);
        this.tether.position();
    }

    public updateTextualOverlayPlacement(): void {
        if (!this.textualOverlay) {
            return;
        }

        this.textualOverlay.style.width = `${window.innerWidth}px`;
        this.textualOverlay.style.height = `${window.innerHeight}px`;
    }

    private applyTexts(sectionStep: HazelineTutorialStep, isLastStep = false): void {
        this.lightboxTextWrp.innerHTML = sectionStep.text;
        this.lightboxPrevBtn.innerHTML = this.ligthboxOptions.prevBtnText;
        this.lightboxNextBtn.innerHTML = isLastStep
            ? this.ligthboxOptions.lastStepNextBtnText
            : this.ligthboxOptions.nextBtnText;
    }

    private attachNextPrevEventsListeneres(): void {
        this.lightboxPrevBtn.addEventListener('click', this.prevBtnClickEvtListener);
        this.lightboxNextBtn.addEventListener('click', this.nextBtnClickEvtListener);
    }

    private detachNextPrevEventsListeneres(): void {
        this.lightboxPrevBtn.removeEventListener('click', this.prevBtnClickEvtListener);
        this.lightboxNextBtn.removeEventListener('click', this.nextBtnClickEvtListener);
    }

    private attachNextPrevHoverModesEventsListeners(): void {
        //  Prev btn hover modes
        this.lightboxPrevBtn.addEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
        this.lightboxPrevBtn.addEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);

        //  Next btn hover modes
        this.lightboxNextBtn.addEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
        this.lightboxNextBtn.addEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
    }

    private detachNextPrevHoverModesEventsListeners(): void {
        //  Prev btn hover modes
        this.lightboxPrevBtn.removeEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
        this.lightboxPrevBtn.removeEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);

        //  Next btn hover modes
        this.lightboxNextBtn.removeEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
        this.lightboxNextBtn.removeEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
    }

    private createLightbox(): void {
        this.createLightboxWrappers();
        this.createLightboxButtons();
        this.setButttonsIds();
        this.setWrappersIds();

        //  Append the children 
        this.lightboxControlsWrp.appendChild(this.lightboxPrevBtn);
        this.lightboxControlsWrp.appendChild(this.lightboxNextBtn);

        //  Compose the final result
        this.lightboxWrp.appendChild(this.lightboxTextWrp);
        this.lightboxWrp.appendChild(this.lightboxControlsWrp);

        //  Finally attach the listeners for next and previous buttons
        this.attachNextPrevEventsListeneres();
        this.attachNextPrevHoverModesEventsListeners();
    }

    private createLightboxButtons(): void {
        this.lightboxNextBtn = document.createElement('button');
        this.lightboxPrevBtn = document.createElement('button');
    }

    private createLightboxWrappers(): void {
        this.lightboxWrp = document.createElement('div');
        this.lightboxTextWrp = document.createElement('div');
        this.lightboxControlsWrp = document.createElement('div');
    }

    private setButttonsIds(): void {
        this.lightboxNextBtn.id = HazelineElementsIds.lightboxNextButton;
        this.lightboxPrevBtn.id = HazelineElementsIds.lightboxPrevButton;
    }

    private setWrappersIds(): void {
        this.lightboxWrp.id = HazelineElementsIds.lightbox;
        this.lightboxTextWrp.id = HazelineElementsIds.lightboxText;
        this.lightboxControlsWrp.id = HazelineElementsIds.lightboxControls;
    }

    private styleWholeLigthboxElement(): void {
        HazelineStylesManager.styleElement<HTMLDivElement>(this.lightboxWrp, this.ligthboxOptions.lightboxWrapperCSS);
        HazelineStylesManager.styleElement<HTMLDivElement>(this.lightboxWrp, this.ligthboxOptions.lightboxWrapperCSS);
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.ligthboxOptions.lightboxNextBtnCSS);
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.ligthboxOptions.lightboxPrevBtnCSS);
        HazelineStylesManager.styleElement<HTMLDivElement>(this.lightboxTextWrp, this.ligthboxOptions.lightboxTextWrapperCSS);
        HazelineStylesManager.styleElement<HTMLDivElement>(this.lightboxControlsWrp, this.ligthboxOptions.lightboxControlsWrapperCSS);
    }
}

export enum HazelineEventTrigger {
    next,
    previous
}

export interface CustomEventListenerOpts {
    event: string,
    element: HTMLElement,
    step: HazelineTutorialStep,
    listener: (evt: Event, step: HazelineTutorialStep, element: HTMLElement) => Promise<boolean>
}

export interface CustomEventListenerDetachOpts {
    event: string,
    element: HTMLElement,
}