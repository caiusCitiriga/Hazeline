"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//  Consts imports
const default_styles_const_1 = require("../consts/default-styles.const");
//  Enums imports
const info_box_placement_enum_1 = require("../enums/info-box-placement.enum");
class StylesManager {
    static set deafultInfoBoxStyle(value) { this.defaultInfoBoxStyles = Object.assign(this.defaultInfoBoxStyles, value); }
    static set defaultPleaseWaitStyle(value) { this.defaultPleaseWaitStyles = Object.assign(this.defaultPleaseWaitStyles, value); }
    static set defaultInfoBoxContentStyle(value) { this.defaultInfoBoxContentStyles = Object.assign(this.defaultInfoBoxContentStyles, value); }
    static set defaultTutorialOverlayStyle(value) { this.defaultTutorialOverlayStyles = Object.assign(this.defaultTutorialOverlayStyles, value); }
    static set defaultInfoBoxNextBtnStyle(value) { this.defaultInfoBoxNextButtonStyles = Object.assign(this.defaultInfoBoxNextButtonStyles, value); }
    static set defaultInfoBoxPrevBtnStyle(value) { this.defaultInfoBoxPrevButtonStyles = Object.assign(this.defaultInfoBoxPrevButtonStyles, value); }
    static set defaultTutorialCloseButtonStyle(value) { this.defaultTutorialCloseButtonStyles = Object.assign(this.defaultTutorialCloseButtonStyles, value); }
    ////////////////////////////////////////////////////////////////
    //  General controls
    ////////////////////////////////////////////////////////////////
    static resetStyles() {
        this.defaultInfoBoxStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBox);
        this.defaultPleaseWaitStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.pleaseWait);
        this.defaultTutorialOverlayStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.tutorialOverlay);
        this.defaultInfoBoxContentStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxContent);
        this.defaultTutorialCloseButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.tutorialCloseBtn);
        this.defaultInfoBoxPrevButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxPreviousBtn);
        this.defaultInfoBoxNextButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxNextOrEndBtn);
    }
    static applyStepCustomStylesIfAny(customStyles) {
        if (!customStyles) {
            return;
        }
        if (customStyles.infoBox) {
            this.deafultInfoBoxStyle = customStyles.infoBox;
        }
        if (customStyles.pleaseWait) {
            this.defaultPleaseWaitStyle = customStyles.pleaseWait;
        }
        if (customStyles.infoBoxContent) {
            this.defaultInfoBoxContentStyle = customStyles.infoBoxContent;
        }
        if (customStyles.infoBoxPreviousBtn) {
            this.defaultInfoBoxPrevBtnStyle = customStyles.infoBoxPreviousBtn;
        }
        if (customStyles.tutorialCloseBtn) {
            this.defaultTutorialCloseButtonStyle = customStyles.tutorialCloseBtn;
        }
        if (customStyles.infoBoxNextOrEndBtn) {
            this.defaultInfoBoxNextBtnStyle = customStyles.infoBoxNextOrEndBtn;
        }
    }
    ////////////////////////////////////////////////////////////////
    //  Overlay controls
    ////////////////////////////////////////////////////////////////
    static updateOverlaySize(overlay) {
        const newSizes = this.getViewportSizes();
        overlay.style.width = `${newSizes.width}px`;
        overlay.style.height = `${newSizes.height}px`;
    }
    static revealOverlay(overlay) {
        overlay.style.opacity = '1';
    }
    ////////////////////////////////////////////////////////////////
    //  Style setters
    ////////////////////////////////////////////////////////////////
    static styleTutorialOverlay(overlay) {
        this.getViewportSizes();
        overlay = this.applyStyles(overlay, this.defaultTutorialOverlayStyles);
        overlay.setAttribute('id', this.overlayId);
        overlay.style.width = `${this.viewportSizes.width.toString()}px`;
        overlay.style.height = `${this.viewportSizes.height.toString()}px`;
        return overlay;
    }
    static stylePleaseWait(pleaseWaitElement, alternativeTextContent) {
        pleaseWaitElement = this.applyStyles(pleaseWaitElement, this.defaultPleaseWaitStyles);
        pleaseWaitElement = this.applyCommonProperties(this.pleaseWaitId, alternativeTextContent || this.defaultPleaseWaitText, pleaseWaitElement);
        return pleaseWaitElement;
    }
    static styleTutorialCloseButton(el) {
        el = this.applyStyles(el, this.defaultTutorialCloseButtonStyles);
        el = this.applyCommonProperties(this.tutorialCloseBtnId, 'X', el);
        return el;
    }
    static styleInfoBox(el, infoboxPlacement) {
        el = this.applyStyles(el, this.defaultInfoBoxStyles);
        el = this.applyCommonProperties(this.infoBoxId, null, el);
        el = this.applyInfoBoxMargins(el, this.getMarginSettingsBasedOnPositioning(infoboxPlacement));
        return el;
    }
    static styleInfoBoxContent(el, htmlTextContent) {
        el = this.applyStyles(el, this.defaultInfoBoxContentStyles);
        el = this.applyCommonProperties(this.infoStepBoxContentElId, htmlTextContent || null, el);
        return el;
    }
    static styleInfoBoxNextBtn(el, alternativeTextContent, isLastStep) {
        el = this.applyStyles(el, this.defaultInfoBoxNextButtonStyles);
        el = this.applyCommonProperties(this.nextStepBtnId, alternativeTextContent || isLastStep ? this.defaultEndButtonText : this.defaultNextButtonText, el);
        return el;
    }
    static styleInfoBoxPrevBtn(el, alternativeTextContent) {
        el = this.applyStyles(el, this.defaultInfoBoxPrevButtonStyles);
        el = this.applyCommonProperties(this.prevStepBtnId, alternativeTextContent || this.defaultPreviousButtonText, el);
        return el;
    }
    ////////////////////////////////////////////////////////////////
    //  Classes application
    ////////////////////////////////////////////////////////////////
    static applyPleaseWaitClasses(el, classes, alternativeTextContent) {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.pleaseWaitId, alternativeTextContent || this.defaultPleaseWaitText, el);
        return el;
    }
    static applyInfoBoxClasses(el, classes, infoboxPlacement) {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.infoBoxId, null, el);
        el = this.applyInfoBoxMargins(el, this.getMarginSettingsBasedOnPositioning(infoboxPlacement));
        return el;
    }
    static applyTutorialCloseBtnClasses(el, classes) {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.tutorialCloseBtnId, 'X', el);
        return el;
    }
    static applyInfoBoxNextBtnClasses(el, classes, alternativeTextContent, isLastStep) {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.nextStepBtnId, alternativeTextContent || isLastStep ? this.defaultEndButtonText : this.defaultNextButtonText, el);
        return el;
    }
    static applyInfoBoxPrevBtnClasses(el, classes, alternativeTextContent) {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.prevStepBtnId, alternativeTextContent || this.defaultPreviousButtonText, el);
        return el;
    }
    static applyInfoBoxContentClasses(el, classes, htmlTextContent) {
        el = this.applyClasses(el, classes);
        el = this.applyCommonProperties(this.infoStepBoxContentElId, htmlTextContent || null, el);
        return el;
    }
    static applyClasses(element, classes) {
        element.removeAttribute('style');
        classes.forEach(className => element.setAttribute('class', className));
        return element;
    }
    ////////////////////////////////////////////////////////////////
    //  Internal utility methods
    ////////////////////////////////////////////////////////////////
    static getMarginSettingsBasedOnPositioning(infoBoxPlacement) {
        const result = {
            margin: null,
            value: null,
        };
        switch (infoBoxPlacement) {
            case info_box_placement_enum_1.InfoBoxPlacement.LEFT:
                result.margin = 'marginLeft';
                result.value = `-${this.infoBoxMargin}`;
                break;
            case info_box_placement_enum_1.InfoBoxPlacement.ABOVE:
                result.margin = 'marginTop';
                result.value = `-${this.infoBoxMargin}`;
                break;
            case info_box_placement_enum_1.InfoBoxPlacement.RIGHT:
                result.margin = 'marginLeft';
                result.value = this.infoBoxMargin;
                break;
            case info_box_placement_enum_1.InfoBoxPlacement.BELOW:
            default:
                result.margin = 'marginTop';
                result.value = this.infoBoxMargin;
                break;
        }
        return result;
    }
    static applyInfoBoxMargins(el, margins) {
        el.style[margins.margin] = margins.value;
        return el;
    }
    static applyCommonProperties(id, textContent, el) {
        el = this.setAttribute('id', id, el);
        el = this.setHTMLTextContent(el, textContent);
        return el;
    }
    static applyStyles(element, stylesSet) {
        const stylesKeys = Object.keys(stylesSet);
        stylesKeys.forEach(styleKey => {
            element.style[styleKey] = stylesSet[styleKey];
        });
        return element;
    }
    static getViewportSizes() {
        this.viewportSizes = {
            width: $(window).width(),
            height: $(window).height(),
        };
        return this.viewportSizes;
    }
    static setAttribute(attr, val, el) {
        el.setAttribute(attr, val);
        return el;
    }
    static setHTMLTextContent(el, value) {
        if (!value) {
            return el;
        }
        el.innerHTML = value;
        return el;
    }
}
StylesManager.overlayId = 'HAZELINE-TUTORIAL-OVERLAY';
StylesManager.pleaseWaitId = 'HAZELINE-PLEASE-WAIT';
StylesManager.infoBoxId = 'HAZELINE-TUTORIAL-INFO-BOX';
StylesManager.tutorialCloseBtnId = 'HAZELINE-TUTORIAL-CLOSE';
StylesManager.nextStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-NEXT-STEP';
StylesManager.prevStepBtnId = 'HAZELINE-TUTORIAL-INFO-BOX-PREV-STEP';
StylesManager.infoStepBoxContentElId = 'HAZELINE-TUTORIAL-INFO-BOX-CONTENT';
StylesManager.infoBoxMargin = '10px';
StylesManager.defaultEndButtonText = 'End';
StylesManager.defaultNextButtonText = 'Next';
StylesManager.defaultPreviousButtonText = 'Previous';
StylesManager.defaultPleaseWaitText = 'Please wait...';
StylesManager.defaultInfoBoxStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBox);
StylesManager.defaultPleaseWaitStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.pleaseWait);
StylesManager.defaultTutorialOverlayStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.tutorialOverlay);
StylesManager.defaultInfoBoxContentStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxContent);
StylesManager.defaultTutorialCloseButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.tutorialCloseBtn);
StylesManager.defaultInfoBoxPrevButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxPreviousBtn);
StylesManager.defaultInfoBoxNextButtonStyles = Object.assign({}, default_styles_const_1.DEFAULT_STYLES.infoBoxNextOrEndBtn);
exports.StylesManager = StylesManager;
