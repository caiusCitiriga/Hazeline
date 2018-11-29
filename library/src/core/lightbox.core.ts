import Tether from 'tether';

import { HazelineCSSRules } from './interfaces/css-rules.interface';
import { HazelineElementsIds } from './enums/elements-ids.enum';
import { HazelineElementsDefaultStyles } from './consts/elements-default-styles.const';
import { HazelineWrappingElementsDimensions } from './interfaces/wrapping-elements-dimensions.interface';

import { HazelineStylesManager } from './styles-manager.core';
import { HazelineLightboxOptions } from './interfaces/tutorial-section.interface';

export class HazelineLightbox {

    private tether: Tether;
    private lightbox: HTMLDivElement;
    private ligthboxOptions: HazelineLightboxOptions;

    public applyStyles(lightboxOpts: HazelineLightboxOptions): void {
        this.ligthboxOptions = lightboxOpts;
    }

    public placeLightbox(dimensions: HazelineWrappingElementsDimensions, target: HTMLElement): void {
        this.lightbox = document.getElementById(HazelineElementsIds.lightbox) as HTMLDivElement;

        if (!this.lightbox) {
            this.lightbox = this.createLightbox();
            document.body.prepend(this.lightbox);
        }

        this.lightbox = HazelineStylesManager.styleElement<HTMLDivElement>(this.lightbox, this.ligthboxOptions.ligthboxWrapperCSS);
        this.updateLightboxPlacement(dimensions, target);
    }

    public updateLightboxPlacement(dimensions: HazelineWrappingElementsDimensions, target: HTMLElement): void {
        const offset = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.offset
            ? this.ligthboxOptions.positioning.offset
            : HazelineElementsDefaultStyles.lightbox.positioning.offset;

        const attachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.attachment
            ? this.ligthboxOptions.positioning.attachment
            : HazelineElementsDefaultStyles.lightbox.positioning.attachment;

        const targetAttachment = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.targetAttachment
            ? this.ligthboxOptions.positioning.targetAttachment
            : HazelineElementsDefaultStyles.lightbox.positioning.targetAttachment;

        const constraints = this.ligthboxOptions && this.ligthboxOptions.positioning && this.ligthboxOptions.positioning.constraints
            ? this.ligthboxOptions.positioning.constraints
            : HazelineElementsDefaultStyles.lightbox.positioning.constraints;

        this.tether = null;
        this.tether = new Tether({
            target: target,
            offset: offset,
            element: this.lightbox,
            attachment: attachment,
            constraints: constraints,
            targetAttachment: targetAttachment,
        });

        this.tether.position();
    }

    private createLightbox(): HTMLDivElement {
        let lightboxElement = document.createElement('div');
        lightboxElement.id = HazelineElementsIds.lightbox;
        lightboxElement = HazelineStylesManager.styleElement<HTMLDivElement>(lightboxElement, HazelineElementsDefaultStyles.lightbox.ligthboxWrapperCSS);

        return lightboxElement;
    }
}