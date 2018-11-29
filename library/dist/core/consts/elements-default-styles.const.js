"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HazelineElementsDefaultStyles = {
    lightbox: {
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
        lightboxWrapperCSS: {
            padding: '8px',
            width: '350px',
            height: '250px',
            display: 'flex',
            zIndex: '999999',
            position: 'fixed',
            background: '#fff',
            flexDirection: 'column'
        },
        lightboxTextWrapperCSS: {
            width: '100%',
            flexGrow: '2',
            overflowY: 'scroll',
            textAlign: 'justify'
        },
        lightboxControlsWrapperCSS: {
            width: '100%',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        lightboxNextBtnCSS: {
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
        lightboxPrevBtnCSS: {
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
        lightboxPrevBtnHoverCSS: {
            color: '#fff',
            cursor: 'pointer',
            background: '#ff7a00',
        },
        lightboxNextBtnHoverCSS: {
            color: '#fff',
            cursor: 'pointer',
            background: '#ff7a00',
        }
    },
    lightboxInternalData: {
        zIndex: '99999'
    },
    overlayBoxesInternalCommonData: {
        zIndex: '99999',
        position: 'fixed',
        background: 'rgba(0,0,0,.8)',
    }
};
//# sourceMappingURL=elements-default-styles.const.js.map