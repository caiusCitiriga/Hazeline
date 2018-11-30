import { Observable } from 'rxjs';
import { HazelineTutorialStatus } from './core/interfaces/tutorial-status.interface';
import { HazelineTutorialSection } from './core/interfaces/tutorial-section.interface';
export declare class Hazeline {
    private runner;
    private lightbox;
    private renderer;
    private elementManager;
    private _$tutorialStatus;
    private tutorialSections;
    constructor();
    addSection(section: HazelineTutorialSection, clearPreviousSections?: boolean): void;
    clearSections(): void;
    runTutorial(sectionId: string): Observable<HazelineTutorialStatus>;
}
//# sourceMappingURL=hazeline.d.ts.map