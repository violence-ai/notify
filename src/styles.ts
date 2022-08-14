import {Styles} from "./types/Styles";

export const styles: Styles = {
    root: {
        position: 'fixed',
        top: `10px`,
        right: `40px`,
        width: `300px`,
    },

    message: {
        width: '100%',
        display: 'flex',
        alignItems: 'start',
    },

    content: {
        width: '100%',
        padding: '20px',
        background: '#2a2a2a',
        color: '#fff',
        borderRadius: '20px',
        position: 'relative',
    },

    title: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: '14px',
    },

    text: {
        marginTop: '10px',
        opacity: '.7',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        lineHeight: '20px'
    },

    close: {
        width: '10px',
        height: '10px',
        background: '#ff0000',
        borderRadius: '100px',
        position: 'absolute',
        top: '20px',
        right: '20px',
        cursor: 'pointer'
    },
}