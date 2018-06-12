"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const rxjs_1 = require("rxjs");
class Drawer {
    static drawBlocksAroundTutorialStepElement(step) {
        this.cloneStepHTMLElement(step);
    }
    static getViewportSizes() {
        this.viewportSizes = {
            width: jquery_1.default(window).width(),
            height: jquery_1.default(window).height(),
        };
        return this.viewportSizes;
    }
    static cloneStepHTMLElement(step) {
        const element = jquery_1.default(step.selector);
        element.css('opacity', 0);
        element.css('position', 'relative');
        element.css('z-index', this.clothZIndex);
        element.css('transition', 'opacity 120ms ease-in-out');
        setTimeout(() => {
            element.css('opacity', 1);
        }, 120);
        // const elementClone = $(step.selector).clone(true, true);
        // const elementPosition = $(step.selector)[0].getBoundingClientRect();
        // elementClone.css('color', 'red');
        // elementClone.css('font-size', '40px');
        // elementClone.css('position', 'absolute');
        // elementClone.css('z-index', this.clothZIndex);
        // elementClone.css('transition', 'opacity 120ms ease-in-out');
        // elementClone.css('top', elementPosition.top);
        // elementClone.css('left', elementPosition.left);
        // elementClone.css('width', elementPosition.width);
        // elementClone.css('height', elementPosition.height);
        // elementClone.css('opacity', 0);
        // $('body').append(elementClone);
        // setTimeout(() => {
        //     elementClone.css('opacity', 1);
        // }, 120);
    }
    static drawCloth() {
        const obs = new rxjs_1.BehaviorSubject(false);
        const viewportSizes = this.getViewportSizes();
        const cloth = document.createElement('div');
        cloth.setAttribute('id', this.clothId);
        cloth.style.top = '0';
        cloth.style.left = '0';
        cloth.style.opacity = '0';
        cloth.style.position = 'absolute';
        cloth.style.zIndex = this.clothZIndex;
        cloth.style.background = 'rgba(0,0,0,0.8)';
        cloth.style.transition = 'opacity 120ms ease-in-out';
        cloth.style.width = `${viewportSizes.width.toString()}px`;
        cloth.style.height = `${viewportSizes.height.toString()}px`;
        jquery_1.default('body').prepend(cloth);
        setTimeout(() => {
            document.getElementById(this.clothId).style.opacity = '1';
            obs.next(true);
            obs.complete();
        }, 500);
        return obs;
    }
}
//  Cloth stuff
Drawer.clothZIndex = '999';
Drawer.clothId = 'HAZELINE-TUTORIAL-CLOTH';
exports.Drawer = Drawer;
//# sourceMappingURL=drawer.core.js.map