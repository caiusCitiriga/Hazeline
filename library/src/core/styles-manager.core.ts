import { DEFAULT_STYLES } from "../consts/default-styles.const";
import { CSSRules } from "../interfaces/css-rules.interface";

export class StylesManager {

    private static defaultInfoBoxStyles = DEFAULT_STYLES.infoBox;
    private static defaultTutorialClothStyles = DEFAULT_STYLES.tutorialCloth;
    private static defaultInfoBoxContentStyles = DEFAULT_STYLES.infoBoxContent;
    private static defaultInfoBoxNextButtonStyles = DEFAULT_STYLES.infoBoxNextBtn;
    private static defaultInfoBoxPrevButtonStyles = DEFAULT_STYLES.infoBoxPreviousBtn;

    public static set defaultTutorialClothDefaultStyle(value: CSSRules) {
        this.defaultTutorialClothStyles = Object.assign(this.defaultTutorialClothStyles, value);
    }

    public static set deafultInfoBoxDefaultStyle(value: CSSRules) {
        this.defaultInfoBoxStyles = Object.assign(this.defaultInfoBoxStyles, value);
    }

    public static set defaultInfoBoxNextBtnDefaultStyle(value: CSSRules) {
        this.defaultInfoBoxNextButtonStyles = Object.assign(this.defaultInfoBoxNextButtonStyles, value);
    }

    public static set defaultInfoBoxPrevBtnDefaultStyle(value: CSSRules) {
        this.defaultInfoBoxPrevButtonStyles = Object.assign(this.defaultInfoBoxPrevButtonStyles, value);
    }

    public static set defaultInfoBoxContentDefaultStyle(value: CSSRules) {
        this.defaultInfoBoxContentStyles = Object.assign(this.defaultInfoBoxContentStyles, value);
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
