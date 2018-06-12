import { Hazeline } from 'hazeline';
import $ from 'jquery';

class HazelineDemo {

    private haze: Hazeline;

    //  Controls
    private startDemoBtn: HTMLButtonElement;

    public constructor() {
        this.haze = new Hazeline();
        this.collectControlsElementsInstances();
        this.attachListenersOnControls();
        this.attachListenersOnTutorialItems();
    }

    private collectControlsElementsInstances(): void {
        this.startDemoBtn = document.getElementById('startDemoBtn') as HTMLButtonElement;
    }

    private attachListenersOnControls(): void {
        this.startDemoBtn.addEventListener('click', e => {
            this.runDemo();
        });
    }

    private attachListenersOnTutorialItems(): void {
        document.getElementById('simpleItem02').addEventListener('click', (e: MouseEvent) => {
            console.log('Clicked');
            console.log(e);
        });
    }

    public runDemo(): void {
        this.setupSections();
        this.haze.startTutorialSection('section-one');
    }

    private setupSections(): void {
        this.haze.addTutorialSection({
            id: 'section-one',
            steps: [
                {
                    id: 'step-one',
                    selector: '#simpleItem01'
                },
                {
                    id: 'step-two',
                    selector: '#simpleItem02'
                },
                {
                    id: 'step-three',
                    selector: '#simpleItem03'
                }
            ]
        });
    }
}

$(document).ready(() => {
    const demo = new HazelineDemo();
});