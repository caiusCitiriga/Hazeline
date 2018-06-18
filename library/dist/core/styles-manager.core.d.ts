import { CSSRules } from "../interfaces/css-rules.interface";
export declare class StylesManager {
    private static defaultInfoBoxStyles;
    private static defaultTutorialClothStyles;
    private static defaultInfoBoxContentStyles;
    private static defaultInfoBoxNextButtonStyles;
    private static defaultInfoBoxPrevButtonStyles;
    static defaultTutorialClothDefaultStyle: CSSRules;
    static deafultInfoBoxDefaultStyle: CSSRules;
    static defaultInfoBoxNextBtnDefaultStyle: CSSRules;
    static defaultInfoBoxPrevBtnDefaultStyle: CSSRules;
    static defaultInfoBoxContentDefaultStyle: CSSRules;
    static styleTutorialCloth(clothElement: HTMLElement): HTMLElement;
    static styleInfoBox(boxElement: HTMLElement): HTMLElement;
    static styleInfoBoxContent(infoBoxContentElement: HTMLElement): HTMLElement;
    static styleInfoBoxNextBtn(buttonElement: HTMLElement): HTMLElement;
    static styleInfoBoxPrevBtn(buttonElement: HTMLElement): HTMLElement;
    private static applyStyles;
}
//# sourceMappingURL=styles-manager.core.d.ts.map