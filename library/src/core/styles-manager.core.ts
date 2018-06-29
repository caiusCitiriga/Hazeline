import { DEFAULT_STYLES } from "../consts/default-styles.const";

import { CSSRules } from "../interfaces/css-rules.interface";
import { InfoBoxPlacement } from "../enums/info-box-placement.enum";
import { StepStylableElements } from "../interfaces/stylable-elements";

export class StylesManager {

    private static viewportSizes: ViewportSizes;

    public static readonly overlayId = 'HAZELINE-TUTORIAL-OVERLAY';
    public static readonly pleaseWaitId = 'HAZELINE-PLEASE-WAIT';
    public static readonly infoBoxId = 'HAZELINE-TUTORIAL-INFO-BOX';
    public static readonly tutorialCloseBtnId = 'HAZELINE-TUTORIAL-CLOSE';
    public static readonly nextStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-NEXT-STEP';
    public static readonly prevStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-PREV-STEP';
    public static readonly infoStepBoxContentElId = 'HAZELINE-TUTORIAL-INFO-BOX-CONTENT';

    private static infoBoxMargin = '10px';

    private static readonly defaultEndButtonText = 'End';
    private static readonly defaultNextButtonText = 'Next';
    private static readonly defaultPreviousButtonText = 'Previous';
    private static readonly defaultPleaseWaitText = 'Please wait...';

    private static defaultInfoBoxStyles = Object.assign({}, DEFAULT_STYLES.infoBox);
    private static defaultPleaseWaitStyles = Object.assign({}, DEFAULT_STYLES.pleaseWait);
    private static defaultTutorialOverlayStyles = Object.assign({}, DEFAULT_STYLES.tutorialOverlay);
    private static defaultInfoBoxContentStyles = Object.assign({}, DEFAULT_STYLES.infoBoxContent);
    private static defaultTutorialCloseButtonStyles = Object.assign({}, DEFAULT_STYLES.tutorialCloseBtn);
    private static defaultInfoBoxPrevButtonStyles = Object.assign({}, DEFAULT_STYLES.infoBoxPreviousBtn);
    private static defaultInfoBoxNextButtonStyles = Object.assign({}, DEFAULT_STYLES.infoBoxNextOrEndBtn);

    public static set deafultInfoBoxStyle(value: CSSRules) { this.defaultInfoBoxStyles = Object.assign(this.defaultInfoBoxStyles, value); }
    public static set defaultPleaseWaitStyle(value: CSSRules) { this.defaultPleaseWaitStyles = Object.assign(this.defaultPleaseWaitStyles, value); }
    public static set defaultInfoBoxContentStyle(value: CSSRules) { this.defaultInfoBoxContentStyles = Object.assign(this.defaultInfoBoxContentStyles, value); }
    public static set defaultTutorialOverlayStyle(value: CSSRules) { this.defaultTutorialOverlayStyles = Object.assign(this.defaultTutorialOverlayStyles, value); }
    public static set defaultInfoBoxNextBtnStyle(value: CSSRules) { this.defaultInfoBoxNextButtonStyles = Object.assign(this.defaultInfoBoxNextButtonStyles, value); }
    public static set defaultInfoBoxPrevBtnStyle(value: CSSRules) { this.defaultInfoBoxPrevButtonStyles = Object.assign(this.defaultInfoBoxPrevButtonStyles, value); }
    public static set defaultTutorialCloseButtonStyle(value: CSSRules) { this.defaultTutorialCloseButtonStyles = Object.assign(this.defaultTutorialCloseButtonStyles, value); }

    ////////////////////////////////////////////////////////////////
    //  General controls
    ////////////////////////////////////////////////////////////////
    public static resetStyles(): void {
        this.defaultInfoBoxStyles = Object.assign({}, DEFAULT_STYLES.infoBox);
        this.defaultPleaseWaitStyles = Object.assign({}, DEFAULT_STYLES.pleaseWait);
        this.defaultTutorialOverlayStyles = Object.assign({}, DEFAULT_STYLES.tutorialOverlay);
        this.defaultInfoBoxContentStyles = Object.assign({}, DEFAULT_STYLES.infoBoxContent);
        this.defaultTutorialCloseButtonStyles = Object.assign({}, DEFAULT_STYLES.tutorialCloseBtn);
        this.defaultInfoBoxPrevButtonStyles = Object.assign({}, DEFAULT_STYLES.infoBoxPreviousBtn);
        this.defaultInfoBoxNextButtonStyles = Object.assign({}, DEFAULT_STYLES.infoBoxNextOrEndBtn);
    }

