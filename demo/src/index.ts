import { Hazeline } from 'hazeline';

window.onload = () => {
    const haze = new Hazeline();
    haze.addSection({
        id: 'test',
        steps: [
            {
                elementSelector: '#input-1',
                text: 'Test me out!',
                useOverlayInsteadOfLightbox: true,
                dynamicOptions: {
                    textualOverlay: {
                        hideButtons: true,
                        overlayCSS: {
                            color: 'transparent',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        },
                        overlayTextFadeInColor: 'red',
                        prevNextButtonsCSS: {
                            color: 'red'
                        }
                    }
                }
            },
            {
                elementSelector: '#input-2',
                text: 'Test me out in lightbox!',
            },
            {
                elementSelector: '#input-3',
                text: 'Test me out in lightbox!',
            },
            {
                elementSelector: '#input-4',
                text: 'Test me out in lightbox!',
            }
        ],
    });

    haze.runTutorial('test');
}