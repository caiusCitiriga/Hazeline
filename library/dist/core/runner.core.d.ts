import { Observable } from 'rxjs';
import { HazelineTutorialSection } from './interfaces/tutorial-section.interface';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';
import { HazelineLightbox } from './lightbox.core';
import { HazelineRenderer } from './renderer.core';
import { HazelineElementManager } from './element-manager.core';
export declare class HazelineRunner {
    private lightbox;
    private renderer;
    private elementManager;
    private currentSectionStep;
    constructor(lightbox: HazelineLightbox, renderer: HazelineRenderer, elementManager: HazelineElementManager);
    runSection(section: HazelineTutorialSection): Observable<HazelineTutorialSectionStatus>;
    private applyCustomStylesIfAny;
}
//# sourceMappingURL=runner.core.d.ts.map