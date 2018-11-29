import { Observable, BehaviorSubject } from 'rxjs';

import { HazelineTutorialSection } from './interfaces/tutorial-section.interface';
import { HazelineTutorialSectionStatuses } from './enums/tutorial-section-statuses.enum';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';

import { HazelineLightbox } from './lightbox.core';
import { HazelineRenderer } from './renderer.core';
import { HazelineStylesManager } from './styles-manager.core';
import { HazelineElementManager } from './element-manager.core';

export class HazelineRunner {

    private lightbox: HazelineLightbox;
    private renderer: HazelineRenderer;
    private stylesManager: HazelineStylesManager;
    private elementManager: HazelineElementManager;

    private currentSectionStep = -1;

    public constructor(
        lightbox: HazelineLightbox,
        renderer: HazelineRenderer,
        stylesManager: HazelineStylesManager,
        elementManager: HazelineElementManager
    ) {
        this.lightbox = lightbox;
        this.renderer = renderer;
        this.stylesManager = stylesManager;
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

        const wrappingElementsDimensions = this.elementManager
            .getWrappingElementsDimensions(section.steps[this.currentSectionStep].elementSelector);

        console.log(wrappingElementsDimensions);

        return status;
    }

}