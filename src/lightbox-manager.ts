import { IHazeTourStep } from './tour-manager';

export interface IHazeLightboxManagerOpts {
    debug?: boolean;
    lightboxZIndex?: number;
    /**
     * TODO: in readme specify that the user has to set the desired final display setting.
     * because that will be used when positioning the lightbox
     */
    lightboxCSSDisplayMode?: string;
    lightboxPositioningOffset?: number;
    unknownPositioningFallback?: 'left' | 'above' | 'below' | 'right';

    nextBtnText?: string;
    previousBtnText?: string;
}

export class HazeLightboxManager {

    private readonly NEXT_BTN_ID = 'hazeNextBtn';
    private readonly PREV_BTN_ID = 'hazePrevBtn';
    private readonly LIGHTBOX_ID = 'hazeLightbox';
    private readonly STEP_TITLE_ID = 'hazeLightboxTitle';
    private readonly STEP_MESSAGE_ID = 'hazeLightboxMessage';

    private attachAttempts = 0;
    private transitionTime = 220;
    private lightboxZIndex = 9000;
    private maxAttachAttempts = 10;
    private targetElement: HTMLElement;
    private currentStep: IHazeTourStep;

    private onNextStepBtnClickCB: () => Promise<void>;
    private onPrevStepBtnClickCB: () => Promise<void>;

    constructor(
        private targetSelector: string,
        private lightbox?: HTMLDivElement,
        private readonly opts?: IHazeLightboxManagerOpts,
    ) {
        if (this.opts && this.opts.lightboxZIndex) {
            this.lightboxZIndex = this.opts.lightboxZIndex;
        }

        if (!this.lightbox) {
            this.lightbox = this.generateDefaultLightbox();
        }
        this.validateLightbox();
    }

    set onNextClick(cb: () => Promise<void>) {
        this.onNextStepBtnClickCB = cb;
    }

    set onPrevClick(cb: () => Promise<void>) {
        this.onPrevStepBtnClickCB = cb;
    }

    async setTargetSelector(selector: string): Promise<void> {
        this.targetSelector = selector;
        return Promise.resolve();
    }

    setLightbox(lightbox: HTMLDivElement): void {
        this.lightbox = lightbox;
        this.validateLightbox();
    }

    async attachToElement(currentStep: IHazeTourStep): Promise<void> {
        if (!this.targetSelector) {
            throw new Error('[HazeLightboxManager] No target element defined');
        }
        if (!currentStep) {
            throw new Error('[HazeLightboxManager] No current step can be found');
        }

        this.clearPreviousStepTexts();
        this.currentStep = currentStep;

        this.targetElement = document.querySelector(this.targetSelector);
        if (!this.targetElement && this.attachAttempts < this.maxAttachAttempts) {
            await new Promise(r => setTimeout(() => r(), 100));
            this.attachAttempts++;
            return this.attachToElement(currentStep);
        } else if (!this.targetElement && this.attachAttempts === this.maxAttachAttempts) {
            throw new Error(`[HazeLightboxManager] Max attach attempts reached without finding the element`);
        }

        if (this.opts && this.opts.debug) {
            this.targetElement.style.border = '1px solid red';
        }

        this.detectBestPosition();
        return Promise.resolve();
    }

    async fadeOut(): Promise<void> {
        this.lightbox.style.transition = this.lightbox.style.transition
            ? this.lightbox.style.transition
            : `opacity ${this.transitionTime}ms ease-in-out`;

        this.lightbox.style.opacity = `0`;
        return new Promise(r => setTimeout(() => r(), this.transitionTime));
    }

    async fadeIn(): Promise<void> {
        this.lightbox.style.transition = this.lightbox.style.transition
            ? this.lightbox.style.transition
            : `opacity ${this.transitionTime}ms ease-in-out`;

        this.lightbox.style.opacity = `1`;
        return new Promise(r => setTimeout(() => r(), this.transitionTime));
    }

