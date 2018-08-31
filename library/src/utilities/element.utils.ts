import { ElementCoordinates } from '../interfaces/element-coordinates.interface';

export class ElementUtils {
    private static currentElementCoordinates: ElementCoordinates = {
        x: null,
        y: null,
        w: null,
        h: null,
    };

    public static getHTMLElementBySelector(selector: string): HTMLElement {
        const element = document.querySelector(selector) as HTMLElement;
        if (!element) {
            throw new Error(`HAZELINE-ELEMENT-UTILS: Cannot find the [${selector}] element`);
        }

        return element;
    }

    public static getCoordinates(element: HTMLElement): ElementCoordinates {
        this.currentElementCoordinates.y = element.getBoundingClientRect().top;
        this.currentElementCoordinates.x = element.getBoundingClientRect().left;
        this.currentElementCoordinates.w = element.getBoundingClientRect().width;
        this.currentElementCoordinates.h = element.getBoundingClientRect().height;

        return this.currentElementCoordinates;
    }
}