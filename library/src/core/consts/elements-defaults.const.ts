import { HazelineCSSRules } from '../interfaces/css-rules.interface';
import { HazelineOptions, HazelineLightboxOptions } from '../interfaces/hazeline-options.interface';

export const HazelineElementsDefaults: HazelineOptions = {
    lightbox: <HazelineLightboxOptions>{
        nextBtnText: 'Next',
        closeBtnText: 'Close',
        prevBtnText: 'Previous',
        lastStepNextBtnText: 'Finish',
        positioning: {
            attachment: 'top center',
            targetAttachment: 'bottom center',
            constraints: [
                {
                    to: 'scrollParent',
                    attachment: 'together'
                }
            ],
            offset: '-20px 0'
        },

        lightboxWrapperCSS: <HazelineCSSRules>{
            padding: '8px',
            width: '350px',
            height: '250px',
            display: 'flex',
            zIndex: '999999',
            position: 'fixed',
            background: '#fff',
            flexDirection: 'column'
        },
        lightboxTextWrapperCSS: <HazelineCSSRules>{
            width: '100%',
            flexGrow: '2',
            overflowY: 'scroll',
            textAlign: 'justify'
        },
        lightboxControlsWrapperCSS: <HazelineCSSRules>{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        lightboxNextBtnCSS: <HazelineCSSRules>{
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
        lightboxPrevBtnCSS: <HazelineCSSRules>{
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
        lightboxPrevBtnHoverCSS: <HazelineCSSRules>{
            color: '#fff',
            cursor: 'pointer',
            background: '#ff7a00',
        },
        lightboxNextBtnHoverCSS: <HazelineCSSRules>{
            color: '#fff',
            cursor: 'pointer',
            background: '#ff7a00',
        }
    },

    overlay: {
        closeBtnText: 'End tutorial',
        overlayCSS: {
            zIndex: '99999',
            position: 'fixed',
            background: 'rgba(0,0,0,.8)',
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
    }
}