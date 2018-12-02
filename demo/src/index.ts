import { Hazeline } from 'hazeline';

window.onload = () => {
    const haze = new Hazeline();
    haze.addSection({
        id: 'test',
        onBeforeStart: () => new Promise((res, rej) => {
            setTimeout(() => {
                console.log('Executed <code>onBeforeStart</code> event on Section');
                res();
            }, 1000);
        }),
        onBeforeEnd: () => new Promise((res, rej) => {
            setTimeout(() => {
                console.log('Executed <code>onBeforeEnd</code> event on Section');
                res();
            }, 1000);
        }),
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
                onStart: () => new Promise((res, rej) => {
                    setTimeout(() => {
                        console.log('Executed <code>onStart</code> event on Step');
                        res();
                    }, 1000);
                }),
                onEnd: () => new Promise((res, rej) => {
                    setTimeout(() => {
                        console.log('Executed <code>onEnd</code> event on Step');
                        res();
                    }, 1000);
                }),
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
    });

    setTimeout(() => {
        haze.runTutorial('test');
    }, 800);
}