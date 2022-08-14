import {MessageParams} from "../types/MessageParams";
import {setCSSStyles} from "../functions/setCSSStyles";
import Notify from "../index";
import {Changes, Observer} from "./Dispatcher";

export default class Message implements Observer {

    private readonly notify: Notify

    private timeoutInterval: ReturnType<typeof setTimeout> | null = null

    // elements
    public elMessage: HTMLElement
    public elContent: HTMLElement
    public elCloseBtn: HTMLElement
    public elTitle: HTMLElement
    public elText: HTMLElement

    private title: string
    private text: string

    constructor(params: MessageParams, notify: Notify) {

        this.notify = notify

        this.title = params.title
        this.text = params.text

        // create elements
        this.elMessage = document.createElement('div')
        this.elContent = document.createElement('div')
        this.elCloseBtn = document.createElement('div')
        this.elTitle = document.createElement('div')
        this.elText = document.createElement('div')

        const styles = this.notify.getStyles()

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
            this.notify.dispatcher.unsubscribe(this)
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

    update(changes: Changes<null>) {
        switch (changes.action) {
            case "changeOrder":
                this.changeOrder()
                break
        }
    }

    changeOrder() {
        const index = this.notify.messages.findIndex(item => item === this)
        console.log(index)
    }
}