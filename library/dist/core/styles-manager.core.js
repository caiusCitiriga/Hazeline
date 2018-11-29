"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HazelineStylesManager = /** @class */ (function () {
    function HazelineStylesManager() {
    }
    HazelineStylesManager.styleElement = function (element, cssRules) {
        if (!cssRules) {
            return element;
        }
        Object.keys(cssRules).forEach(function (rule) {
            element.style[rule] = cssRules[rule];
        });
        return element;
    };
    return HazelineStylesManager;
}());
exports.HazelineStylesManager = HazelineStylesManager;
//# sourceMappingURL=styles-manager.core.js.map