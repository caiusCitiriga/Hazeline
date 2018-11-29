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
            }
        ],
        globalStyling: {
            overlay: {
                closeBtnText: 'Chiudi',
                overlayCSS: {
                    // be aware that when setting CSS an override will be made, so the interface may result broken.
                    // these are the minimum properties to set in order to make it work
                    zIndex: '99999',
                    position: 'fixed',
                    background: 'rgba(0,0,0,.8)'
                },
                endTutorialBtnCSS: {
                    top: '12px',
                    right: '12px',
                    width: '120px',
                    height: '32px',
                    outline: 'none',
                    zIndex: '999999',
                    color: '#E53935',
                    position: 'fixed',
                    fontWeight: 'bold',
                    background: 'transparent',
                    border: '2px solid #E53935',
                },
                endTutorialBtnHoverCSS: {
                    color: '#fff',
                    background: '#E53935',
                }
            },
            lightbox: {
                lastStepNextBtnText: 'Chiudi',
                nextBtnText: 'Sucessivo',
                prevBtnText: 'Precedente',
                lightboxNextBtnCSS: {
                    width: '150px',
                    height: '38px',
                    outline: 'none',
                    color: '#ff7a00',
                    fontSize: '18px',
                    cursor: 'default',
                    background: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    border: '3px solid #ff7a00',
                    transition: 'all 120ms ease-in-out',
                },
                lightboxPrevBtnCSS: {
                    width: '150px',
                    height: '38px',
                    outline: 'none',
                    color: '#ff7a00',
                    fontSize: '18px',
                    cursor: 'default',
                    background: '#fff',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    border: '3px solid #ff7a00',
                    transition: 'all 120ms ease-in-out',
                },
                lightboxPrevBtnHoverCSS: {
                    color: '#fff',
                    width: '150px',
                    cursor: 'pointer',
                    background: '#ff7a00',
                },
                lightboxNextBtnHoverCSS: {
                    color: '#fff',
                    width: '150px',
                    cursor: 'pointer',
                    background: '#ff7a00',
                },
            }
        }
    });

    haze.runTutorial('test')
        .subscribe(res => {
            console.log(res);
        });
}