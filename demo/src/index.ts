import { Hazeline } from 'hazeline';

window.onload = () => {
    const haze = new Hazeline();
    haze.addSection({
        id: 'test',
        steps: [
            {
                elementSelector: '#input-1',
                text: 'This is some gibberish test text for STEP 1',
            },
            {
                elementSelector: '#input-4',
                text: 'This is some gibberish test text for STEP 2',
            },
            {
                elementSelector: '#input-2',
                text: 'This is some gibberish test text for STEP 3',
            },
            {
                elementSelector: '#input-3',
                text: 'This is some gibberish test text for STEP 4',
            },
            {
                elementSelector: '#input-6',
                text: 'This should be placed on center',
                dynamicOptions: {
                    lightbox: {
                        lightboxWrapperCSS: {
                            color: 'red',
                            boxShadow: '0 3px 10px -5px #333'
                        },
                        positioning: {
                            offset: '0 0',
                            attachment: 'middle center',
                            targetAttachment: 'middle center'
                        }
                    }
                }
            }
        ],
        globalOptions: {
            overlay: {
                closeBtnText: 'Chiudi',
            },
        }
    });

    haze.runTutorial('test')
        .subscribe(res => {

        });
}