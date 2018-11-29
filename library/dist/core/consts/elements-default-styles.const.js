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
        ligthboxWrapperCSS: {
            width: '350px',
            height: '250px',
            zIndex: '999999',
            position: 'fixed',
            background: '#fff',
        },
    }
};
//# sourceMappingURL=elements-default-styles.const.js.map