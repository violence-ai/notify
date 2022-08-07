import {MessageParams} from "../types/MessageParams";
import inAnimate from "../animate-functions/inAnimate";
import outAnimate from "../animate-functions/outAnimate";
import {setCSSStyles} from "../functions/setCSSStyles";
import Notify from "../index";

export default class Message {

    private readonly notify: Notify
    public readonly element: HTMLElement
    private readonly title: string
    private readonly text: string
    private timeoutInterval: ReturnType<typeof setTimeout> | null = null

    constructor(params: MessageParams, notify: Notify) {
        this.notify = notify
        this.title = params.title
        this.text = params.text
        this.element = this.generateHtml()
        requestAnimationFrame(() => {
            this.show().then(() => {
                this.startTimeout()
            })
        })
    }

    public generateHtml(): HTMLElement {
        const styleClassNames = this.notify.getStyleClassNames()
        const styles = this.notify.getStyles()

        const elMessage = document.createElement('div')
        elMessage.classList.add(styleClassNames.message)
        setCSSStyles(elMessage, styles.message)

        const elContent = document.createElement('div')
        elContent.classList.add(styleClassNames.content)
        setCSSStyles(elContent, styles.content)
        elContent.addEventListener('mouseenter', this.stopTimeout.bind(this))
        elContent.addEventListener('mouseleave', this.startTimeout.bind(this))

        const elCloseBtn = document.createElement('div')
        elCloseBtn.classList.add(styleClassNames.close)
        setCSSStyles(elCloseBtn, styles.close)
        elCloseBtn.addEventListener('click', this.hide.bind(this))

        const elTitle = document.createElement('div')
        elTitle.classList.add(styleClassNames.title)
        setCSSStyles(elTitle, styles.title)
        elTitle.innerText = this.title

        const elText = document.createElement('div')
        elText.classList.add(styleClassNames.text)
        setCSSStyles(elText, styles.text)
        elText.innerText = this.text

        elMessage.append(elContent)
        elContent.append(elCloseBtn)
        elContent.append(elTitle)
        elContent.append(elText)

        return elMessage
    }

    private show(): Promise<void> {
        if ( this.notify.options.functionShow !== undefined ) {
            return this.notify.options.functionShow(this.element)
        }
        return inAnimate(this.element)
    }

    private hide(): Promise<void> {
        if ( this.notify.options.functionHide !== undefined ) {
            return this.notify.options.functionHide(this.element)
        }
        return outAnimate(this.element)
    }

    private stopTimeout() {
        if ( this.timeoutInterval ) {
            clearTimeout(this.timeoutInterval)
        }
    }

    private startTimeout() {
        this.stopTimeout()
        this.timeoutInterval = setTimeout(() => {
            this.hide().then(() => {
                this.element.remove()
            })
        }, this.notify.options.timeout)
    }
}