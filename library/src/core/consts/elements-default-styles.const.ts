import { HazelineCSSRules } from '../interfaces/css-rules.interface';
import { HazelineLightboxOptions } from '../interfaces/tutorial-section.interface';

export const HazelineElementsDefaultStyles = {
    lightbox: <HazelineLightboxOptions>{
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
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        lightboxNextBtnCSS: <HazelineCSSRules>{
            width: '60px',
            height: '60px',
            outline: 'none',
            color: '#ff7a00',
            fontSize: '30px',
            cursor: 'default',
            background: '#fff',
            textAlign: 'center',
            borderRadius: '50%',
            fontFamily: 'monospace',
            border: '3px solid #ff7a00',
            transition: 'all 120ms ease-in-out',
        },
        lightboxPrevBtnCSS: <HazelineCSSRules>{
            width: '60px',
            height: '60px',
            outline: 'none',
            color: '#ff7a00',
            fontSize: '30px',
            cursor: 'default',
            background: '#fff',
            textAlign: 'center',
            borderRadius: '50%',
            fontFamily: 'monospace',
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

    lightboxInternalData: <HazelineCSSRules>{
        zIndex: '99999'
    },
    overlayBoxesInternalCommonData: <HazelineCSSRules>{
        zIndex: '99999',
        position: 'fixed',
        background: 'rgba(0,0,0,.8)',
    }
}