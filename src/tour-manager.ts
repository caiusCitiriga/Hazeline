import { HazeCloakManager, IHazeCloakManagerOpts } from './cloak-manager';
import { HazeLightboxManager, IHazeLightboxManagerOpts } from './lightbox-manager';

export type HazeStepMode = 'lightbox';

export interface IHazeTourStep {
    mode: HazeStepMode;
    targetSelector: string;

    nextTriggerEvent: string;
    nextStepTriggerSelector: string;

    previousTriggerEvent?: string;
    previousStepTriggerSelector?: string;

    onStepStarted?: (step: IHazeTourStep) => Promise<void>;

    lightbox?: {
        stepTitle?: string;
        stepDescription: string;

        hideNextBtn?: boolean;
        hidePrevBtn?: boolean;
    }
}

export interface IHazeTourManagerOpts {
    lightbox?: HTMLDivElement;

    cloakManager?: IHazeCloakManagerOpts;
    lightboxManager?: IHazeLightboxManagerOpts;

    onTourEnd?: () => void;
}

export class HazeTourManager {

    private readonly MAX_ATTACH_ATTEMPTS = 10;
    private attachAttempts = 0;

    private cloakManager: HazeCloakManager;
    private lightboxManager: HazeLightboxManager;

    private tourLength: number;
    private currentStepIdx: number;
    private currentStep: IHazeTourStep;

    private currentStepTargetElement: HTMLElement;
    private nextStepTriggerElement: HTMLElement;
    private previousStepTriggerElement: HTMLElement;

    constructor(
        private readonly steps: IHazeTourStep[],
        private readonly opts: IHazeTourManagerOpts,
    ) {
        this.loadSteps();
        this.initializeDependencies();
    }

    async startTour(): Promise<void> {
        window.addEventListener('resize', this.reposition.bind(this));

        this.currentStepIdx = 0;
        this.currentStep = this.steps[this.currentStepIdx];

        await this.attachTargetElement();
        await this.attachCustomNextStepTriggerElement();

        this.attachCustomNextStepEventTrigger();

        await this.cloakManager.setTargetSelector(this.currentStep.targetSelector);
        await this.cloakManager.cloakView();

        if (this.currentStep.mode === 'lightbox') {
            await this.lightboxManager.setTargetSelector(this.currentStep.targetSelector);
            await this.lightboxManager.attachToElement(this.currentStep);
            this.attachLightboxPrevNextListeners();
            await this.lightboxManager.fadeIn();
        }

        if (this.currentStep.onStepStarted) {
            await this.currentStep.onStepStarted(this.currentStep);
        }

        return Promise.resolve();
    }

    async nextStep(): Promise<void> {
        if (this.currentStep.mode === 'lightbox') {
            await this.lightboxManager.fadeOut();
        }

        // update current step data
        this.currentStepIdx++;
        if (this.currentStepIdx === this.tourLength) {
            await this.dispose();
            if (this.opts.onTourEnd) {
                this.opts.onTourEnd();
            }
            window.removeEventListener('resize', this.reposition);
            return Promise.resolve();
        }
        this.currentStep = this.steps[this.currentStepIdx];

        await this.attachTargetElement();
        await this.attachCustomNextStepTriggerElement();
        await this.attachCustomPreviousStepTriggerElement();

        this.attachCustomNextStepEventTrigger();
        this.attachCustomPreviousStepEventTrigger();

        // update the cloaker position
        await this.cloakManager.setTargetSelector(this.currentStep.targetSelector);
        await this.cloakManager.cloakView();

        if (this.currentStep.mode === 'lightbox') {
            await this.lightboxManager.setTargetSelector(this.currentStep.targetSelector);
            await this.lightboxManager.attachToElement(this.currentStep);
            this.attachLightboxPrevNextListeners();
            await this.lightboxManager.fadeIn();
        }

        if (this.currentStep.onStepStarted) {
            await this.currentStep.onStepStarted(this.currentStep);
        }

        return Promise.resolve();
    }

    async previousStep(): Promise<void> {
        if (this.currentStep.mode === 'lightbox') {
            await this.lightboxManager.fadeOut();
        }

        // update current step data
        this.currentStepIdx--;
        if (this.currentStepIdx === -1) {
            console.log(`[HazeTourManager] First step reached`);
            this.currentStepIdx = 0;
        }

        this.currentStep = this.steps[this.currentStepIdx];

        await this.attachTargetElement();
        await this.attachCustomNextStepTriggerElement();
        await this.attachCustomPreviousStepTriggerElement();

        this.attachCustomNextStepEventTrigger();
        this.attachCustomPreviousStepEventTrigger();

        // update the cloaker position
        await this.cloakManager.setTargetSelector(this.currentStep.targetSelector);
        await this.cloakManager.cloakView();

        if (this.currentStep.mode === 'lightbox') {
            await this.lightboxManager.setTargetSelector(this.currentStep.targetSelector);
            await this.lightboxManager.attachToElement(this.currentStep);
            this.attachLightboxPrevNextListeners();
            await this.lightboxManager.fadeIn();
        }

        if (this.currentStep.onStepStarted) {
            await this.currentStep.onStepStarted(this.currentStep);
        }

        return Promise.resolve();
    }

