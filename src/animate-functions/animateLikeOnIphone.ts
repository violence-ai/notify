import {Animate} from "../types/Animate";

export const animateLikeOnIphone: Animate = {

    /**
     * Before the element is placed in the DOM.
     * Here you need to set up basic styles before starting the animation
     */
    beforeInsert(message, done) {

        message.elMessage.style.height = '0'
        message.elMessage.style.transition = `500ms ease`

        message.elContent.style.transform = 'scale(0)'
        message.elContent.style.opacity = '0'

        done()
    },

    /**
     * After placing an element in the DOM.
     * Here you need to set up styles for the appearance animation
     */
    afterInsert(message, done) {

        message.elMessage.style.height = `${message.elContent.clientHeight + 20}px`

        message.elContent.animate([
            { offset: 0, transform: "scale(0)", "opacity": "0"  },
            { offset: 1, transform: "scale(1)", "opacity": "1"  },
        ], {
            duration: 500,
            fill: "forwards",
            easing: "ease"
        }).addEventListener("finish", () => {
            done()
        })
    },

    /**
     * After the animation is over.
     * You may need to apply final styles after the animation ends
     */
    afterInAnimateEnd(message, done) {
        done()
    },

    /**
     * After the display time is up.
     * Prepare the base styles before starting the fade animation
     */
    startOutAnimate(message, done) {

        const outAnimationDuration = 820

        const t = Math.floor(outAnimationDuration / 2)

        message.elContent.style.transform = 'scale(1)'
        message.elContent.style.opacity = '1'
        message.elContent.animate([
            { offset: 0, "opacity": "1"  },
            { offset: 1, "opacity": "0"  },
        ], {
            duration: t,
            fill: "forwards",
            easing: "ease"
        }).addEventListener("finish", () => {
            message.elMessage.style.transition = `${t}ms ease`
            message.elMessage.style.height = "0px"
            setTimeout(() => {
                done()
            }, t)
        })
    }
}