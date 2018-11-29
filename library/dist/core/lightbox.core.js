"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var elements_ids_enum_1 = require("./enums/elements-ids.enum");
var elements_default_styles_const_1 = require("./consts/elements-default-styles.const");
var styles_manager_core_1 = require("./styles-manager.core");
var HazelineLightbox = /** @class */ (function () {
    function HazelineLightbox() {
    }
    HazelineLightbox.prototype.applyStyles = function (cssRules) {
        this.lightbox = styles_manager_core_1.HazelineStylesManager.styleElement(this.lightbox, cssRules);
    };
    HazelineLightbox.prototype.placeLightbox = function (dimensions) {
        this.lightbox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.lightbox);
        if (!this.lightbox) {
            this.lightbox = this.createLightbox();
            document.body.prepend(this.lightbox);
        }
        this.updateLightboxPlacement(dimensions);
    };
    HazelineLightbox.prototype.updateLightboxPlacement = function (dimensions) {
        this.lightbox.style.top = dimensions.element.offsetTop + dimensions.element.height + "px";
        this.lightbox.style.left = (dimensions.element.offsetLeft) - (dimensions.element.width / 2) + "px";
    };
    HazelineLightbox.prototype.createLightbox = function () {
        var lightboxElement = document.createElement('div');
        lightboxElement.id = elements_ids_enum_1.HazelineElementsIds.lightbox;
        lightboxElement = styles_manager_core_1.HazelineStylesManager.styleElement(lightboxElement, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox);
        return lightboxElement;
    };
    return HazelineLightbox;
}());
exports.HazelineLightbox = HazelineLightbox;
//# sourceMappingURL=lightbox.core.js.map