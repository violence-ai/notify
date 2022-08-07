import {Animate} from "../types/Animate";

export const animateLikeOnIphone: Animate = {

    /**
     * До помещения элемента в DOM.
     * Здесь нужно настроить базовые стили перед стартом анимации
     */
    beforeInsert(message, done) {

        message.elMessage.style.height = '0'
        message.elMessage.style.transition = `500ms ease`

        message.elContent.style.transform = 'scale(0)'
        message.elContent.style.opacity = '0'

        done()
    },

    /**
     * После помещения элемента в DOM.
     * Здесь нужно настроить стили для анимации появления
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
     * После того как анимация завершиться.
     * Возможно вам потребуется применить финальный стили после окончания анимации
     */
    afterInAnimateEnd(message, done) {
        done()
    },

    /**
     * После того как выйдет время отображения.
     * Подготовьте базовые стили перед началом анимации исчезновения
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