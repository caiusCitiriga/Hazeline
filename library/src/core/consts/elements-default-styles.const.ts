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

        ligthboxWrapperCSS: <HazelineCSSRules>{
            width: '350px',
            height: '250px',
            zIndex: '999999',
            position: 'fixed',
            background: '#fff',
        },

    },

    lightboxInternalData: <HazelineCSSRules>{
        zIndex: '99999'
    },
    overlayBoxesInternalCommonData: <HazelineCSSRules>{
        zIndex: '99999',
        position: 'fixed',
        border: '1px solid red',
        background: 'rgba(0,0,0,.8)',
    }
}