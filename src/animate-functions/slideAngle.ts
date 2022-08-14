import {Animate} from "../types/Animate";

export const slideAngle: Animate = {

    beforeInsert(message, done) {
        message.elContent.style.transition = '.5s ease'
        message.elContent.style.transform = 'translate(600px, -300px)'

        done()
    },

    afterInsert(message, done) {
        message.elContent.style.transform = 'translate(0, 0)'

        setTimeout(() => {
            done()
        }, 500)
    },

    afterInAnimateEnd(message, done) {
        done()
    },

    startOutAnimate(message, done) {

        message.elContent.style.transform = 'translate(600px, 300px)'

        setTimeout(() => {
            done()
        }, 500)
    }
}