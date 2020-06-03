export interface IHazeCloakerOpts {
    debug?: boolean;
    cloakingOffset?: number;
}

export interface IHazeCloaksSet {
    left: HTMLDivElement;
    above: HTMLDivElement;
    below: HTMLDivElement;
    right: HTMLDivElement;
}

export class HazeCloaker {
    private attachAttempts = 0;
    private maxAttachAttempts = 10;
    private targetElement: HTMLElement;
    private currentCloaking: IHazeCloaksSet;

    constructor(
        private readonly targetSelector: string,
        private readonly cloak: HTMLDivElement,
        private readonly opts: IHazeCloakerOpts,
    ) { }

    async cloakView(): Promise<boolean> {
        if (!this.targetSelector) {
            throw new Error('[HazeCloaker] No target element defined');
        }

        this.targetElement = document.querySelector(this.targetSelector);
        if (!this.targetElement && this.attachAttempts < this.maxAttachAttempts) {
            await new Promise(r => setTimeout(() => r(), 100));
            this.attachAttempts++;
            return this.cloakView();
        } else if (!this.targetElement && this.attachAttempts === this.maxAttachAttempts) {
            throw new Error(`[HazeCloaker] Max attach attempts reached without finding the element`);
        }

        if (!!this.currentCloaking) {
            document.body.removeChild(this.currentCloaking.left);
            document.body.removeChild(this.currentCloaking.above);
            document.body.removeChild(this.currentCloaking.below);
            document.body.removeChild(this.currentCloaking.right);
        }

        this.currentCloaking = this.generateCloaks();
        document.body.appendChild(this.currentCloaking.left);
        document.body.appendChild(this.currentCloaking.above);
        document.body.appendChild(this.currentCloaking.below);
        document.body.appendChild(this.currentCloaking.right);
    }

    private generateCloaks(): IHazeCloaksSet {
        const leftCloak = this.cloak.cloneNode(true) as HTMLDivElement;
        const aboveCloak = this.cloak.cloneNode(true) as HTMLDivElement;
        const belowCloak = this.cloak.cloneNode(true) as HTMLDivElement;
        const rightCloak = this.cloak.cloneNode(true) as HTMLDivElement;

        const targetBounds = this.targetElement.getBoundingClientRect();
        const offset = this.opts && this.opts.cloakingOffset ? this.opts.cloakingOffset : 0;

        leftCloak.style.position = 'absolute';
        aboveCloak.style.position = 'absolute';
        belowCloak.style.position = 'absolute';
        rightCloak.style.position = 'absolute';

        aboveCloak.style.top = '0';
        aboveCloak.style.left = '0';
        aboveCloak.style.width = '100%';
        aboveCloak.style.height = `${targetBounds.y - offset}px`;

        belowCloak.style.left = '0';
        belowCloak.style.width = '100%';
        belowCloak.style.top = `${targetBounds.height + targetBounds.y}px`;
        belowCloak.style.height = `${window.innerHeight - (targetBounds.height + targetBounds.y)}px`;

        leftCloak.style.left = '0';
        leftCloak.style.top = `${targetBounds.y}px`;
        leftCloak.style.width = `${targetBounds.x}px`;
        leftCloak.style.height = `${targetBounds.height}px`;

        rightCloak.style.top = `${targetBounds.y}px`;
        rightCloak.style.height = `${targetBounds.height}px`;
        rightCloak.style.left = `${targetBounds.x + targetBounds.width}px`;
        rightCloak.style.width = `${window.innerWidth - (targetBounds.x + targetBounds.width)}px`;

        return {
            above: aboveCloak,
            below: belowCloak,
            left: leftCloak,
            right: rightCloak,
        }
    }
}