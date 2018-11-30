import Tether from 'tether';
import { Observable, Subject } from 'rxjs';

import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineTutorialStep } from './interfaces/tutorial-step.interface';
import { HazelineElementsDefaults } from './consts/elements-defaults.const';
import { HazelineLightboxOptions } from './interfaces/tutorial-section.interface';

import { HazelineStylesManager } from './styles-manager.core';

export class HazelineLightbox {

    private _$nextStepRequired = new Subject<boolean>();
    private _$prevStepRequired = new Subject<boolean>();

    private tether: Tether;

    private lightboxWrp: HTMLDivElement;
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

    public setOptions(opts: HazelineLightboxOptions): void {
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

    private applyTexts(sectionStep: HazelineTutorialStep, isLastStep = false): void {
        this.lightboxTextWrp.innerHTML = sectionStep.text;
        this.lightboxPrevBtn.innerHTML = this.ligthboxOptions.prevBtnText;
        this.lightboxNextBtn.innerHTML = isLastStep
            ? this.ligthboxOptions.lastStepNextBtnText
            : this.ligthboxOptions.nextBtnText;
    }

    private attachNextEventListeneres(): void {
        this.lightboxPrevBtn.addEventListener('click', this.prevBtnClickEvtListener);
        this.lightboxNextBtn.addEventListener('click', this.nextBtnClickEvtListener);

        //  Prev btn hover modes
        this.lightboxPrevBtn.addEventListener('mouseenter', this.prevBtnMouseEnterEvtListener);
        this.lightboxPrevBtn.addEventListener('mouseleave', this.prevBtnMouseLeaveEvtListener);

        //  Next btn hover modes
        this.lightboxNextBtn.addEventListener('mouseenter', this.nextBtnMouseEnterEvtListener);
        this.lightboxNextBtn.addEventListener('mouseleave', this.nextBtnMouseLeaveEvtListener);
    }

    private createLightbox(): void {
        //  Create the wrapper elements
        this.lightboxWrp = document.createElement('div');
        this.lightboxTextWrp = document.createElement('div');
        this.lightboxControlsWrp = document.createElement('div');

        //  Create the buttons
        this.lightboxNextBtn = document.createElement('button');
        this.lightboxPrevBtn = document.createElement('button');

        //  Set the ids
        this.lightboxWrp.id = HazelineElementsIds.lightbox;
        this.lightboxTextWrp.id = HazelineElementsIds.lightboxText;
        this.lightboxNextBtn.id = HazelineElementsIds.lightboxNextButton;
        this.lightboxControlsWrp.id = HazelineElementsIds.lightboxControls;

        //  Append the children 
        this.lightboxControlsWrp.appendChild(this.lightboxPrevBtn);
        this.lightboxControlsWrp.appendChild(this.lightboxNextBtn);

        //  Compose the final result
        this.lightboxWrp.appendChild(this.lightboxTextWrp);
        this.lightboxWrp.appendChild(this.lightboxControlsWrp);

        //  Finally attach the listeners for next and previous buttons
        this.attachNextEventListeneres();
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