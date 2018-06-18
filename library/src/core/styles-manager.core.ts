import { DEFAULT_STYLES } from "../consts/default-styles.const";

import { CSSRules } from "../interfaces/css-rules.interface";

export class StylesManager {

    private static defaultInfoBoxStyles = Object.assign({}, DEFAULT_STYLES.infoBox);
    private static defaultTutorialClothStyles = Object.assign({}, DEFAULT_STYLES.tutorialCloth);
    private static defaultInfoBoxContentStyles = Object.assign({}, DEFAULT_STYLES.infoBoxContent);
    private static defaultInfoBoxPrevButtonStyles = Object.assign({}, DEFAULT_STYLES.infoBoxPreviousBtn);
    private static defaultInfoBoxNextButtonStyles = Object.assign({}, DEFAULT_STYLES.infoBoxNextOrEndBtn);

    public static set deafultInfoBoxStyle(value: CSSRules) { this.defaultInfoBoxStyles = Object.assign(this.defaultInfoBoxStyles, value); }
    public static set defaultTutorialClothStyle(value: CSSRules) { this.defaultTutorialClothStyles = Object.assign(this.defaultTutorialClothStyles, value); }
    public static set defaultInfoBoxNextBtnStyle(value: CSSRules) { this.defaultInfoBoxNextButtonStyles = Object.assign(this.defaultInfoBoxNextButtonStyles, value); }
    public static set defaultInfoBoxPrevBtnStyle(value: CSSRules) { this.defaultInfoBoxPrevButtonStyles = Object.assign(this.defaultInfoBoxPrevButtonStyles, value); }
    public static set defaultInfoBoxContentStyle(value: CSSRules) { this.defaultInfoBoxContentStyles = Object.assign(this.defaultInfoBoxContentStyles, value); }

    public static resetStyles(): void {
        this.defaultInfoBoxStyles = Object.assign({}, DEFAULT_STYLES.infoBox);
        this.defaultTutorialClothStyles = Object.assign({}, DEFAULT_STYLES.tutorialCloth);
        this.defaultInfoBoxContentStyles = Object.assign({}, DEFAULT_STYLES.infoBoxContent);
        this.defaultInfoBoxPrevButtonStyles = Object.assign({}, DEFAULT_STYLES.infoBoxPreviousBtn);
        this.defaultInfoBoxNextButtonStyles = Object.assign({}, DEFAULT_STYLES.infoBoxNextOrEndBtn);
    }

    public static styleTutorialCloth(clothElement: HTMLElement): HTMLElement {
        clothElement = this.applyStyles(clothElement, this.defaultTutorialClothStyles);
        return clothElement;
    }

    public static styleInfoBox(boxElement: HTMLElement): HTMLElement {
        boxElement = this.applyStyles(boxElement, this.defaultInfoBoxStyles);
        return boxElement;
    }

    public static styleInfoBoxContent(infoBoxContentElement: HTMLElement): HTMLElement {
        infoBoxContentElement = this.applyStyles(infoBoxContentElement, this.defaultInfoBoxContentStyles);
        return infoBoxContentElement;
    }

    public static styleInfoBoxNextBtn(buttonElement: HTMLElement): HTMLElement {
        buttonElement = this.applyStyles(buttonElement, this.defaultInfoBoxNextButtonStyles);
        return buttonElement;
    }

    public static styleInfoBoxPrevBtn(buttonElement: HTMLElement): HTMLElement {
        buttonElement = this.applyStyles(buttonElement, this.defaultInfoBoxPrevButtonStyles);
        return buttonElement;
    }

    private static applyStyles(element: HTMLElement, stylesSet: CSSRules): HTMLElement {
        const stylesKeys = Object.keys(stylesSet);

        stylesKeys.forEach(styleKey => {
            element.style[styleKey] = stylesSet[styleKey];
        });

        return element;
    }

}
