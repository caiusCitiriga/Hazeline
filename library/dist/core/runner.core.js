"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var tutorial_section_statuses_enum_1 = require("./enums/tutorial-section-statuses.enum");
var HazelineRunner = /** @class */ (function () {
    function HazelineRunner(lightbox, renderer, elementManager) {
        this.currentSectionStep = -1;
        this.lightbox = lightbox;
        this.renderer = renderer;
        this.elementManager = elementManager;
    }
    HazelineRunner.prototype.runSection = function (section) {
        var _this = this;
        var status = new rxjs_1.BehaviorSubject(null);
        if (!section) {
            status.next({
                status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.errored,
                runningSection: section,
                runningStepInSection: null
            });
            return status;
        }
        this.currentSectionStep++;
        status.next({
            runningSection: section,
            status: tutorial_section_statuses_enum_1.HazelineTutorialSectionStatuses.started,
            runningStepInSection: section.steps[this.currentSectionStep]
        });
        window.addEventListener('resize', function () {
            var wrapElementsDimensions = _this.elementManager.getWrappingElementsDimensions(section.steps[_this.currentSectionStep].elementSelector);
            _this.renderer.updateElementsDimensions(wrapElementsDimensions);
            _this.lightbox.updateLightboxPlacement(wrapElementsDimensions);
        });
        window.addEventListener('scroll', function () {
            var wrapElementsDimensions = _this.elementManager.getWrappingElementsDimensions(section.steps[_this.currentSectionStep].elementSelector);
            _this.renderer.updateElementsDimensions(wrapElementsDimensions);
            _this.lightbox.updateLightboxPlacement(wrapElementsDimensions);
        });
        var wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(section.steps[this.currentSectionStep].elementSelector);
        this.renderer.wrapElement(wrapElementsDimensions);
        this.lightbox.placeLightbox(wrapElementsDimensions);
        this.applyCustomStylesIfAny(section.globalStyling);
        return status;
    };
    HazelineRunner.prototype.applyCustomStylesIfAny = function (styles) {
        if (!styles) {
            return;
        }
        if (styles.lightbox) {
            this.lightbox.applyStyles(styles.lightbox);
        }
    };
    return HazelineRunner;
}());
exports.HazelineRunner = HazelineRunner;
//# sourceMappingURL=runner.core.js.map