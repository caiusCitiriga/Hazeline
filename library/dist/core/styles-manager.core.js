"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StylesManager {
    static set tutorialClothDefaultStyle(value) {
        this.defaultClothStyles = Object.assign(this.defaultClothStyles, value);
    }
    static set infoBoxDefaultStyle(value) {
        this.defaultInfoBoxStyles = Object.assign(this.defaultInfoBoxStyles, value);
    }
    static set infoBoxNextBtnDefaultStyle(value) {
        this.defaultInfoBoxNextButtonStyles = Object.assign(this.defaultInfoBoxNextButtonStyles, value);
    }
    static set infoBoxPrevBtnDefaultStyle(value) {
        this.defaultInfoBoxPrevButtonStyles = Object.assign(this.defaultInfoBoxPrevButtonStyles, value);
    }
    static set infoBoxContentDefaultStyle(value) {
        this.defaultInfoBoxContentStyles = Object.assign(this.defaultInfoBoxContentStyles, value);
    }
    static styleTutorialCloth(clothElement) {
        clothElement = this.applyStyles(clothElement, this.defaultClothStyles);
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
StylesManager.defaultClothStyles = {
    top: '0',
    left: '0',
    opacity: '0',
    zIndex: '999',
    position: 'fixed',
    background: '#007bffe6',
    transition: 'opacity 120ms ease-in-out',
};
StylesManager.defaultInfoBoxStyles = {
    opacity: '0',
    color: '#333',
    zIndex: '999',
    width: '300px',
    padding: '10px',
    minHeight: '210px',
    background: '#fff',
    borderRadius: '5px',
    position: 'relative',
    transition: 'opacity 200ms ease-in-out',
    boxShadow: 'rgb(0, 0, 0) 0px 3px 12px -6px',
};
StylesManager.defaultInfoBoxContentStyles = {
    height: '130px',
    overflowY: 'scroll',
    textAlign: 'center',
    borderRadius: '5px',
    border: '1px solid #eee'
};
StylesManager.defaultInfoBoxNextButtonStyles = {
    right: '0',
    bottom: '0',
    zIndex: '999',
    padding: '10px',
    marginRight: '10px',
    marginBottom: '10px',
    position: 'absolute',
};
StylesManager.defaultInfoBoxPrevButtonStyles = {
    left: '0',
    bottom: '0',
    zIndex: '999',
    padding: '10px',
    marginLeft: '10px',
    marginBottom: '10px',
    position: 'absolute',
};
exports.StylesManager = StylesManager;
//# sourceMappingURL=styles-manager.core.js.map