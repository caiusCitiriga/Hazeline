import $ from 'jquery';
import { Hazeline } from 'hazeline';

class HazelineDemo {

    private haze: Hazeline;

    //  Controls
    private startSimpleItemsDemoBtn: HTMLButtonElement;
    private startCustomEventsItemsDemoBtn: HTMLButtonElement;

    public constructor() {
        this.haze = new Hazeline();
        this.collectControlsElementsInstances();
        this.attachListenersOnControls();
    }

    private collectControlsElementsInstances(): void {
        this.startSimpleItemsDemoBtn = document.getElementById('startSimpleItemsDemoBtn') as HTMLButtonElement;
        this.startCustomEventsItemsDemoBtn = document.getElementById('startCustomEventsItemsDemoBtn') as HTMLButtonElement;
    }

    private attachListenersOnControls(): void {
        this.startSimpleItemsDemoBtn.addEventListener('click', e => {
            this.runSimpleItemsDemo();
        });
        this.startCustomEventsItemsDemoBtn.addEventListener('click', e => {
            this.runCustomEventsItemsDemo();
        });
    }

    public runSimpleItemsDemo(): void {
        this.setupSections();
        this.haze.startTutorialSection('section-one');
    }

    public runCustomEventsItemsDemo(): void {
        this.setupSections();
        this.haze.startTutorialSection('section-two');
    }

    private setupSections(): void {
        this.haze.addTutorialSection(
            {
                id: 'section-one',
                steps: [
                    {
                        selector: '#simpleItem01',
                        text: 'Step one description',
                    },
                    {
                        selector: '#simpleItem02',
                        beforeStartDelay: 1000,
                        text: 'You can click on this item, and the event listener attached to it will fire.',
                        pleaseWaitText: 'Waiting for a dialog to come up...',
                        styles: {
                            pleaseWait: {
                                color: '#00E676'
                            }
                        }
                    },
                    {
                        selector: '#simpleItem03',
                        text: 'Step three description',
                    },
                    {
                        selector: '#simpleItem04',
                        text: `
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut nulla ac nulla auctor interdum. Integer faucibus efficitur arcu eu porttitor. Donec semper vestibulum leo ac convallis. Etiam non blandit tortor. Maecenas ac arcu sed augue fermentum maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi fringilla, nunc nec ullamcorper fringilla, purus nulla ornare leo, vel tristique felis libero ut eros. Quisque ex nisl, bibendum nec turpis ac, varius sodales ex. Donec risus enim, pharetra sed tellus sed, pharetra laoreet orci.`,
                    }
                ]
            });
        this.haze.addTutorialSection(
            {
                id: 'section-two',
                steps: [
                    {
                        selector: '#usernameInput',
                        text: 'Type in your name, and press Enter',
                        triggers: {
                            next: {
                                event: 'keyup',
                                action: (event: KeyboardEvent) => {
                                    if (event.keyCode === 13) {
                                        return true;
                                    }

                                    return false;
                                }
                            }
                        }
                    },
                    {
                        selector: '#passwordInput',
                        text: 'Type in your password, and press <strong>Next</strong>',
                    }
                ],
            }
        )
    }
}

$(document).ready(() => {
    const demo = new HazelineDemo();
});