"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tether_1 = __importDefault(require("tether"));
var elements_ids_enum_1 = require("./enums/elements-ids.enum");
var elements_default_styles_const_1 = require("./consts/elements-default-styles.const");
var styles_manager_core_1 = require("./styles-manager.core");
var HazelineLightbox = /** @class */ (function () {
    function HazelineLightbox() {
    }
    HazelineLightbox.prototype.applyStyles = function (lightboxOpts) {
        this.ligthboxOptions = lightboxOpts;
    };
    HazelineLightbox.prototype.placeLightbox = function (dimensions, target) {
        this.lightbox = document.getElementById(elements_ids_enum_1.HazelineElementsIds.lightbox);
        if (!this.lightbox) {
            this.lightbox = this.createLightbox();
            document.body.prepend(this.lightbox);
        }
        this.lightbox = styles_manager_core_1.HazelineStylesManager.styleElement(this.lightbox, this.ligthboxOptions.ligthboxWrapperCSS);
        this.updateLightboxPlacement(dimensions, target);
    };
    HazelineLightbox.prototype.updateLightboxPlacement = function (dimensions, target) {
        var offset = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.offset
            ? this.ligthboxOptions.positioning.offset
            : elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.positioning.offset;
        var attachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.attachment
            ? this.ligthboxOptions.positioning.attachment
            : elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.positioning.attachment;
        var targetAttachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.targetAttachment
            ? this.ligthboxOptions.positioning.targetAttachment
            : elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.positioning.targetAttachment;
        var constraints = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.constraints
            ? this.ligthboxOptions.positioning.constraints
            : elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.positioning.constraints;
        this.tether = null;
        this.tether = new tether_1.default({
            target: target,
            offset: offset,
            element: this.lightbox,
            attachment: attachment,
            constraints: constraints,
            targetAttachment: targetAttachment,
        });
        this.tether.position();
    };
    HazelineLightbox.prototype.createLightbox = function () {
        var lightboxElement = document.createElement('div');
        lightboxElement.id = elements_ids_enum_1.HazelineElementsIds.lightbox;
        lightboxElement = styles_manager_core_1.HazelineStylesManager.styleElement(lightboxElement, elements_default_styles_const_1.HazelineElementsDefaultStyles.lightbox.ligthboxWrapperCSS);
        return lightboxElement;
    };
    return HazelineLightbox;
}());
exports.HazelineLightbox = HazelineLightbox;
//# sourceMappingURL=lightbox.core.js.map