import $ from 'jquery';
import { Hazeline } from 'hazeline';

import { InfoBoxPlacement } from 'hazeline/dist/enums/info-box-placement.enum';

class HazelineDemo {

    private haze: Hazeline;

    //  Controls
    private startDemoBtn: HTMLButtonElement;

    public constructor() {
        this.haze = new Hazeline();
        this.collectControlsElementsInstances();
        this.attachListenersOnControls();
        this.attachListenersOnTutorialItems();

        //  Doing so will override ALL the styles
        this.haze.setTutorialOverlayCSSRules({
            backgroundColor: 'rgba(0,0,0,.9)',
        });
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
                    selector: '#simpleItem01',
                    text: 'Step one description',
                    infoBoxPlacement: 'right',
                    nextBtnText: 'Successivo',
                },
                {
                    id: 'step-two',
                    selector: '#simpleItem02',
                    text: 'You can click on this item, and the event listener attached to it will fire.',
                    nextBtnText: 'Avanti',
                    prevBtnText: 'Indietro'
                },
                {
                    id: 'step-three',
                    selector: '#simpleItem03',
                    text: 'Step three description',
                    infoBoxPlacement: 'left',
                },
                {
                    id: 'step-four',
                    selector: '#simpleItem04',
                    text: `
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut nulla ac nulla auctor interdum. Integer faucibus efficitur arcu eu porttitor. Donec semper vestibulum leo ac convallis. Etiam non blandit tortor. Maecenas ac arcu sed augue fermentum maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi fringilla, nunc nec ullamcorper fringilla, purus nulla ornare leo, vel tristique felis libero ut eros. Quisque ex nisl, bibendum nec turpis ac, varius sodales ex. Donec risus enim, pharetra sed tellus sed, pharetra laoreet orci.`,
                    infoBoxPlacement: InfoBoxPlacement.RIGHT,
                    endBtnText: 'Fine',
                    prevBtnText: 'Indietro',

                }
            ]
        });
    }
}

$(document).ready(() => {
    const demo = new HazelineDemo();
});