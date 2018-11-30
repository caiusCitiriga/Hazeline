import Tether from 'tether';
import { Observable, Subject } from 'rxjs';

import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineTutorialStep } from './interfaces/tutorial-step.interface';
import { HazelineElementsDefaults } from './consts/elements-defaults.const';

import { HazelineStylesManager } from './styles-manager.core';
import { HazelineLightboxOptions } from './interfaces/hazeline-options.interface';
import { HazelineCSSRules } from './interfaces/css-rules.interface';

export class HazelineLightboxRenderer {

    private _$nextStepRequired = new Subject<boolean>();
    private _$prevStepRequired = new Subject<boolean>();

    private tether: Tether;

    private lightboxWrp: HTMLDivElement;
    private textualOverlay: HTMLDivElement;
    private lightboxTextWrp: HTMLDivElement;
    private lightboxNextBtn: HTMLButtonElement;
    private lightboxPrevBtn: HTMLButtonElement;
    private lightboxControlsWrp: HTMLDivElement;
    private ligthboxOptions: HazelineLightboxOptions = HazelineElementsDefaults.lightbox;

    private prevBtnClickEvtListener = () =>
        this._$prevStepRequired.next(true);
    private nextBtnClickEvtListener = () =>
        this._$nextStepRequired.next(true);

