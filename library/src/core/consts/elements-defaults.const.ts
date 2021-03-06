import { HazelineOptions } from '../interfaces/hazeline-options.interface';

export const HazelineElementsDefaults: HazelineOptions = {
    lightbox: {
        nextBtnText: 'Next',
        prevBtnText: 'Previous',
        lastStepNextBtnText: 'Finish',
        positioning: {
            attachment: 'top center',
            targetAttachment: 'bottom center',
            constraints: [
                {
                    to: 'window',
                    pin: true
                }
            ],
            offset: '0 0'
        },

        lightboxWrapperCSS: {
            color: '#333',
            padding: '8px',
            width: '350px',
            height: '250px',
            display: 'flex',
            zIndex: '999999',
            position: 'fixed',
            background: '#fff',
            flexDirection: 'column',
            // transition: 'all 64ms ease-in-out',
        },
        lightboxTextWrapperCSS: {
            width: '100%',
            flexGrow: '2',
            overflowY: 'scroll',
            textAlign: 'justify'
        },
        lightboxControlsWrapperCSS: {
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        lightboxNextBtnCSS: {
            width: '100px',
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
            width: '100px',
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
            cursor: 'pointer',
            background: '#ff7a00',
        },
        lightboxNextBtnHoverCSS: {
            color: '#fff',
            cursor: 'pointer',
            background: '#ff7a00',
        },
    },

    overlay: {
        closeBtnText: 'End tutorial',

        topSideWrapOffset: 10,
        leftSideWrapOffset: 10,
        rightSideWrapOffset: 10,
        bottomSideWrapOffset: 10,

        overlayCSS: {
            zIndex: '99999',
            position: 'fixed',
            background: 'rgba(0,0,0,.8)',
            transition: 'all 120ms ease-in-out',
        },
        endTutorialBtnHoverCSS: {
            color: '#fff',
            background: '#E53935',
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
            background: 'transparent',
            border: '2px solid #E53935',
        },
    },

    textualOverlay: {
        bgFadeInTimeInMs: 300,
        disableBgFadeIn: false,
        disableTextFadeIn: false,
        textFadeInTimeInMs: 1000,
        overlayBgFadeInOpacity: 1,
        overlayParagraphFadeInOpacity: 1,
        overlayCSS: {
            top: '0',
            left: '0',
            opacity: '0',
            zIndex: '99999',
            display: 'flex',
            fontSize: '30px',
            position: 'fixed',
            paddingLeft: '8px',
            paddingRight: '8px',
            textAlign: 'center',
            alignItems: 'center',
            background: 'rgba(0,0,0,.93)',
            width: `${window.innerWidth}px`,
            justifyContent: 'space-between',
            height: `${window.innerHeight}px`,
            transition: 'all 120ms ease-in-out',
            transitionProperty: 'color, opacity',
        },
        paragraphCSS: {
            opacity: '0',
            color: '#ff7a00'
        },
        prevNextButtonsCSS: {
            width: '150px',
            color: '#fff',
            opacity: '.3',
            height: '80px',
            fontSize: '20px',
            cursor: 'pointer',
            lineHeight: '50px',
            textAlign: 'center',
            border: '2px solid #ff7a00',
            backgroundColor: 'transparent',
            transition: 'all 200ms ease-in-out',
        },
        prevNextButtonsHoverCSS: {
            opacity: '1'
        }
    }
}