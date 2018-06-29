import { StylableElements } from "../interfaces/step-stylable-elements";

export const DEFAULT_STYLES: StylableElements = {
    tutorialOverlay: {
        top: '0',
        left: '0',
        opacity: '0',
        zIndex: '999',
        position: 'fixed',
        background: '#007bffe6',
        transition: 'opacity 120ms ease-in-out',
    },
    pleaseWait: {
        top: '50%',
        opacity: '0',
        color: '#fff',
        width: '100%',
        height: '54px',
        position: 'fixed',
        textAlign: 'center',
        marginTop: '-27px',
        zIndex: '999',
        transition: 'opacity 120ms ease-in-out',
    },
    tutorialCloseBtn: {
        width: '40px',
        height: '40px',
        marginBottom: '8px',
        alignSelf: 'flex-end',
        position: 'absolute',
        marginTop: '-25px',
        marginLeft: '25px',
        borderRadius: '50%',
        background: '#fff',
        color: '#E53935',
        textAlign: 'center',
        lineHeight: '40px',
        fontSize: '17px',
        borderRight: '1px solid #bebebe',
        fontFamily: 'sans-serif',
        borderBottom: '1px solid #bebebe',
        cursor: 'pointer',
    },
    infoBox: {
        opacity: '0',
        color: '#333',
        zIndex: '999',
        width: '300px',
        padding: '10px',
        display: 'flex',
        maxHeight: '210px',
        background: '#fff',
        borderRadius: '5px',
        position: 'relative',
        flexDirection: 'column',
        transition: 'opacity 200ms ease-in-out',
        boxShadow: 'rgb(0, 0, 0) 0px 3px 12px -6px',
    },
    infoBoxContent: {
        padding: '8px',
        minHeight: '80px',
        maxHeight: '130px',
        overflowY: 'scroll',
        textAlign: 'center',
        borderRadius: '5px',
        border: '1px solid #eee'
    },
    infoBoxNextOrEndBtn: {
        zIndex: '999',
        padding: '10px',
        alignSelf: 'flex-end',
        position: 'relative',
        height: '40px',
        background: '#fff',
        border: '1px solid rgb(15, 127, 236)',
        borderRadius: '5px',
        color: 'rgb(15, 127, 236)',
        lineHeight: '0px',
        cursor: 'pointer',
        width: '90px',
        marginTop: '3px',
        display: 'block',
    },
    infoBoxPreviousBtn: {
        zIndex: '999',
        padding: '10px',
        alignSelf: 'flex-start',
        position: 'relative',
        bottom: '-43px',
        height: '40px',
        background: '#fff',
        border: '1px solid #6c757d',
        borderRadius: '5px',
        color: '#6c757d',
        lineHeight: '0px',
        cursor: 'pointer',
        width: '90px',
        marginTop: '-50px',
    }
}
