import { Hazeline } from 'hazeline';

window.onload = () => {
    const haze = new Hazeline();
    haze.addSection({
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
        globalOptions: {
            overlay: {
                topSideWrapOffset: 20,
                leftSideWrapOffset: 20,
                rightSideWrapOffset: 20,
                bottomSideWrapOffset: 20,
            },
        }
    });

    setTimeout(() => {
        haze.runTutorial('test');
    }, 800);
}