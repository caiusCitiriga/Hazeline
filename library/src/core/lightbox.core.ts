import Tether from 'tether';

import { Observable, Subject } from 'rxjs';

import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineTutorialStep } from './interfaces/tutorial-step.interface';
import { HazelineLightboxOptions } from './interfaces/tutorial-section.interface';
import { HazelineElementsDefaultStyles } from './consts/elements-default-styles.const';

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

    private ligthboxOptions: HazelineLightboxOptions = {
        positioning: {},
        lightboxWrapperCSS: {},
        lightboxTextWrapperCSS: {},
    };

    private nextBtnText: string;
    private prevBtnText: string;
    private lightboxText: string;

    public $nextStepRequired(): Observable<boolean> {
        return this._$nextStepRequired;
    }

    public $prevStepRequired(): Observable<boolean> {
        return this._$prevStepRequired;
    }

    public applyStyles(lightboxOpts: HazelineLightboxOptions): void {
        this.ligthboxOptions = lightboxOpts;
    }

    public dispose(): void {
        if (document.getElementById(HazelineElementsIds.lightbox)) {
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

    public updateLightboxPlacement(target: HTMLElement): void {
        const offset = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.offset
            ? this.ligthboxOptions.positioning.offset
            : HazelineElementsDefaultStyles.lightbox.positioning.offset;

        const attachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.attachment
            ? this.ligthboxOptions.positioning.attachment
            : HazelineElementsDefaultStyles.lightbox.positioning.attachment;

        const targetAttachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.targetAttachment
            ? this.ligthboxOptions.positioning.targetAttachment
            : HazelineElementsDefaultStyles.lightbox.positioning.targetAttachment;

        const constraints = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.constraints
            ? this.ligthboxOptions.positioning.constraints
            : HazelineElementsDefaultStyles.lightbox.positioning.constraints;

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
        this.lightboxText = sectionStep.text;

        this.lightboxTextWrp.innerHTML = this.lightboxText;
        this.lightboxPrevBtn.innerHTML = this.prevBtnText || 'Previous';
        this.lightboxNextBtn.innerHTML = isLastStep ? 'End' : this.nextBtnText || 'Next';
    }

    private attachNextPrevClickListeners(): void {
        this.lightboxPrevBtn.addEventListener('click', () => this._$prevStepRequired.next(true));
        this.lightboxNextBtn.addEventListener('click', () => this._$nextStepRequired.next(true));
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
        this.attachNextPrevClickListeners();
    }

    private styleWholeLigthboxElement(): void {
        HazelineStylesManager.styleElement<HTMLDivElement>(this.lightboxWrp, this.ligthboxOptions.lightboxWrapperCSS);
        HazelineStylesManager.styleElement<HTMLDivElement>(this.lightboxWrp, HazelineElementsDefaultStyles.lightbox.lightboxWrapperCSS);
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, HazelineElementsDefaultStyles.lightbox.lightboxNextBtnCSS);
        HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, HazelineElementsDefaultStyles.lightbox.lightboxPrevBtnCSS);
        HazelineStylesManager.styleElement<HTMLDivElement>(this.lightboxTextWrp, HazelineElementsDefaultStyles.lightbox.lightboxTextWrapperCSS);
        HazelineStylesManager.styleElement<HTMLDivElement>(this.lightboxControlsWrp, HazelineElementsDefaultStyles.lightbox.lightboxControlsWrapperCSS);

        //  Prev btn hover modes
        this.lightboxPrevBtn.addEventListener('mouseenter', () => {
            HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, HazelineElementsDefaultStyles.lightbox.lightboxPrevBtnHoverCSS);
        });
        this.lightboxPrevBtn.addEventListener('mouseleave', () => {
            HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxPrevBtn, HazelineElementsDefaultStyles.lightbox.lightboxPrevBtnCSS);
        });

        //  Next btn hover modes
        this.lightboxNextBtn.addEventListener('mouseenter', () => {
            HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, HazelineElementsDefaultStyles.lightbox.lightboxNextBtnHoverCSS);
        });
        this.lightboxNextBtn.addEventListener('mouseleave', () => {
            HazelineStylesManager.styleElement<HTMLButtonElement>(this.lightboxNextBtn, HazelineElementsDefaultStyles.lightbox.lightboxNextBtnCSS);
        });

    }
}