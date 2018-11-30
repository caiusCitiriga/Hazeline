import { Hazeline } from 'hazeline';

window.onload = () => {
    const haze = new Hazeline();
    haze.addSection({
        id: 'test',
        steps: [
            {
                elementSelector: '#input-1',
                text: 'This is an awesome input box',
                dynamicOptions: {
                    overlay: {
                        closeBtnText: 'Quit',
                        overlayCSS: {
                            background: 'rgba(255, 255, 255, .85)'
                        }
                    },
                    lightbox: {
                        nextBtnText: '>',
                        prevBtnText: '<',
                        lightboxNextBtnCSS: {
                            border: 'none'
                        },
                        lightboxPrevBtnCSS: {
                            border: 'none'
                        },
                        lightboxWrapperCSS: {
                            boxShadow: '0px 3px 12px -5px #333'
                        }
                    }
                }
            },
            {
                elementSelector: '#input-2',
                text: 'This is another awesome input box',
            },
            {
                elementSelector: '#input-3',
                text: 'This is another awesome input box',
            },
        ],
        globalOptions: {
            lightbox: {
                lightboxNextBtnCSS: {
                    color: 'red'
                },
                nextBtnText: 'next'
            }
        }
    });

    haze.runTutorial('test');
}