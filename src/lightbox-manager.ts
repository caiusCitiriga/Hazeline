export interface IHazeLightboxManagerOpts {
    debug?: boolean;
    lightboxPositioningOffset?: number;
    unknownPositioningFallback?: 'left' | 'above' | 'below' | 'right';
}

export class HazeLightboxManager {

    private attachAttempts = 0;
    private maxAttachAttempts = 10;
    private targetElement: HTMLElement;

    constructor(
        private readonly targetSelector: string,
        private readonly lightbox: HTMLDivElement,
        private readonly opts?: IHazeLightboxManagerOpts,
    ) { }

    async attachToElement(): Promise<boolean> {
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
        return Promise.resolve(true);
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
        }
        if (lightboxVisiblityConfigs.above()) {
            this.positionLightbox('above');
        }
        if (lightboxVisiblityConfigs.left()) {
            this.positionLightbox('left');
        }
        if (lightboxVisiblityConfigs.right()) {
            this.positionLightbox('right');
        }
        if (
            !lightboxVisiblityConfigs.right() &&
            !lightboxVisiblityConfigs.left() &&
            !lightboxVisiblityConfigs.above() &&
            !lightboxVisiblityConfigs.below()
        ) {
            this.positionLightbox(this.opts && this.opts.unknownPositioningFallback ? this.opts.unknownPositioningFallback : 'below');
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

        const offset = this.opts && this.opts.lightboxPositioningOffset ? this.opts.lightboxPositioningOffset : 0;
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