    private prevBtnMouseLeaveEvtListener = () =>
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.ligthboxOptions.lightboxPrevBtnCSS || HazelineElementsDefaults.lightbox.lightboxPrevBtnCSS);
    private prevBtnMouseEnterEvtListener = () =>
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, this.ligthboxOptions.lightboxPrevBtnHoverCSS || HazelineElementsDefaults.lightbox.lightboxPrevBtnHoverCSS);

    private nextBtnMouseLeaveEvtListener = () =>
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.ligthboxOptions.lightboxNextBtnCSS || HazelineElementsDefaults.lightbox.lightboxNextBtnCSS);
    private nextBtnMouseEnterEvtListener = () =>
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, this.ligthboxOptions.lightboxNextBtnHoverCSS || HazelineElementsDefaults.lightbox.lightboxNextBtnHoverCSS);

    public $nextStepRequired(): Observable<boolean> { return this._$nextStepRequired; }
    public $prevStepRequired(): Observable<boolean> { return this._$prevStepRequired; }

    public dispose(): void {
        if (document.getElementById(HazelineElementsIds.lightbox)) {
            this.lightboxPrevBtn.removeEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
            this.lightboxPrevBtn.removeEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);
            this.lightboxNextBtn.removeEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
            this.lightboxNextBtn.removeEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);

            this.tether.disable();
            this.tether.destroy();
            this.tether = null;

            document.body.removeChild(this.lightboxWrp);
        }
    }

    public disposeTextualOverlay(): void {
        if (document.getElementById(HazelineElementsIds.lightboxTextualOverlay)) {
            this.lightboxPrevBtn.removeEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
            this.lightboxPrevBtn.removeEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);
            this.lightboxNextBtn.removeEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
            this.lightboxNextBtn.removeEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);

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

            document.body.removeChild(this.textualOverlay);
            this.textualOverlay = null;
        }
    }

    public placeLightbox(target: HTMLElement, sectionStep: HazelineTutorialStep, isLastStep = false): void {
        this.lightboxWrp = document.getElementById(HazelineElementsIds.lightbox) as HTMLDivElement;

        if (!this.lightboxWrp) {
            this.createLightbox();
            (document.body as any).prepend(this.lightboxWrp); // not fully supported. See browser tables
        }

        this.applyTexts(sectionStep, isLastStep);
        this.styleWholeLigthboxElement();

        this.updateLightboxPlacement(target);
    }

    public placeTextOverlay(sectionStep: HazelineTutorialStep, isLastStep = false): Observable<boolean> {
        const overlayPlaced = new Subject<boolean>();
        const buttonsStyle = <HazelineCSSRules>{
            width: '150px',
            color: '#fff',
            opacity: '.3',
            height: '80px',
            fontSize: '20px',
            cursor: 'pointer',
            lineHeight: '50px',
            textAlign: 'center',
            border: '2px solid #ff7a00',
            backgroundColor: 'transparent',
            transition: 'all 200ms ease-in-out',
        };
        const buttonsHoverStyle = <HazelineCSSRules>{
            opacity: '1'
        };
        const overlayStyle = <HazelineCSSRules>{
            top: '0',
            left: '0',
            opacity: '0',
            display: 'flex',
            fontSize: '30px',
            position: 'fixed',
            paddingLeft: '8px',
            paddingRight: '8px',
            textAlign: 'center',
            color: 'transparent',
            alignItems: 'center',
            background: 'rgba(0,0,0,.93)',
            width: `${window.innerWidth}px`,
            justifyContent: 'space-between',
            height: `${window.innerHeight}px`,
            transition: 'all 120ms ease-in-out',
            transitionProperty: 'color, opacity',
            lineHeight: `${window.innerHeight.toString()}px`,
            zIndex: HazelineElementsDefaults.overlay.overlayCSS.zIndex,
        };

        this.createLightboxButtons();
        this.setButttonsIds();
        this.lightboxPrevBtn.innerText = this.ligthboxOptions.prevBtnText;
        this.lightboxNextBtn.innerText = isLastStep ? this.ligthboxOptions.lastStepNextBtnText : this.ligthboxOptions.nextBtnText;
        this.lightboxNextBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, buttonsStyle);
        this.lightboxPrevBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, buttonsStyle);
        this.attachNextPrevEventsListeneres();

        const text = document.createElement('p');
        text.innerText = sectionStep.text;

        this.textualOverlay = document.createElement('div');
        this.textualOverlay.id = HazelineElementsIds.lightboxTextualOverlay;
        this.textualOverlay = HazelineStylesManager.styleElement<HTMLDivElement>(this.textualOverlay, overlayStyle);

        this.textualOverlay.appendChild(this.lightboxPrevBtn);
        this.textualOverlay.appendChild(text);
        this.textualOverlay.appendChild(this.lightboxNextBtn);


        this.dispose();
        (document.body as any).prepend(this.textualOverlay);
        setTimeout(() => this.textualOverlay.style.opacity = '1', 300);
        setTimeout(() => {
            this.textualOverlay.style.color = '#fff';

            this.prevBtnMouseEnterEvtListener = () =>
                this.lightboxPrevBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, buttonsHoverStyle);
            this.nextBtnMouseEnterEvtListener = () =>
                this.lightboxNextBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, buttonsHoverStyle);
            this.nextBtnMouseLeaveEvtListener = () =>
                this.lightboxNextBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, buttonsStyle);
            this.prevBtnMouseLeaveEvtListener = () =>
                this.lightboxPrevBtn = HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, buttonsStyle);
            this.attachNextPrevHoverModesEventsListeners();

            overlayPlaced.next(true);
        }, 1000);

        return overlayPlaced;
    }

    public setDynamicOptions(opts: HazelineLightboxOptions): void {
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

    public setGlobalOptions(opts: HazelineLightboxOptions): void {
        Object.keys(opts).forEach(optKey => {
            if (typeof opts[optKey] === 'object') {
                this.ligthboxOptions[optKey] = Object.assign({}, HazelineElementsDefaults.lightbox[optKey], opts[optKey]);
                return;
            }

            if (!!opts[optKey]) {
                this.ligthboxOptions[optKey] = opts[optKey];
            }

        });
    }

    public updateLightboxPlacement(target: HTMLElement): void {
        if (!!this.textualOverlay) {
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

        this.tether.position();
    }

    public updateTextualOverlayPlacement(): void {
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

    private attachNextPrevHoverModesEventsListeners(): void {
        //  Prev btn hover modes
        this.lightboxPrevBtn.addEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
        this.lightboxPrevBtn.addEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);

        //  Next btn hover modes
        this.lightboxNextBtn.addEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
        this.lightboxNextBtn.addEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
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