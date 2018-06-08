import $ from 'jquery';

import { TutorialSection } from "../interfaces/tutorial-section.interface";

export class TutorialRunner {

    public run(section: TutorialSection): void {
        if (!section) {
            console.log('HAZELINE: Cannot run a null section');
            return;
        }

        console.log(`Running section: ${section.id}`);
    }

}