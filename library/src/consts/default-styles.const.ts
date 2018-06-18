import { CSSRules } from "../interfaces/css-rules.interface";

export const DEFAULT_STYLES: DefaultStyles = {
    tutorialCloth: {
        top: '0',
        left: '0',
        opacity: '0',
        zIndex: '999',
        position: 'fixed',
        background: '#007bffe6',
        transition: 'opacity 120ms ease-in-out',
    },
    infoBox: {
        opacity: '0',
        color: '#333',
        zIndex: '999',
        width: '300px',
        padding: '10px',
        minHeight: '210px',
        background: '#fff',
        borderRadius: '5px',
        position: 'relative',
        transition: 'opacity 200ms ease-in-out',
        boxShadow: 'rgb(0, 0, 0) 0px 3px 12px -6px',
    },
    infoBoxContent: {
        height: '130px',
        overflowY: 'scroll',
        textAlign: 'center',
        borderRadius: '5px',
        border: '1px solid #eee'
    },
    infoBoxNextBtn: {
        right: '0',
        bottom: '0',
        zIndex: '999',
        padding: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        position: 'absolute',
    },
    infoBoxPreviousBtn: {
        left: '0',
        bottom: '0',
        zIndex: '999',
        padding: '10px',
        marginLeft: '10px',
        marginBottom: '10px',
        position: 'absolute',
    }
}

interface DefaultStyles {
    infoBox: CSSRules;
    tutorialCloth: CSSRules;
    infoBoxContent: CSSRules;
    infoBoxNextBtn: CSSRules;
    infoBoxPreviousBtn: CSSRules;
}
