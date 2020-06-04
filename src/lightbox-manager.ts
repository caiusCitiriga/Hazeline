export interface IHazeLightboxManagerOpts {
    debug?: boolean;
    lightboxZIndex?: number;
    lightboxPositioningOffset?: number;
    unknownPositioningFallback?: 'left' | 'above' | 'below' | 'right';

    nextBtnText?: string;
    previousBtnText?: string;
}

export class HazeLightboxManager {

    private attachAttempts = 0;
    private transitionTime = 220;
    private lightboxZIndex = 9000;
    private maxAttachAttempts = 10;
    private targetElement: HTMLElement;

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
        this.lightbox = this.generateDefaultLightbox();
    }

    async setTargetSelector(selector: string, attach = false): Promise<void> {
        this.targetSelector = selector;
        if (attach) {
            return this.attachToElement();
        }

        return Promise.resolve();
    }

    setLightbox(lightbox: HTMLDivElement): void {
        this.lightbox = lightbox;
    }

    async attachToElement(): Promise<void> {
        if (!this.targetSelector) {
            throw new Error('[HazeLightboxManager] No target element defined');
        }

        this.targetElement = document.querySelector(this.targetSelector);
        if (!this.targetElement && this.attachAttempts < this.maxAttachAttempts) {
            await new Promise(r => setTimeout(() => r(), 100));
            this.attachAttempts++;
            return this.attachToElement();
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
        lightbox.id = 'hazeLightbox';
        lightbox.style.width = '350px';
        lightbox.style.padding = '10px';
        lightbox.style.display = 'flex';
        // lightbox.style.minHeight = '120px';
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

        nextBtn.innerHTML = this.opts && this.opts.nextBtnText ? this.opts.nextBtnText : '<span>Next</span>';
        previousBtn.innerHTML = this.opts && this.opts.previousBtnText ? this.opts.previousBtnText : '<span>Previous</span>';
        const btnStyle = {
            height: '36px',
            width: '110px',
            lineHeight: '0',
            display: 'flex',
            fontSize: '22px',
            borderRadius: '5px',
            alignItems: 'center',
            backgroundColor: '#fff',
            justifyContent: 'center',
            color: '#0069d9',
            transition: 'all 120ms ease-in-out',
            border: '2px solid #0062cc',
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

        if (!dryRun) {
            this.lightbox.style.visibility = 'visible';
        }

    }

}

