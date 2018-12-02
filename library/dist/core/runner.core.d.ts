import { Observable } from 'rxjs';
import { HazelineTutorialSection } from './interfaces/tutorial-section.interface';
import { HazelineTutorialSectionStatus } from './interfaces/tutorial-section-status.interface';
import { HazelineElementManager } from './element-manager.core';
import { HazelineOverlayRenderer } from './overlay-renderer.core';
import { HazelineLightboxRenderer } from './lightbox-renderer.core';
export declare class HazelineRunner {
    private _$onScrollEventsStream;
    private _$runWhenSectionStepsArePopulated;
    private _$sectionStatus;
    private elementManager;
    private overlayRenderer;
    private lightboxRenderer;
    private currentSectionStepIdx;
    private previousSectionStepIdx;
    private currentSection;
    private isFirstStep;
    private isLastStep;
    private thisStepUsesTextualOverlay;
    private previousStepUsedTextualOverlay;
    constructor(lightbox: HazelineLightboxRenderer, renderer: HazelineOverlayRenderer, elementManager: HazelineElementManager);
    endTutorial(): void;
    runSection(section: HazelineTutorialSection): Observable<HazelineTutorialSectionStatus>;
    private actualWindowScrollEvtListener;
    private applyCustomOptionsIfAny;
    private startNextPrevButtonClicks;
    private sectionCanBeRan;
    private startResponsiveListeners;
    private windowResizeEvtListener;
    private windowScrollEventThrottler;
}
//# sourceMappingURL=runner.core.d.ts.map