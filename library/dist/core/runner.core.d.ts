import { Observable } from 'rxjs';
import { HazelineTutorialSection } from './interfaces/tutorial-section.interface';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';
import { HazelineLightbox } from './lightbox.core';
import { HazelineOverlayRenderer } from './renderer.core';
import { HazelineElementManager } from './element-manager.core';
export declare class HazelineRunner {
    private lightbox;
    private elementManager;
    private overlayRenderer;
    private _$sectionStatus;
    private currentSectionStep;
    private currentSection;
    private windowResizeEvtListener;
    private windowScrollEvtListener;
    constructor(lightbox: HazelineLightbox, renderer: HazelineOverlayRenderer, elementManager: HazelineElementManager);
    endTutorial(): void;
    runSection(section: HazelineTutorialSection): Observable<HazelineTutorialSectionStatus>;
    private applyCustomOptionsIfAny;
    private startNextPrevButtonClicks;
    private startResponsiveListeners;
}
//# sourceMappingURL=runner.core.d.ts.map