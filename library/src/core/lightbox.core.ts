import { CSSRules } from './interfaces/css-rules.interface';
import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineElementsDefaultStyles } from './consts/elements-default-styles.const';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';

import { HazelineStylesManager } from './styles-manager.core';

export class HazelineLightbox {

    private lightbox: HTMLDivElement;

    public applyStyles(cssRules: CSSRules): void {
        this.lightbox = HazelineStylesManager.styleElement<HTMLDivElement>(this.lightbox, cssRules);
    }

    public placeLightbox(dimensions: HazelineWrappingElementsDimensions): void {
        this.lightbox = document.getElementById(HazelineElementsIds.lightbox) as HTMLDivElement;

        if (!this.lightbox) {
            this.lightbox = this.createLightbox();
            document.body.prepend(this.lightbox);
        }

        this.updateLightboxPlacement(dimensions);
    }

    public updateLightboxPlacement(dimensions: HazelineWrappingElementsDimensions): void {
        this.lightbox.style.top = `${dimensions.element.offsetTop + dimensions.element.height}px`;
        this.lightbox.style.left = `${(dimensions.element.offsetLeft) - (dimensions.element.width / 2)}px`;
    }

    private createLightbox(): HTMLDivElement {
        let lightboxElement = document.createElement('div');
        lightboxElement.id = HazelineElementsIds.lightbox;
        lightboxElement = HazelineStylesManager.styleElement<HTMLDivElement>(lightboxElement, HazelineElementsDefaultStyles.lightbox);

        return lightboxElement;
    }
}