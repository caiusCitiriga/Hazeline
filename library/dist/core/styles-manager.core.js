"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_styles_const_1 = require("../consts/default-styles.const");
class StylesManager {
    static set deafultInfoBoxStyle(value) { this.defaultInfoBoxStyles = Object.assign(this.defaultInfoBoxStyles, value); }
    static set defaultTutorialClothStyle(value) { this.defaultTutorialClothStyles = Object.assign(this.defaultTutorialClothStyles, value); }
    static set defaultInfoBoxContentStyle(value) { this.defaultInfoBoxContentStyles = Object.assign(this.defaultInfoBoxContentStyles, value); }
    static set defaultInfoBoxNextBtnStyle(value) { this.defaultInfoBoxNextButtonStyles = Object.assign(this.defaultInfoBoxNextButtonStyles, value); }
    static set defaultInfoBoxPrevBtnStyle(value) { this.defaultInfoBoxPrevButtonStyles = Object.assign(this.defaultInfoBoxPrevButtonStyles, value); }
    static set defaultTutorialCloseButtonStyle(value) { this.defaultTutorialCloseButtonStyles = Object.assign(this.defaultTutorialCloseButtonStyles, value); }
    static resetStyles() {
        this.defaultInfoBoxStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBox);
        this.defaultTutorialClothStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.tutorialCloth);
        this.defaultInfoBoxContentStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxContent);
        this.defaultTutorialCloseButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.tutorialCloseBtn);
        this.defaultInfoBoxPrevButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxPreviousBtn);
        this.defaultInfoBoxNextButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxNextOrEndBtn);
    }
    static styleTutorialCloth(clothElement) {
        clothElement = this.applyStyles(clothElement, this.defaultTutorialClothStyles);
        return clothElement;
    }
    static styleTutorialCloseButton(buttonElement) {
        buttonElement = this.applyStyles(buttonElement, this.defaultTutorialCloseButtonStyles);
        return buttonElement;
    }
    static styleInfoBox(boxElement) {
        boxElement = this.applyStyles(boxElement, this.defaultInfoBoxStyles);
        return boxElement;
    }
    static styleInfoBoxContent(infoBoxContentElement) {
        infoBoxContentElement = this.applyStyles(infoBoxContentElement, this.defaultInfoBoxContentStyles);
        return infoBoxContentElement;
    }
    static styleInfoBoxNextBtn(buttonElement) {
        buttonElement = this.applyStyles(buttonElement, this.defaultInfoBoxNextButtonStyles);
        return buttonElement;
    }
    static styleInfoBoxPrevBtn(buttonElement) {
        buttonElement = this.applyStyles(buttonElement, this.defaultInfoBoxPrevButtonStyles);
        return buttonElement;
    }
    static applyStyles(element, stylesSet) {
        const stylesKeys = Object.keys(stylesSet);
        stylesKeys.forEach(styleKey => {
            element.style[styleKey] = stylesSet[styleKey];
        });
        return element;
    }
}
StylesManager.defaultInfoBoxStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBox);
StylesManager.defaultTutorialClothStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.tutorialCloth);
StylesManager.defaultInfoBoxContentStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxContent);
StylesManager.defaultTutorialCloseButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.tutorialCloseBtn);
StylesManager.defaultInfoBoxPrevButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxPreviousBtn);
StylesManager.defaultInfoBoxNextButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxNextOrEndBtn);
exports.StylesManager = StylesManager;
//# sourceMappingURL=styles-manager.core.js.map