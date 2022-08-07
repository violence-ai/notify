import {MessageParams} from "../types/MessageParams";
import {setCSSStyles} from "../functions/setCSSStyles";
import Notify from "../index";

export default class Message {

    private readonly notify: Notify
    private readonly title: string
    private readonly text: string
    private timeoutInterval: ReturnType<typeof setTimeout> | null = null

    public elMessage: HTMLElement
    public elContent: HTMLElement
    public elCloseBtn: HTMLElement
    public elTitle: HTMLElement
    public elText: HTMLElement

    constructor(params: MessageParams, notify: Notify) {
        this.notify = notify
        this.title = params.title
        this.text = params.text

        this.elMessage = document.createElement('div')
        this.elContent = document.createElement('div')
        this.elCloseBtn = document.createElement('div')
        this.elTitle = document.createElement('div')
        this.elText = document.createElement('div')

        this.configure()

        this.beforeInsert()
    }

    public configure(): void {
        const styles = this.notify.getStyles()

        setCSSStyles(this.elMessage, styles.message)

        setCSSStyles(this.elContent, styles.content)
        this.elContent.addEventListener('mouseenter', this.stopTimeout.bind(this))
        this.elContent.addEventListener('mouseleave', this.startTimeout.bind(this))

        setCSSStyles(this.elCloseBtn, styles.close)
        this.elCloseBtn.addEventListener('click', this.startOutAnimate.bind(this))

        setCSSStyles(this.elTitle, styles.title)
        this.elTitle.innerText = this.title

        setCSSStyles(this.elText, styles.text)
        this.elText.innerText = this.text

        this.elMessage.append(this.elContent)
        this.elContent.append(this.elCloseBtn)
        this.elContent.append(this.elTitle)
        this.elContent.append(this.elText)
    }

    private beforeInsert() {
        this.notify.getAnimate().beforeInsert(this, () => {
            this.afterInsert()
        })
    }

    private afterInsert() {
        this.notify.rootElement.prepend(this.elMessage)

        this.notify.getAnimate().afterInsert(this, () => {
            this.afterInAnimateEnd()
        })
    }

    private afterInAnimateEnd() {
        this.notify.getAnimate().afterInAnimateEnd(this, () => {
            this.startTimeout()
        })
    }

    private startOutAnimate() {
        this.notify.getAnimate().startOutAnimate(this, () => {
            this.elMessage.remove()
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
        }, this.notify.options.timeout)
    }
}