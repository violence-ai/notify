import {Animate} from "../types/Animate";

export const slideRight: Animate = {

    beforeInsert(message, done) {

        message.elMessage.style.height = '0'
        message.elMessage.style.transition = `500ms ease`

        message.elMessage.style.transform = 'translateX(600px)'

        done()
    },

    afterInsert(message, done) {

        message.elMessage.style.height = `${message.elContent.clientHeight + 20}px`

        message.elMessage.style.transform = 'translateX(0)'

        setTimeout(() => {
            done()
        }, 500)
    },

    afterInAnimateEnd(message, done) {
        done()
    },

    startOutAnimate(message, done) {

        message.elMessage.style.transform = 'translateX(600px)'

        setTimeout(() => {
            message.elMessage.style.height = "0px"

            setTimeout(() => {
                done()
            }, 500)

        }, 500)
    }
}