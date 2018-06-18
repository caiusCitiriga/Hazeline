"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_styles_const_1 = require("../consts/default-styles.const");
class StylesManager {
    static set defaultTutorialClothDefaultStyle(value) {
        this.defaultTutorialClothStyles = Object.assign(this.defaultTutorialClothStyles, value);
    }
    static set deafultInfoBoxDefaultStyle(value) {
        this.defaultInfoBoxStyles = Object.assign(this.defaultInfoBoxStyles, value);
    }
    static set defaultInfoBoxNextBtnDefaultStyle(value) {
        this.defaultInfoBoxNextButtonStyles = Object.assign(this.defaultInfoBoxNextButtonStyles, value);
    }
    static set defaultInfoBoxPrevBtnDefaultStyle(value) {
        this.defaultInfoBoxPrevButtonStyles = Object.assign(this.defaultInfoBoxPrevButtonStyles, value);
    }
    static set defaultInfoBoxContentDefaultStyle(value) {
        this.defaultInfoBoxContentStyles = Object.assign(this.defaultInfoBoxContentStyles, value);
    }
    static styleTutorialCloth(clothElement) {
        clothElement = this.applyStyles(clothElement, this.defaultTutorialClothStyles);
        return clothElement;
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
StylesManager.defaultInfoBoxStyles = default_styles_const_1.DEFAULT_STYLES.infoBox;
StylesManager.defaultTutorialClothStyles = default_styles_const_1.DEFAULT_STYLES.tutorialCloth;
StylesManager.defaultInfoBoxContentStyles = default_styles_const_1.DEFAULT_STYLES.infoBoxContent;
StylesManager.defaultInfoBoxNextButtonStyles = default_styles_const_1.DEFAULT_STYLES.infoBoxNextBtn;
StylesManager.defaultInfoBoxPrevButtonStyles = default_styles_const_1.DEFAULT_STYLES.infoBoxPreviousBtn;
exports.StylesManager = StylesManager;
//# sourceMappingURL=styles-manager.core.js.map