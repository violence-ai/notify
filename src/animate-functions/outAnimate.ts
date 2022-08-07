export default function outAnimate(el: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
        const innerEl = el.querySelector('div') as HTMLElement
        if ( !innerEl ) throw new Error('Hide: Not found element')

        const outAnimationDuration = 820

        const t = Math.floor(outAnimationDuration / 2)

        innerEl.style.transform = 'scale(1)'
        innerEl.style.opacity = '1'
        innerEl.animate([
            { offset: 0, "opacity": "1"  },
            { offset: 1, "opacity": "0"  },
        ], {
            duration: t,
            fill: "forwards",
            easing: "ease"
        }).addEventListener("finish", () => {
            el.style.transition = `${t}ms ease`
            el.style.height = "0px"
            setTimeout(() => {
                resolve()
            }, t)
        })
    })
}