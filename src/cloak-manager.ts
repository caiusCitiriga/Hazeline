export interface IHazeCloakManagerOpts {
    debug?: boolean;
    cloakZIndex?: number;
    cloakingOffset?: number;
    transitionTime?: number;
    cloakBackgroundColor?: string;
}

/**
 * 1) try to draw a transparent black rectangle on top of full black cloak
 * 2) try using the clear rect
 */

export interface IHazeClickMasksSet {
    left: HTMLDivElement;
    above: HTMLDivElement;
    below: HTMLDivElement;
    right: HTMLDivElement;
}

export class HazeCloakManager {

    private readonly MAX_ATTACH_ATTEMPTS = 10;

    private attachAttempts = 0;
    private targetBounds: DOMRect;
    private targetElement: HTMLElement;

    private cloakZIndex = 9000;
    private transitionTime = 220;
    private cloakBackground = 'rgba(0,123,225,.8)';

    private cloak: HTMLCanvasElement;
    private cloakCTX: CanvasRenderingContext2D;

    private clickMasks: IHazeClickMasksSet;

    constructor(
        private targetSelector: string,
        private readonly opts: IHazeCloakManagerOpts,
    ) {
        if (this.opts && this.opts.cloakZIndex) {
            this.cloakZIndex = this.opts.cloakZIndex;
        }
        if (this.opts && this.opts.cloakBackgroundColor) {
            this.cloakBackground = this.opts.cloakBackgroundColor;
        }
        if (this.opts && this.opts.transitionTime) {
            this.transitionTime = this.opts.transitionTime;
        }
    }

    async setTargetSelector(selector: string, attach = false): Promise<void> {
        this.targetSelector = selector;
        if (attach) {
            return this.attachTargetElement();
        }

        return Promise.resolve();
    }

    async uncloak(): Promise<void> {
        if (this.clickMasks && this.clickMasks.left) { document.body.removeChild(this.clickMasks.left); }
        if (this.clickMasks && this.clickMasks.right) { document.body.removeChild(this.clickMasks.right); }
        if (this.clickMasks && this.clickMasks.below) { document.body.removeChild(this.clickMasks.below); }
        if (this.clickMasks && this.clickMasks.above) { document.body.removeChild(this.clickMasks.above); }
        if (this.cloakCTX) {
            this.cloakCTX.restore();
            this.cloakCTX.clearRect(0, 0, this.cloak.width, this.cloak.height);
            document.body.removeChild(this.cloak);
            this.cloak = undefined;
            this.cloakCTX = undefined;
        }

        return Promise.resolve();
    }

    async cloakView(): Promise<boolean> {
        await this.attachTargetElement();
        await this.initializeCloak();
        await this.highlightTargetElement();

        if (!!this.clickMasks) {
            document.body.removeChild(this.clickMasks.left);
            document.body.removeChild(this.clickMasks.above);
            document.body.removeChild(this.clickMasks.below);
            document.body.removeChild(this.clickMasks.right);
        }

        this.clickMasks = this.generateClickMasks();
        document.body.appendChild(this.clickMasks.left);
        document.body.appendChild(this.clickMasks.above);
        document.body.appendChild(this.clickMasks.below);
        document.body.appendChild(this.clickMasks.right);

        return Promise.resolve(true);
    }

