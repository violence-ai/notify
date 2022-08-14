import {Animate} from "../types/Animate";

export const slideRight: Animate = {

    beforeInsert(message, done) {
        message.elContent.style.transition = '.5s ease'
        message.elContent.style.transform = 'translateX(600px)'

        done()
    },

    afterInsert(message, done) {
        message.elContent.style.transform = 'translateX(0)'

        setTimeout(() => {
            done()
        }, 500)
    },

    afterInAnimateEnd(message, done) {
        done()
    },

    startOutAnimate(message, done) {

        message.elContent.style.transform = 'translateX(600px)'

        setTimeout(() => {
            done()
        }, 500)
    }
}