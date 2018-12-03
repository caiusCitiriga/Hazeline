import { Hazeline, HazelineTutorialStep, HazelineTutorialSection } from 'hazeline';

const hazelineSection: HazelineTutorialSection = {
    id: 'test',
    steps: [
        {
            elementSelector: '#input-1',
            text: 'First',
            useOverlayInsteadOfLightbox: true,
            dynamicOptions: {
                textualOverlay: {
                    hideButtons: true,
                    overlayCSS: {
                        justifyContent: 'center'
                    },
                    overlayParagraphFadeInOpacity: 1,
                }
            }
        },
        {
            elementSelector: '#input-2',
            text: 'Second',
            useOverlayInsteadOfLightbox: true,
            dynamicOptions: {
                textualOverlay: {
                    overlayBgFadeInOpacity: 1,
                    clickAnywhereForNextStep: true,
                    hideButtons: true,
                    overlayCSS: {
                        opacity: '0',
                        justifyContent: 'center'
                    },
                    paragraphCSS: {
                        justifyContent: 'center'
                    }
                }
            }
        },
        {
            elementSelector: '#inputZip',
            text: 'Third',
            dynamicOptions: {
                lightbox: {
                    positioning: {
                        attachment: 'left top',
                        targetAttachment: 'bottom left',
                    }
                }
            },
            onBeforeStart: () => new Promise((res, rej) => {
                const stepIndex = hazelineSection.steps.findIndex(step => step.elementSelector === '#inputZip');

                hazelineSection.steps[stepIndex].useOverlayInsteadOfLightbox = true;
                res();
            }),
            nextStepCustomTrigger: {
                event: 'keyup',
                disableDefaultNextPrevBtns: true,
                callback: (evt: Event, step: HazelineTutorialStep, el: HTMLElement) => new Promise((res, rej) => {
                    if ((evt as KeyboardEvent).keyCode === 13) {
                        res();
                        return;
                    }

                    rej();
                })
            }
        },
        {
            elementSelector: '#input-4',
            text: 'Last',
        },
        {
            elementSelector: '#input-6',
            text: 'Last',
        }
    ],
};

window.onload = () => {
    const haze = new Hazeline();
    haze.addSection(hazelineSection);

    setTimeout(() => {
        haze.runTutorial('test');
    }, 800);
}