import { Hazeline, HazelineTutorialStep, HazelineTutorialSection } from 'hazeline';

const hazelineSection: HazelineTutorialSection = {
    id: 'test',
    steps: [
        {
            elementSelector: '#start-haze',
            text: 'Introducing Hazeline, the definitive tutorial library',
            useOverlayInsteadOfLightbox: true,
        },
        {
            elementSelector: '#start-haze',
            text: '<div style="text-align: center">Hazeline is meant to be:</div><br><ul style="list-style: none; margin: 0; padding: 0"><li>Simple</li><li>Nice to see</li><li>Customizable</li><li>Framework agnostic</li></ul>',
            useOverlayInsteadOfLightbox: true,
        },
        {
            elementSelector: '#input-1',
            text: 'Amaze your users by guiding them across the application that you\'ve build. Step by step, explaining them how each part works by making them try each feature one by one.',
        },
        {
            elementSelector: '#start-haze',
            text: 'You can even wait for a certain event to happen, by delaying the start of a specific step, like the next one.',
            useOverlayInsteadOfLightbox: true,
        },
        {
            delayBeforeStart: 3000,
            delayTextColor: '#fff',
            text: 'The answer is 42',
            elementSelector: '#input-2',
            useOverlayInsteadOfLightbox: true,
            delayText: 'Hazeline is calculating the meaning of life. <br>Please wait.',
        },
        {
            elementSelector: '#input-2',
            text: 'You can listen for custom events on the elements, and trigger the next step automatically. And even decide wether hiding or leaving visible the NEXT and PREV buttons.',
            nextStepCustomTrigger: {
                event: 'click',
                callback: (evt: Event, step: HazelineTutorialStep, el: HTMLElement) => new Promise((res, rej) => {
                    (el as HTMLInputElement).blur();
                    res();
                })
            }
        },
        {
            elementSelector: '#input-3',
            text: 'Also totally customize the Lightbox or any other parts, globally (once) or dynamically (step by step)',
            dynamicOptions: {
                overlay: {
                    overlayCSS: {
                        background: 'rgba(150, 34, 26, 0.83)'
                    },
                    endTutorialBtnCSS: {
                        color: '#fff',
                        borderColor: '#fff'
                    }
                },
                lightbox: {
                    nextBtnText: '>',
                    prevBtnText: '<',
                    lightboxWrapperCSS: {
                        color: '#eee',
                        background: '#333'
                    },
                    positioning: {
                        offset: '-10px 0'
                    }
                }
            }
        },
        {
            text: '<strong class="haze-font">Hazeline</strong>',
            elementSelector: '#input-2',
            dynamicOptions: {
                textualOverlay: {
                    hideButtons: true,
                    paragraphCSS: {
                        width: '100%',
                        textAlign: 'center'
                    }
                }
            },
            useOverlayInsteadOfLightbox: true,
        },
    ],
};

const haze = new Hazeline();
window.onload = () => {
    haze.addSection(hazelineSection);
    (document.getElementById('start-haze') as HTMLButtonElement).onclick = () => {
        haze.runTutorial('test');
    };
}