    private generateDefaultLightbox(): HTMLDivElement {
        const lightbox = document.createElement('div');
        lightbox.id = this.LIGHTBOX_ID;
        lightbox.style.width = '350px';
        lightbox.style.padding = '10px';
        lightbox.style.display = 'flex';
        lightbox.style.borderRadius = '12px';
        lightbox.style.backgroundColor = '#fff';
        lightbox.style.flexDirection = 'column';
        lightbox.style.justifyContent = 'flex-end';
        lightbox.style.boxShadow = '0px 3px 12px -8px #000';
        lightbox.style.zIndex = this.lightboxZIndex.toString();

        // generate the buttons
        const buttonsWrp = document.createElement('div');
        const nextBtn = document.createElement('button');
        const previousBtn = document.createElement('button');

        nextBtn.id = this.NEXT_BTN_ID;
        previousBtn.id = this.PREV_BTN_ID;

        nextBtn.innerHTML = this.opts && this.opts.nextBtnText ? this.opts.nextBtnText : '<span>Next</span>';
        previousBtn.innerHTML = this.opts && this.opts.previousBtnText ? this.opts.previousBtnText : '<span>Previous</span>';
        const btnStyle = {
            height: '36px',
            width: '110px',
            lineHeight: '0',
            display: 'flex',
            fontSize: '22px',
            color: '#0069d9',
            borderRadius: '5px',
            alignItems: 'center',
            backgroundColor: '#fff',
            justifyContent: 'center',
            border: '2px solid #0062cc',
            transition: 'all 120ms ease-in-out',
        }
        Object.keys(btnStyle).forEach(k => {
            nextBtn.style[k] = btnStyle[k];
            previousBtn.style[k] = btnStyle[k];
        });

        nextBtn.onmouseout = () => { nextBtn.style.color = '#0069d9'; nextBtn.style.backgroundColor = '#fff'; };
        nextBtn.onmouseover = () => { nextBtn.style.color = '#fff'; nextBtn.style.backgroundColor = '#0069d9'; };
        previousBtn.onmouseout = () => { previousBtn.style.color = '#0069d9'; previousBtn.style.backgroundColor = '#fff'; };
        previousBtn.onmouseover = () => { previousBtn.style.color = '#fff'; previousBtn.style.backgroundColor = '#0069d9'; };

        buttonsWrp.style.width = '100%';
        buttonsWrp.style.display = 'flex';
        buttonsWrp.style.justifyContent = 'space-between';
        buttonsWrp.appendChild(previousBtn);
        buttonsWrp.appendChild(nextBtn);

        lightbox.appendChild(buttonsWrp);

        return lightbox;
    }

    private detectBestPosition() {
        const lightboxVisiblityConfigs = {
            above: () => {
                this.positionLightbox('above', true);
                return this.isInViewport(this.lightbox);
            },
            below: () => {
                this.positionLightbox('below', false);
                return this.isInViewport(this.lightbox);
            },
            left: () => {
                this.positionLightbox('left', false);
                return this.isInViewport(this.lightbox);
            },
            right: () => {
                this.positionLightbox('right', false);
                return this.isInViewport(this.lightbox);
            }
        };

        if (lightboxVisiblityConfigs.below()) {
            this.positionLightbox('below');
            return;
        }
        if (lightboxVisiblityConfigs.above()) {
            this.positionLightbox('above');
            return;
        }
        if (lightboxVisiblityConfigs.left()) {
            this.positionLightbox('left');
            return;
        }
        if (lightboxVisiblityConfigs.right()) {
            this.positionLightbox('right');
            return;
        }
        if (
            !lightboxVisiblityConfigs.right() &&
            !lightboxVisiblityConfigs.left() &&
            !lightboxVisiblityConfigs.above() &&
            !lightboxVisiblityConfigs.below()
        ) {
            this.positionLightbox(this.opts && this.opts.unknownPositioningFallback ? this.opts.unknownPositioningFallback : 'below');
            return;
        }
    }

