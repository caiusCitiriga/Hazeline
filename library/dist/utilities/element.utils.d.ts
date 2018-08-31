import { ElementCoordinates } from '../interfaces/element-coordinates.interface';
export declare class ElementUtils {
    private static currentElementCoordinates;
    static fetchHTMLElementBySelector(selector: string): HTMLElement;
    static getCoordinates(element: HTMLElement): ElementCoordinates;
}
