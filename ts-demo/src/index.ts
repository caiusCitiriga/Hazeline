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
        this.haze.startTutorialSection('simpleItems');
    }

    public runCustomEventsItemsDemo(): void {
        this.setupSections();
        this.haze.startTutorialSection('customEventsItems');
    }

    private setupSections(): void {
        this.haze.addTutorialSection(
            {
                id: 'simpleItems',
                steps: [
                    {
                        id: 'step-one',
                        selector: '#simpleItem01',
                        text: 'Step one description',
                    },
                    {
                        id: 'step-two',
                        selector: '#simpleItem02',
                        text: 'You can click on this item, and the event listener attached to it will fire.',
                    },
                    {
                        id: 'step-three',
                        selector: '#simpleItem03',
                        text: 'Step three description',
                    },
                    {
                        id: 'step-four',
                        selector: '#simpleItem04',
                        text: `
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut nulla ac nulla auctor interdum. Integer faucibus efficitur arcu eu porttitor. Donec semper vestibulum leo ac convallis. Etiam non blandit tortor. Maecenas ac arcu sed augue fermentum maximus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi fringilla, nunc nec ullamcorper fringilla, purus nulla ornare leo, vel tristique felis libero ut eros. Quisque ex nisl, bibendum nec turpis ac, varius sodales ex. Donec risus enim, pharetra sed tellus sed, pharetra laoreet orci.`,
                    }
                ]
            });
        this.haze.addTutorialSection(
            {
                id: 'customEventsItems',
                steps: [
                    {
                        id: 'step-one',
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
                        id: 'step-two',
                        selector: '#passwordInput',
                        text: 'Type in your password, and press Next',
                    }
                ],
            }
        )
    }
}

$(document).ready(() => {
    const demo = new HazelineDemo();
});