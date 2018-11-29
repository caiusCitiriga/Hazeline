import { CSSRules } from './interfaces/css-rules.interface';

export class HazelineStylesManager {

    public static styleElement<T>(element: T, cssRules: CSSRules): T {
        Object.keys(cssRules).forEach(rule => {
            (element as any).style[rule] = cssRules[rule];
        });

        return element;
    }

}