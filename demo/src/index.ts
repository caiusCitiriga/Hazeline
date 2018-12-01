import { Hazeline } from 'hazeline';

window.onload = () => {
    const haze = new Hazeline();
    haze.addSection({
        id: 'test',
        steps: [
            {
                elementSelector: '#input-1',
                text: 'Test <strong>me</strong> out!<br><small style="color: #fff">Premi ovunque per continuare</small>',
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
                text: 'Test me out in lightbox!',
                useOverlayInsteadOfLightbox: true,
                dynamicOptions: {
                    textualOverlay: {
                        overlayBgFadeInOpacity: 1,
                        clickAnywhereForNextStep: true,
                        hideButtons: true,
                        overlayCSS: {
                            opacity: '0',
                            background: 'rgba(113, 223, 172, .9)',
                            justifyContent: 'center'
                        },
                        paragraphCSS: {
                            justifyContent: 'center'
                        }
                    }
                }
            },
            {
                delayText: 'Please wait',
                delayTextColor: '#fff',
                elementSelector: '#input-3',
                text: 'Test me out in lightbox!',
            },
            {
                elementSelector: '#input-4',
                text: 'Test me out in lightbox!',
            }
        ],
    });

    setTimeout(() => {
        haze.runTutorial('test');
    }, 800);
}