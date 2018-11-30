import { Observable } from 'rxjs';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';
import { HazelineTutorialSection } from './interfaces/tutorial-section.interface';
import { HazelineElementManager } from './element-manager.core';
import { HazelineOverlayRenderer } from './overlay-renderer.core';
import { HazelineLightboxRenderer } from './lightbox-renderer.core';
export declare class HazelineRunner {
    private lightbox;
    private elementManager;
    private overlayRenderer;
    private _$sectionStatus;
    private currentSectionStepIdx;
    private currentSection;
    private windowResizeEvtListener;
    private windowScrollEvtListener;
    constructor(lightbox: HazelineLightboxRenderer, renderer: HazelineOverlayRenderer, elementManager: HazelineElementManager);
    endTutorial(): void;
    runSection(section: HazelineTutorialSection): Observable<HazelineTutorialSectionStatus>;
    private applyCustomOptionsIfAny;
    private startNextPrevButtonClicks;
    private startResponsiveListeners;
}
//# sourceMappingURL=runner.core.d.ts.map