import { StylableElements } from "../interfaces/step-stylable-elements";

export const DEFAULT_STYLES: StylableElements = {
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
        display: 'flex',
        minHeight: '210px',
        background: '#fff',
        borderRadius: '5px',
        position: 'relative',
        flexDirection: 'column',
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
    infoBoxNextOrEndBtn: {
        zIndex: '999',
        padding: '10px',
        alignSelf: 'flex-end',
        position: 'relative',
        height: '50px',
        width: '90px',
        display: 'block',
    },
    infoBoxPreviousBtn: {
        zIndex: '999',
        padding: '10px',
        alignSelf: 'flex-start',
        position: 'relative',
        bottom: '-50px',
        height: '50px',
        width: '90px',
        marginTop: '-50px',
    }
}
