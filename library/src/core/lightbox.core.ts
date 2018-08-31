import { CSSRules } from '../interfaces/css-rules';
import { Observable, BehaviorSubject } from 'rxjs';

export class HazelineLightbox {

    private lightbox: HTMLElement;
    private controlsWrapper: HTMLElement;
    private lightboxParagraph: HTMLElement;
    private lightboxControls: LigthboxControls;

    private ligthboxID = 'hazeline-lightbox';
    private paragraphID = 'hazeline-lightbox-ta';
    private nextControlBtnID = 'hazeline-next-ctrl';
    private prevControlBtnID = 'hazeline-prev-ctrl';
    private controlsWrapperID = 'hazeline-ctrls-wrp';

    private nextBtnText = 'Next';
    private prevBtnText = 'Previous';
    private paragraphText = '';

    private disablePrevBtn = false;
    private disableNextBtn = false;

    private lightboxCSS: CSSRules = {
        left: '0',
        right: '0',
        top: '2rem',
        padding: '8px',
        width: '250px',
        zIndex: '2001',
        margin: '0 auto',
        maxHeight: '200px',
        background: '#fff',
        position: 'absolute',
    };

    private lightboxParagraphCSS: CSSRules = {
        width: '98%',
        height: '80px',
        margin: '0 auto',
        display: 'block',
        paddingTop: '4px',
        overflowY: 'scroll',
        marginBottom: '8px',
        textAlign: 'center',
        borderRadius: '5px',
        position: 'relative',
        border: '1px solid #bababa',
    };

    private lightboxControlsWrapperCSS: CSSRules = {
        width: '100%',
        height: '35px',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-between',
    };

    private lightboxControlButtonsCSS: { next: CSSRules, prev: CSSRules } = {
        next: {
            display: 'block',
            width: '100px',
            height: '30px'
        },
        prev: {
            display: 'block',
            width: '100px',
            height: '30px'
        }
    };

    public onNextBtnClick: () => void;
    public onPrevBtnClick: () => void;

    //////////////////////////////////////
    //  Public methods
    //////////////////////////////////////
    public showLightbox(opts: LightboxOptions): Observable<boolean> {
        if (!!this.lightbox) {
            this.update(opts);
        }

        const lightboxShown = new BehaviorSubject(false);

        this.setOptions(opts);
        this.setStylesIfAny(opts);

        this.buildLightbox();
        document.querySelector('body').appendChild(this.lightbox);

        lightboxShown.next(true);
        lightboxShown.complete();

        return lightboxShown;
    }


    //////////////////////////////////////
    //  Private methods
    //////////////////////////////////////
    private setStylesIfAny(opts: LightboxOptions): void {
        if (opts.lightboxCSS) {
            this.lightboxCSS = opts.lightboxCSS;
        }
        if (opts.paragraphCSS) {
            this.lightboxParagraphCSS = opts.paragraphCSS;
        }
        if (opts.controlButtonsWrapperCSS) {
            this.lightboxControlsWrapperCSS = opts.controlButtonsWrapperCSS;
        }
        if (opts.controlButtonsCSS && opts.controlButtonsCSS.next) {
            this.lightboxControlButtonsCSS.next = opts.controlButtonsCSS.next;
        }
        if (opts.controlButtonsCSS && opts.controlButtonsCSS.prev) {
            this.lightboxControlButtonsCSS.prev = opts.controlButtonsCSS.prev;
        }
    }

    private update(opts): void {
        this.setOptions(opts);
        this.lightboxParagraph.innerText = this.paragraphText;
        (this.lightboxControls.next as HTMLButtonElement).disabled = this.disableNextBtn;
        (this.lightboxControls.prev as HTMLButtonElement).disabled = this.disablePrevBtn;
    }

    private setOptions(opts: LightboxOptions): void {
        this.paragraphText = opts.text;
        this.disableNextBtn = opts.disableNext;
        this.disablePrevBtn = opts.disablePrev;
    }

    private buildLightbox(): void {
        if (!!this.lightbox) {
            return;
        }

        this.lightbox = document.createElement('div');
        this.lightbox.setAttribute('id', this.ligthboxID);
        this.lightbox = this.applyStyles(this.lightbox, this.lightboxCSS);

        this.attachParagraph();
        this.attachControlButtons();
    }

    private attachParagraph(): void {
        this.buildParagraph();
        this.lightbox.appendChild(this.lightboxParagraph);
    }

    private buildParagraph(): void {
        this.lightboxParagraph = document.createElement('p');
        this.lightboxParagraph.innerText = this.paragraphText;
        this.lightboxParagraph.setAttribute('id', this.paragraphID);
        this.lightboxParagraph = this.applyStyles(this.lightboxParagraph, this.lightboxParagraphCSS);
    }

    private attachControlButtons(): void {
        if (this.controlsWrapper && this.lightboxControls.next && this.lightboxControls.prev) {
            return;
        }

        this.buildControlsWrapper();
        this.buildLigthboxControls();
        this.controlsWrapper.appendChild(this.lightboxControls.prev);
        this.controlsWrapper.appendChild(this.lightboxControls.next);

        this.lightbox.appendChild(this.controlsWrapper);
    }

    private buildLigthboxControls(): void {
        const nextBtn = document.createElement('button');
        nextBtn.innerText = this.nextBtnText;
        nextBtn.setAttribute('id', this.nextControlBtnID);
        nextBtn.addEventListener('click', () => this.onNextBtnClick());
        nextBtn.disabled = this.disableNextBtn;

        const prevBtn = document.createElement('button');
        prevBtn.innerText = this.prevBtnText;
        prevBtn.setAttribute('id', this.prevControlBtnID);
        prevBtn.addEventListener('click', () => this.onPrevBtnClick());
        prevBtn.disabled = this.disablePrevBtn;

        this.lightboxControls = {
            next: this.applyStyles(nextBtn, this.lightboxControlButtonsCSS.next),
            prev: this.applyStyles(prevBtn, this.lightboxControlButtonsCSS.prev),
        };
    }

    private buildControlsWrapper(): void {
        this.controlsWrapper = document.createElement('div');
        this.controlsWrapper.setAttribute('id', this.controlsWrapperID);
        this.controlsWrapper = this.applyStyles(this.controlsWrapper, this.lightboxControlsWrapperCSS);
    }

    private applyStyles(element: HTMLElement, styles: CSSRules): HTMLElement {
        Object.keys(styles).forEach(k => {
            element.style[k] = styles[k];
        });

        return element;
    }
}

export interface LightboxOptions {
    lightboxCSS?: CSSRules;
    paragraphCSS?: CSSRules;
    controlButtonsCSS?: {
        next?: CSSRules,
        prev?: CSSRules
    };
    controlButtonsWrapperCSS?: CSSRules;

    text: string;
    disableNext?: boolean;
    disablePrev?: boolean;
}

export interface LigthboxControls {
    next: HTMLElement,
    prev: HTMLElement,
}