    /**
     * https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
     */
    private isInViewport(el: HTMLElement): boolean {
        const bounding = el.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    private positionLightbox(side: 'left' | 'above' | 'below' | 'right', dryRun?: boolean) {
        const offset = this.opts && this.opts.lightboxPositioningOffset ? this.opts.lightboxPositioningOffset : 10;
        const targetBounds = this.targetElement.getBoundingClientRect();

        // append the lightbox to get access to the bounding client rect, but set it "invisible"
        this.lightbox.style.visibility = 'hidden';
        this.lightbox.style.position = 'absolute';
        this.lightbox.style.zIndex = this.lightbox.style.zIndex ? this.lightbox.style.zIndex : this.lightboxZIndex.toString();
        this.lightbox.style.display = this.opts && this.opts.lightboxCSSDisplayMode ? this.opts.lightboxCSSDisplayMode : 'block';

        document.body.appendChild(this.lightbox);
        const lightboxBounds = this.lightbox.getBoundingClientRect();

        switch (side) {
            case 'above':
                this.lightbox.style.top = `${((targetBounds.y) - offset) - lightboxBounds.height}px`;
                this.lightbox.style.left = `${(targetBounds.x + (targetBounds.width / 2)) - lightboxBounds.width / 2}px`;
                break;
            case 'below':
                this.lightbox.style.top = `${((targetBounds.y + targetBounds.height) + offset)}px`;
                this.lightbox.style.left = `${(targetBounds.x + (targetBounds.width / 2)) - lightboxBounds.width / 2}px`;
                break;
            case 'left':
                this.lightbox.style.top = `${targetBounds.y + (targetBounds.height / 2) - (lightboxBounds.height / 2)}px`;
                this.lightbox.style.left = `${(targetBounds.x - lightboxBounds.width) - offset}px`;
                break;
            case 'right':
                this.lightbox.style.top = `${targetBounds.y + (targetBounds.height / 2) - (lightboxBounds.height / 2)}px`;
                this.lightbox.style.left = `${(targetBounds.x + targetBounds.width) + offset}px`;
                break;
        }

        this.applyStepTexts();
        this.attachPrevNextEventsListeners();

        if (!dryRun) {
            this.lightbox.style.visibility = 'visible';
        }

    }

    private attachPrevNextEventsListeners(): void {
        const nextBtnEl = this.lightbox.querySelector(`#${this.NEXT_BTN_ID}`) as HTMLElement;
        if (!this.currentStep.lightbox || !this.currentStep.lightbox.hideNextBtn || !nextBtnEl) {
            nextBtnEl.style.visibility = 'visible';
            nextBtnEl.onclick = async e => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                await this.onNextStepBtnClickCB();
            }
        } else if (!!this.currentStep.lightbox && !!this.currentStep.lightbox.hideNextBtn && !!nextBtnEl) {
            nextBtnEl.onclick = () => null;
            nextBtnEl.style.visibility = 'hidden';
        }

        const prevBtnEl = this.lightbox.querySelector(`#${this.PREV_BTN_ID}`) as HTMLElement;
        if (!this.currentStep.lightbox || !this.currentStep.lightbox.hidePrevBtn || !prevBtnEl) {
            prevBtnEl.style.visibility = 'visible';
            prevBtnEl.onclick = async e => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                await this.onPrevStepBtnClickCB();
            }
        } else if (!!this.currentStep.lightbox && !!this.currentStep.lightbox.hidePrevBtn && !!prevBtnEl) {
            prevBtnEl.onclick = () => null;
            prevBtnEl.style.visibility = 'hidden';
        }
    }

    private clearPreviousStepTexts(): void {
        if (!this.currentStep || !this.currentStep.lightbox) { return; }

        const titleElement = this.lightbox.querySelector(`#${this.STEP_TITLE_ID}`) as HTMLElement;
        titleElement.innerHTML = '';

        const messageElement = this.lightbox.querySelector(`#${this.STEP_MESSAGE_ID}`) as HTMLHtmlElement;
        messageElement.innerHTML = '';
    }

    private applyStepTexts(): void {
        if (!this.currentStep.lightbox) { return; }

        const titleElement = this.lightbox.querySelector(`#${this.STEP_TITLE_ID}`) as HTMLElement;
        if (!this.currentStep.lightbox.stepTitle) {
            titleElement.style.visibility = 'hidden';
        } else {
            titleElement.style.visibility = 'visible';
            titleElement.innerHTML = this.currentStep.lightbox.stepTitle;
        }

        const messageElement = this.lightbox.querySelector(`#${this.STEP_MESSAGE_ID}`) as HTMLHtmlElement;
        messageElement.innerHTML = this.currentStep.lightbox.stepDescription;
    }

    private validateLightbox(): void {
        if (!this.lightbox.id) {
            throw new Error(`[HazeLightboxManager] the custom lightbox element ID attribute is missing`);
        }
        if (this.lightbox.id !== this.LIGHTBOX_ID) {
            throw new Error(`[HazeLightboxManager] the custom lightbox element ID attribute is not correct. Please set it to: "${this.LIGHTBOX_ID}"`);
        }
        if (!this.lightbox.querySelector(`#${this.NEXT_BTN_ID}`)) {
            throw new Error(`[HazeLightboxManager] cannot find the NEXT button in the custom lightbox element. Be sure to set the button ID to: "${this.NEXT_BTN_ID}"`);
        }
        if (!this.lightbox.querySelector(`#${this.PREV_BTN_ID}`)) {
            throw new Error(`[HazeLightboxManager] cannot find the PREVIOUS button in the custom lightbox element. Be sure to set the button ID to: "${this.PREV_BTN_ID}"`);
        }
        if (!this.lightbox.querySelector(`#${this.STEP_TITLE_ID}`)) {
            throw new Error(`[HazeLightboxManager] cannot find the TITLE element in the custom lightbox element. Be sure to set its ID to: "${this.STEP_TITLE_ID}"`);
        }
        if (!this.lightbox.querySelector(`#${this.STEP_MESSAGE_ID}`)) {
            throw new Error(`[HazeLightboxManager] cannot find the MESSAGE element in the custom lightbox element. Be sure to set its ID to: "${this.STEP_MESSAGE_ID}"`);
        }
    }
}