    private generateClickMasks(): IHazeClickMasksSet {
        const clickMask = document.createElement('div');
        const leftClickMask = clickMask.cloneNode(true) as HTMLDivElement;
        const aboveClickMask = clickMask.cloneNode(true) as HTMLDivElement;
        const belowClickMask = clickMask.cloneNode(true) as HTMLDivElement;
        const rightClickMask = clickMask.cloneNode(true) as HTMLDivElement;

        const offset = this.opts && this.opts.cloakingOffset ? this.opts.cloakingOffset : 0;

        leftClickMask.style.position = 'absolute';
        aboveClickMask.style.position = 'absolute';
        belowClickMask.style.position = 'absolute';
        rightClickMask.style.position = 'absolute';

        aboveClickMask.style.top = '0';
        aboveClickMask.style.left = '0';
        aboveClickMask.style.width = '100%';
        aboveClickMask.style.height = `${this.targetBounds.y - offset}px`;

        belowClickMask.style.left = '0';
        belowClickMask.style.width = '100%';
        belowClickMask.style.top = `${this.targetBounds.height + this.targetBounds.y}px`;
        belowClickMask.style.height = `${window.innerHeight - (this.targetBounds.height + this.targetBounds.y)}px`;

        leftClickMask.style.left = '0';
        leftClickMask.style.top = `${this.targetBounds.y}px`;
        leftClickMask.style.width = `${this.targetBounds.x}px`;
        leftClickMask.style.height = `${this.targetBounds.height}px`;

        rightClickMask.style.top = `${this.targetBounds.y}px`;
        rightClickMask.style.height = `${this.targetBounds.height}px`;
        rightClickMask.style.left = `${this.targetBounds.x + this.targetBounds.width}px`;
        rightClickMask.style.width = `${window.innerWidth - (this.targetBounds.x + this.targetBounds.width)}px`;

        return {
            left: leftClickMask,
            above: aboveClickMask,
            below: belowClickMask,
            right: rightClickMask,
        }
    }

    private async initializeCloak(): Promise<void> {
        if (!!this.cloak && !!this.cloakCTX) {
            // this.cloak.style.opacity = '0';
            // return new Promise(r => setTimeout(() => r(), this.transitionTime));
            this.cloak.width = window.innerWidth;
            this.cloak.height = window.innerHeight;
            return Promise.resolve();
        }

        this.cloak = document.createElement('canvas');
        this.cloak.style.zIndex = this.cloakZIndex.toString();
        this.cloak.style.position = 'absolute';
        this.cloak.style.top = '0';
        this.cloak.style.left = '0';
        this.cloak.style.opacity = '0';
        this.cloak.width = window.innerWidth;
        this.cloak.height = window.innerHeight;
        this.cloak.style.pointerEvents = 'none';
        this.cloak.style.transition = `opacity ${this.transitionTime}ms ease-in-out`;

        this.cloakCTX = this.cloak.getContext('2d');
        this.cloakCTX.filter = 'blur(2px)';

        document.body.appendChild(this.cloak);
        return Promise.resolve();
    }

    private async highlightTargetElement(): Promise<void> {
        this.cloakCTX.clearRect(0, 0, this.cloak.width, this.cloak.height);
        return new Promise(async resolver => {
            this.cloakCTX.fillStyle = this.cloakBackground;
            this.cloakCTX.fillRect(0, 0, this.cloak.width, this.cloak.height);

            const offset = this.opts && this.opts.cloakingOffset ? this.opts.cloakingOffset : 10;
            this.cloakCTX.clearRect(this.targetBounds.x - offset, this.targetBounds.y - offset, this.targetBounds.width + (offset * 2), this.targetBounds.height + (offset * 2));

            this.cloak.style.opacity = '1';

            resolver();
        });
    }

    private async attachTargetElement(): Promise<void> {
        if (!this.targetSelector) {
            throw new Error('[HazeCloakManager] No target element defined');
        }

        this.targetElement = document.querySelector(this.targetSelector);
        if (!this.targetElement && this.attachAttempts < this.MAX_ATTACH_ATTEMPTS) {
            await new Promise(r => setTimeout(() => r(), 100));
            this.attachAttempts++;
            return this.attachTargetElement();
        } else if (!this.targetElement && this.attachAttempts === this.MAX_ATTACH_ATTEMPTS) {
            throw new Error(`[HazeCloakManager] Max attach attempts reached without finding the element`);
        }

        this.targetBounds = this.targetElement.getBoundingClientRect();
        return Promise.resolve();
    }
}