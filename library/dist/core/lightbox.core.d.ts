import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';
import { HazelineLightboxOptions } from './interfaces/tutorial-section.interface';
export declare class HazelineLightbox {
    private tether;
    private lightbox;
    private ligthboxOptions;
    applyStyles(lightboxOpts: HazelineLightboxOptions): void;
    placeLightbox(dimensions: HazelineWrappingElementsDimensions, target: HTMLElement): void;
    updateLightboxPlacement(dimensions: HazelineWrappingElementsDimensions, target: HTMLElement): void;
    private createLightbox;
}
//# sourceMappingURL=lightbox.core.d.ts.map