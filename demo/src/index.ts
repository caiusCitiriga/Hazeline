import { Hazeline } from 'hazeline';

window.onload = () => {
    const haze = new Hazeline();
    haze.addSection({
        id: 'test',
        steps: [
            {
                elementSelector: '#input-1',
                text: 'Test me out!',
                useOverlayInsteadOfLightbox: true
            },
            {
                elementSelector: '#input-2',
                text: 'Test me out in lightbox!',
            }
        ],
    });

    haze.runTutorial('test');
}