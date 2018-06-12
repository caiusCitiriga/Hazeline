import $ from 'jquery';

import { SectionStep } from "../interfaces/section-step.interface";
import { BehaviorSubject, Observable } from 'rxjs';

export class Drawer {

    private static viewportSizes: ViewportSizes;
    private static windowResizeListenerAttached = false;

    //  Cloth stuff
    private static clothZIndex = '999';
    private static clothId = 'HAZELINE-TUTORIAL-CLOTH';

    static drawBlocksAroundTutorialStepElement(step: SectionStep): any {
        this.cloneStepHTMLElement(step);
    }

    private static getViewportSizes(): ViewportSizes {
        this.viewportSizes = {
            width: $(window).width(),
            height: $(window).height(),
        };

        return this.viewportSizes;
    }

    private static cloneStepHTMLElement(step: SectionStep): void {
        const element = $(step.selector);
        element.css('opacity', 0);
        element.css('position', 'relative');
        element.css('z-index', this.clothZIndex);
        element.css('transition', 'opacity 120ms ease-in-out');

        setTimeout(() => {
            element.css('opacity', 1);
        }, 500);
    }

    public static drawCloth(): Observable<boolean> {
        const obs = new BehaviorSubject(false);

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

        $('body').prepend(cloth);

        setTimeout(() => {
            document.getElementById(this.clothId).style.opacity = '1';
            obs.next(true);
            obs.complete();

            if (!this.windowResizeListenerAttached) {
                window.onresize = () => {
                    this.updateClothSize();
                    this.windowResizeListenerAttached = true;
                }
            }
        }, 500);

        return obs;
    }

    private static updateClothSize(): void {
        const newSizes = this.getViewportSizes();

        document.getElementById(this.clothId).style.width = `${newSizes.width}px`;
        document.getElementById(this.clothId).style.height = `${newSizes.height}px`;
    }

}

interface ViewportSizes {
    width: number;
    height: number;
}

interface TutorialClothDimensions {
    top: BoxElementDimensions;
    left: BoxElementDimensions;
    right: BoxElementDimensions;
    bottom: BoxElementDimensions;
}

interface BoxElementDimensions {
    width: number;
    height: number;
}
