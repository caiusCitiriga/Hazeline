import { Observable, BehaviorSubject } from 'rxjs';

import { HazelineTutorialSection, GlobalStyles } from './interfaces/tutorial-section.interface';
import { HazelineTutorialSectionStatuses } from './enums/tutorial-section-statuses.enum';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';

import { HazelineLightbox } from './lightbox.core';
import { HazelineRenderer } from './renderer.core';
import { HazelineElementManager } from './element-manager.core';

export class HazelineRunner {

    private lightbox: HazelineLightbox;
    private renderer: HazelineRenderer;
    private elementManager: HazelineElementManager;

    private currentSectionStep = -1;

    public constructor(
        lightbox: HazelineLightbox,
        renderer: HazelineRenderer,
        elementManager: HazelineElementManager
    ) {
        this.lightbox = lightbox;
        this.renderer = renderer;
        this.elementManager = elementManager;
    }

    public runSection(section: HazelineTutorialSection): Observable<HazelineTutorialSectionStatus> {
        const status = new BehaviorSubject<HazelineTutorialSectionStatus>(null);
        if (!section) {
            status.next({
                status: HazelineTutorialSectionStatuses.errored,
                runningSection: section,
                runningStepInSection: null
            });
            return status;
        }

        this.currentSectionStep++;

        status.next({
            runningSection: section,
            status: HazelineTutorialSectionStatuses.started,
            runningStepInSection: section.steps[this.currentSectionStep]
        });

        window.addEventListener('resize', () => {
            const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(section.steps[this.currentSectionStep].elementSelector);
            this.renderer.updateElementsDimensions(wrapElementsDimensions);
            this.lightbox.updateLightboxPlacement(wrapElementsDimensions, HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStep].elementSelector));
        });

        window.addEventListener('scroll', () => {
            const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(section.steps[this.currentSectionStep].elementSelector);
            this.renderer.updateElementsDimensions(wrapElementsDimensions);
            this.lightbox.updateLightboxPlacement(wrapElementsDimensions, HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStep].elementSelector));
        });

        const wrapElementsDimensions = this.elementManager.getWrappingElementsDimensions(section.steps[this.currentSectionStep].elementSelector);

        this.renderer.wrapElement(wrapElementsDimensions);
        this.applyCustomStylesIfAny(section.globalStyling);
        this.lightbox.placeLightbox(wrapElementsDimensions, HazelineElementManager.getElementBySelector(section.steps[this.currentSectionStep].elementSelector));

        return status;
    }

    private applyCustomStylesIfAny(styles: GlobalStyles): void {
        if (!styles) {
            return;
        }

        if (styles.lightbox) {
            this.lightbox.applyStyles(styles.lightbox);
        }
    }

}