    public static applyStepCustomStylesIfAny(customStyles: StepStylableElements): void {
        if (!customStyles) {
            return;
        }

        if (customStyles.infoBox) { this.deafultInfoBoxStyle = customStyles.infoBox; }
        if (customStyles.pleaseWait) { this.defaultPleaseWaitStyle = customStyles.pleaseWait; }
        if (customStyles.infoBoxContent) { this.defaultInfoBoxContentStyle = customStyles.infoBoxContent; }
        if (customStyles.infoBoxPreviousBtn) { this.defaultInfoBoxPrevBtnStyle = customStyles.infoBoxPreviousBtn; }
        if (customStyles.tutorialCloseBtn) { this.defaultTutorialCloseButtonStyle = customStyles.tutorialCloseBtn; }
        if (customStyles.infoBoxNextOrEndBtn) { this.defaultInfoBoxNextBtnStyle = customStyles.infoBoxNextOrEndBtn; }
    }

    ////////////////////////////////////////////////////////////////
    //  Overlay controls
    ////////////////////////////////////////////////////////////////
    public static updateOverlaySize(overlay: HTMLElement): void {
        const newSizes = this.getViewportSizes();
        overlay.style.width = `${newSizes.width}px`;
        overlay.style.height = `${newSizes.height}px`;
    }

    public static revealOverlay(overlay: HTMLElement): void {
        overlay.style.opacity = '1';
    }

    ////////////////////////////////////////////////////////////////
    //  Style setters
    ////////////////////////////////////////////////////////////////
    public static styleTutorialOverlay(overlay: HTMLElement): HTMLElement {
        this.getViewportSizes();

        overlay = this.applyStyles(overlay, this.defaultTutorialOverlayStyles);

        overlay.setAttribute('id', this.overlayId);
        overlay.style.width = `${this.viewportSizes.width.toString()}px`;
        overlay.style.height = `${this.viewportSizes.height.toString()}px`;

        return overlay;
    }

    public static stylePleaseWait(pleaseWaitElement: HTMLElement, alternativeTextContent?: string): HTMLElement {
        pleaseWaitElement = this.applyStyles(pleaseWaitElement, this.defaultPleaseWaitStyles);
        pleaseWaitElement = this.applyCommonProperties(this.pleaseWaitId, alternativeTextContent || this.defaultPleaseWaitText, pleaseWaitElement);

        return pleaseWaitElement;
    }

    public static styleTutorialCloseButton(el: HTMLElement): HTMLElement {
        el = this.applyStyles(el, this.defaultTutorialCloseButtonStyles);
        el = this.applyCommonProperties(this.tutorialCloseBtnId, 'X', el);

        return el;
    }

    public static styleInfoBox(el: HTMLElement, infoboxPlacement: InfoBoxPlacement | string): HTMLElement {
        el = this.applyStyles(el, this.defaultInfoBoxStyles);
        el = this.applyCommonProperties(this.infoBoxId, null, el);
        el = this.applyInfoBoxMargins(el, this.getMarginSettingsBasedOnPositioning(infoboxPlacement));
        return el;
    }

    public static styleInfoBoxContent(el: HTMLElement, htmlTextContent: string): HTMLElement {
        el = this.applyStyles(el, this.defaultInfoBoxContentStyles);
        el = this.applyCommonProperties(this.infoStepBoxContentElId, htmlTextContent || null, el);
        return el;
    }

    public static styleInfoBoxNextBtn(el: HTMLElement, alternativeTextContent?: string, isLastStep?: boolean): HTMLElement {
        el = this.applyStyles(el, this.defaultInfoBoxNextButtonStyles);
        el = this.applyCommonProperties(this.nextStepBtnId, alternativeTextContent || isLastStep ? this.defaultEndButtonText : this.defaultNextButtonText, el);
        return el;
    }

