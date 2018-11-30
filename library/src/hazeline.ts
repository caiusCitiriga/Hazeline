import { tap, filter } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { HazelineTutorialStatus } from './core/interfaces/tutorial-status.interface';
import { HazelineTutorialSection } from './core/interfaces/tutorial-section.interface';

import { HazelineRunner } from './core/runner.core';
import { HazelineElementManager } from './core/element-manager.core';
import { HazelineOverlayRenderer } from './core/overlay-renderer.core';
import { HazelineLightboxRenderer } from './core/lightbox-renderer.core';
import { HazelineTutorialStatuses } from './core/enums/tutorial-statuses.enum';
import { HazelineTutorialSectionStatuses } from './core/enums/tutorial-section-statuses.enum';

export class Hazeline {

    private runner: HazelineRunner;
    private lightbox: HazelineLightboxRenderer;
    private renderer: HazelineOverlayRenderer;
    private elementManager: HazelineElementManager;

    private _$tutorialStatus = new BehaviorSubject<HazelineTutorialStatus>(null);

    private tutorialSections = <HazelineTutorialSection[]>[];

    public constructor() {
        this.lightbox = new HazelineLightboxRenderer();
        this.renderer = new HazelineOverlayRenderer();
        this.elementManager = new HazelineElementManager();

        this.runner = new HazelineRunner(
            this.lightbox,
            this.renderer,
            this.elementManager
        );
    }

    public addSection(section: HazelineTutorialSection, clearPreviousSections = false): void {
        if (!!clearPreviousSections) {
            this.clearSections();
        }

        this.tutorialSections.push(section);
    }

    public clearSections(): void {
        this.tutorialSections = [];
    }

    public runTutorial(sectionId: string): Observable<HazelineTutorialStatus> {
        const sectionToRun = this.tutorialSections.find(s => s.id === sectionId);

        if (!sectionToRun) {
            this._$tutorialStatus.next({
                runningSection: null,
                runningStepInSection: null,
                status: HazelineTutorialStatuses.errored,
            });
        }

        this.runner.runSection(sectionToRun)
            .pipe(
                filter(status => !!status),
                tap(status => {
                    if (status.status === HazelineTutorialSectionStatuses.errored) {
                        this._$tutorialStatus.next({
                            status: HazelineTutorialStatuses.errored,
                            runningSection: status.runningSection,
                            runningStepInSection: status.runningStepInSection
                        });
                        this.runner.endTutorial();
                    }
                    if (status.status === HazelineTutorialSectionStatuses.started) {
                        this._$tutorialStatus.next({
                            status: HazelineTutorialStatuses.started,
                            runningSection: status.runningSection,
                            runningStepInSection: status.runningStepInSection
                        });
                    }
                    if (status.status === HazelineTutorialSectionStatuses.ended) {
                        this._$tutorialStatus.next({
                            status: HazelineTutorialStatuses.stopped,
                            runningSection: status.runningSection,
                            runningStepInSection: status.runningStepInSection
                        });
                        this.runner.endTutorial();

                    }
                })
            ).subscribe();

        return this._$tutorialStatus;
    }

}