import { CSSRules } from "../interfaces/css-rules.interface";
export declare class StylesManager {
    private static defaultInfoBoxStyles;
    private static defaultTutorialClothStyles;
    private static defaultInfoBoxContentStyles;
    private static defaultTutorialCloseButtonStyles;
    private static defaultInfoBoxPrevButtonStyles;
    private static defaultInfoBoxNextButtonStyles;
    static deafultInfoBoxStyle: CSSRules;
    static defaultTutorialClothStyle: CSSRules;
    static defaultInfoBoxContentStyle: CSSRules;
    static defaultInfoBoxNextBtnStyle: CSSRules;
    static defaultInfoBoxPrevBtnStyle: CSSRules;
    static defaultTutorialCloseButtonStyle: CSSRules;
    static resetStyles(): void;
    static styleTutorialCloth(clothElement: HTMLElement): HTMLElement;
    static styleTutorialCloseButton(buttonElement: HTMLElement): HTMLElement;
    static styleInfoBox(boxElement: HTMLElement): HTMLElement;
    static styleInfoBoxContent(infoBoxContentElement: HTMLElement): HTMLElement;
    static styleInfoBoxNextBtn(buttonElement: HTMLElement): HTMLElement;
    static styleInfoBoxPrevBtn(buttonElement: HTMLElement): HTMLElement;
    private static applyStyles;
}
//# sourceMappingURL=styles-manager.core.d.ts.map