    public static styleInfoBoxPrevBtn(el: HTMLElement, alternativeTextContent?: string): HTMLElement {
        el = this.applyStyles(el, this.defaultInfoBoxPrevButtonStyles);
        el = this.applyCommonProperties(this.prevStepBtnId, alternativeTextContent || this.defaultPreviousButtonText, el);
        return el;
    }

    ////////////////////////////////////////////////////////////////
    //  Classes application
    ////////////////////////////////////////////////////////////////
    public static applyPleaseWaitClasses(el: HTMLElement, classes: string[], alternativeTextContent?: string): HTMLElement {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.pleaseWaitId, alternativeTextContent || this.defaultPleaseWaitText, el);
        return el;
    }

    public static applyInfoBoxClasses(el: HTMLElement, classes: string[], infoboxPlacement: InfoBoxPlacement | string): HTMLElement {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.infoBoxId, null, el);
        el = this.applyInfoBoxMargins(el, this.getMarginSettingsBasedOnPositioning(infoboxPlacement));
        return el;
    }

    public static applyTutorialCloseBtnClasses(el: HTMLElement, classes: string[]): HTMLElement {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.tutorialCloseBtnId, 'X', el);
        return el;
    }

    public static applyInfoBoxNextBtnClasses(el: HTMLElement, classes: string[], alternativeTextContent?: string, isLastStep?: boolean): HTMLElement {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.nextStepBtnId, alternativeTextContent || isLastStep ? this.defaultEndButtonText : this.defaultNextButtonText, el);
        return el;
    }

    public static applyInfoBoxPrevBtnClasses(el: HTMLElement, classes: string[], alternativeTextContent?: string): HTMLElement {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.prevStepBtnId, alternativeTextContent || this.defaultPreviousButtonText, el);
        return el;
    }

    public static applyInfoBoxContentClasses(el: HTMLElement, classes: string[], htmlTextContent: string): HTMLElement {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.infoStepBoxContentElId, htmlTextContent || null, el);
        return el;
    }

    private static applyClasses(element: HTMLElement, classes: string[]): HTMLElement {
        element.removeAttribute('style');
        classes.forEach(className => element.setAttribute('class', className));
        return element;
    }

    ////////////////////////////////////////////////////////////////
    //  Internal utility methods
    ////////////////////////////////////////////////////////////////
    private static getMarginSettingsBasedOnPositioning(infoBoxPlacement: InfoBoxPlacement | string): { margin: string, value: string } {
        const result = {
            margin: null,
            value: null,
        };

        switch (infoBoxPlacement) {
            case InfoBoxPlacement.LEFT:
                result.margin = 'marginLeft';
                result.value = `-${this.infoBoxMargin}`;
                break;

            case InfoBoxPlacement.ABOVE:
                result.margin = 'marginTop';
                result.value = `-${this.infoBoxMargin}`;
                break;

            case InfoBoxPlacement.RIGHT:
                result.margin = 'marginLeft';
                result.value = this.infoBoxMargin;
                break;


            case InfoBoxPlacement.BELOW:
            default:
                result.margin = 'marginTop';
                result.value = this.infoBoxMargin;
                break;
        }

        return result;
    }

    private static applyInfoBoxMargins(el: HTMLElement, margins: { margin: string; value: string }): HTMLElement {
        el.style[margins.margin] = margins.value;
        return el;
    }

    private static applyCommonProperties(id: string, textContent: string, el: HTMLElement): HTMLElement {
        el = this.setAttribute('id', id, el);
        el = this.setHTMLTextContent(el, textContent);
        return el;
    }

    private static applyStyles(element: HTMLElement, stylesSet: CSSRules): HTMLElement {
        const stylesKeys = Object.keys(stylesSet);

        stylesKeys.forEach(styleKey => {
            element.style[styleKey] = stylesSet[styleKey];
        });

        return element;
    }

    private static getViewportSizes(): ViewportSizes {
        this.viewportSizes = {
            width: $(window).width(),
            height: $(window).height(),
        };

        return this.viewportSizes;
    }

    private static setAttribute(attr: string, val: any, el: HTMLElement): HTMLElement {
        el.setAttribute(attr, val);
        return el;
    }

    private static setHTMLTextContent(el: HTMLElement, value: string): HTMLElement {
        if (!value) {
            return el;
        }

        el.innerHTML = value;
        return el;
    }
}

interface ViewportSizes {
    width: number;
    height: number;
}
