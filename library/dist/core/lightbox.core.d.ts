import { CSSRules } from './interfaces/css-rules.interface';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
export declare class HazelineLightbox {
    private lightbox;
    applyStyles(cssRules: CSSRules): void;
    placeLightbox(dimensions: HazelineWrappingElementsDimensions): void;
    updateLightboxPlacement(dimensions: HazelineWrappingElementsDimensions): void;
    private createLightbox;
}
//# sourceMappingURL=lightbox.core.d.ts.map