    private async dispose(): Promise<void> {
        await this.cloakManager.uncloak();
        await this.lightboxManager.fadeOut();
        return Promise.resolve();
    }

    private initializeDependencies(): void {
        this.cloakManager = new HazeCloakManager('body', this.opts.cloakManager);
        this.lightboxManager = new HazeLightboxManager('body', this.opts.lightbox, this.opts.lightboxManager);
    }

    private loadSteps(): void {
        this.currentStepIdx = 0;
        this.tourLength = this.steps.length;
    }

    private async attachTargetElement(): Promise<void> {
        if (!this.currentStep.targetSelector) {
            throw new Error('[HazeTourManager] No target element defined');
        }

        this.currentStepTargetElement = document.querySelector(this.currentStep.targetSelector);
        if (!this.currentStepTargetElement && this.attachAttempts < this.MAX_ATTACH_ATTEMPTS) {
            await new Promise(r => setTimeout(() => r(), 100));
            this.attachAttempts++;
            return this.attachTargetElement();
        } else if (!this.currentStepTargetElement && this.attachAttempts === this.MAX_ATTACH_ATTEMPTS) {
            throw new Error(`[HazeTourManager] Max attach attempts reached without finding the element`);
        }

        this.attachAttempts = 0;
        return Promise.resolve();
    }

    private async attachCustomNextStepTriggerElement(): Promise<void> {
        if (!this.currentStep.nextTriggerEvent || !this.currentStep.nextStepTriggerSelector) {
            return;
        }

        if (!this.currentStep.targetSelector) {
            throw new Error('[HazeTourManager] No target element defined');
        }

        this.nextStepTriggerElement = document.querySelector(this.currentStep.nextStepTriggerSelector);
        if (!this.nextStepTriggerElement && this.attachAttempts < this.MAX_ATTACH_ATTEMPTS) {
            await new Promise(r => setTimeout(() => r(), 100));
            this.attachAttempts++;
            return this.attachCustomNextStepTriggerElement();
        } else if (!this.nextStepTriggerElement && this.attachAttempts === this.MAX_ATTACH_ATTEMPTS) {
            throw new Error(`[HazeTourManager] Max attach attempts reached without finding the element`);
        }

        this.attachAttempts = 0;
        return Promise.resolve();
    }

    private async attachCustomPreviousStepTriggerElement(): Promise<void> {
        if (!this.currentStep.previousTriggerEvent || !this.currentStep.previousStepTriggerSelector) {
            return;
        }

        if (!this.currentStep.targetSelector) {
            throw new Error('[HazeTourManager] No target element defined');
        }

        this.previousStepTriggerElement = document.querySelector(this.currentStep.previousStepTriggerSelector);
        if (!this.previousStepTriggerElement && this.attachAttempts < this.MAX_ATTACH_ATTEMPTS) {
            await new Promise(r => setTimeout(() => r(), 100));
            this.attachAttempts++;
            return this.attachCustomPreviousStepTriggerElement();
        } else if (!this.previousStepTriggerElement && this.attachAttempts === this.MAX_ATTACH_ATTEMPTS) {
            throw new Error(`[HazeTourManager] Max attach attempts reached without finding the element`);
        }

        this.attachAttempts = 0;
        return Promise.resolve();
    }

    private attachCustomNextStepEventTrigger() {
        if (!this.nextStepTriggerElement) { return; }
        this.nextStepTriggerElement.addEventListener(this.currentStep.nextTriggerEvent, this.nextStepTriggerFN.bind(this));
    }

    private attachCustomPreviousStepEventTrigger() {
        if (!this.previousStepTriggerElement) { return; }
        this.previousStepTriggerElement.addEventListener(this.currentStep.previousTriggerEvent, this.previousStepTriggerFN.bind(this));
    }

    private nextStepTriggerFN(e: MouseEvent) {
        e.stopImmediatePropagation();

        this.nextStepTriggerElement.removeEventListener(this.currentStep.nextTriggerEvent, this.nextStepTriggerFN);
        this.nextStepTriggerElement = undefined;
        this.nextStep();
    }

    private previousStepTriggerFN(e: MouseEvent) {
        e.stopImmediatePropagation();

        this.previousStepTriggerElement.removeEventListener(this.currentStep.previousTriggerEvent, this.previousStepTriggerFN);
        this.previousStepTriggerElement = undefined;
        this.previousStep();
    }

    private async reposition() {
        await this.cloakManager.cloakView();
        await this.lightboxManager.attachToElement(this.currentStep);
        this.attachLightboxPrevNextListeners();
    }

    private attachLightboxPrevNextListeners(): void {
        this.lightboxManager.onNextClick = this.nextStep.bind(this);
        this.lightboxManager.onPrevClick = this.previousStep.bind(this);
    }
}