import {MessageParams} from "../types/MessageParams";
import {setCSSStyles} from "../functions/setCSSStyles";
import SmoothNotify from "../index";

export default class Message {

    private readonly notify: SmoothNotify

    private timeoutInterval: ReturnType<typeof setTimeout> | null = null

    // elements
    public elMessage: HTMLElement
    public elContent: HTMLElement
    public elCloseBtn: HTMLElement
    public elTitle: HTMLElement
    public elText: HTMLElement

    constructor(params: MessageParams, notify: SmoothNotify) {

        this.notify = notify

        // create elements
        this.elMessage = document.createElement('div')
        this.elContent = document.createElement('div')
        this.elCloseBtn = document.createElement('div')
        this.elTitle = document.createElement('div')
        this.elText = document.createElement('div')

        const styles = this.notify.getOptions().styles

        // set styles
        setCSSStyles(this.elMessage, styles.message)
        setCSSStyles(this.elContent, styles.content)
        setCSSStyles(this.elCloseBtn, styles.close)
        setCSSStyles(this.elTitle, styles.title)
        setCSSStyles(this.elText, styles.text)

        // set event listeners
        this.elContent.addEventListener('mouseenter', this.stopTimeout.bind(this))
        this.elContent.addEventListener('mouseleave', this.startTimeout.bind(this))
        this.elCloseBtn.addEventListener('click', this.startOutAnimate.bind(this))

        // set text data
        this.elTitle.innerText = params.title
        this.elText.innerText = params.text

        // build
        this.elMessage.append(this.elContent)
        this.elContent.append(this.elCloseBtn)
        this.elContent.append(this.elTitle)
        this.elContent.append(this.elText)

        this.beforeInsert()
    }

    private beforeInsert() {
        this.elMessage.style.height = `0`
        this.elMessage.style.transition = `${this.notify.getOptions().elementShiftTime}ms ease`

        this.notify.getOptions().animateFunction.beforeInsert(this, () => {
            this.afterInsert()
        })
    }

    private afterInsert() {
        this.notify.prependMessage(this)

        this.elMessage.style.height = `${this.elContent.clientHeight + this.notify.getOptions().gap}px`

        this.notify.getOptions().animateFunction.afterInsert(this, () => {
            this.afterInAnimateEnd()
        })
    }

    private afterInAnimateEnd() {
        this.notify.getOptions().animateFunction.afterInAnimateEnd(this, () => {
            this.startTimeout()
        })
    }

    private startOutAnimate() {
        this.notify.getOptions().animateFunction.startOutAnimate(this, () => {

            this.elMessage.style.height = '0'
            setTimeout(() => {
                this.elMessage.remove()
            }, this.notify.getOptions().elementShiftTime)
        })
    }

    private stopTimeout() {
        if ( this.timeoutInterval ) {
            clearTimeout(this.timeoutInterval)
        }
    }

    private startTimeout() {
        this.stopTimeout()
        this.timeoutInterval = setTimeout(() => {
            this.startOutAnimate()
        }, this.notify.getOptions().timeout)
    }
}