import { Observable } from 'rxjs';
import { HazelineTutorialSection } from './interfaces/tutorial-section.interface';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';
import { HazelineLightbox } from './lightbox.core';
import { HazelineRenderer } from './renderer.core';
import { HazelineStylesManager } from './styles-manager.core';
import { HazelineElementManager } from './element-manager.core';
export declare class HazelineRunner {
    private lightbox;
    private renderer;
    private stylesManager;
    private elementManager;
    private currentSectionStep;
    constructor(lightbox: HazelineLightbox, renderer: HazelineRenderer, stylesManager: HazelineStylesManager, elementManager: HazelineElementManager);
    runSection(section: HazelineTutorialSection): Observable<HazelineTutorialSectionStatus>;
}
//# sourceMappingURL=runner.core.d.ts.map