import {Styles} from "./types/Styles";

export const styles: Styles = {
    root: {
        position: 'fixed',
        top: `20px`,
        right: `40px`,
        width: `300px`,
    },

    message: {
        width: '100%',
        display: 'flex',
        alignItems: 'end',
    },

    content: {
        padding: '10px',
        background: '#2a2a2a',
        color: '#fff',
        borderRadius: '10px',
        position: 'relative',
    },

    title: {
        fontWeight: 'bold'
    },

    text: {
        marginTop: '10px'
    },

    close: {
        width: '10px',
        height: '10px',
        background: '#ff0000',
        borderRadius: '100px',
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer'
    },
}