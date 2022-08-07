export default function inAnimate(el: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
        const innerEl = el.querySelector('div') as HTMLElement
        if ( !innerEl ) throw new Error('Show: Not found element')

        const h = innerEl.clientHeight

        const inAnimationDuration = 500
        const gap = 20

        el.style.transition = `${inAnimationDuration}ms ease`
        el.style.height = `${h + gap}px`

        innerEl.style.transform = 'scale(0)'
        innerEl.style.opacity = '0'
        innerEl.animate([
            { offset: 0, transform: "scale(0)", "opacity": "0"  },
            { offset: 1, transform: "scale(1)", "opacity": "1"  },
        ], {
            duration: inAnimationDuration,
            fill: "forwards",
            easing: "ease"
        }).addEventListener("finish", () => {
            resolve()
        })
    })
}