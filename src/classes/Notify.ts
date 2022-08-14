import {iphone} from "../animate-functions/iphone";
import {slideRight} from "../animate-functions/slideRight";
import {slideAngle} from "../animate-functions/slideAngle";
import {styles} from "../styles";
import {Options} from "../types/Options";
import {setCSSStyles} from "../functions/setCSSStyles";
import {MessageParams} from "../types/MessageParams";
import Message from "./Message";

export default class Notify {

    static animateFunctions = { iphone, slideRight, slideAngle }
    static defaultStyles = styles

    private readonly rootElement: HTMLElement
    private readonly options: Options | undefined

    constructor(options?: Options) {
        this.options = options
        this.rootElement = this.createRootElement()
    }

    private createRootElement(): HTMLElement {
        const el = document.createElement('div')
        setCSSStyles(el, this.getOptions().styles.root)
        document.addEventListener('DOMContentLoaded', () => {
            document.body.prepend(el)
        })
        return el
    }

    public push(params: MessageParams): void {
        new Message(params, this)
    }

    public prependMessage(message: Message): void {
        this.rootElement.prepend(message.elMessage)
    }

    public getOptions() {
        return {
            timeout: this.options?.timeout ?? 5000,
            animateFunction: this.options?.animateFunction ?? iphone,
            styles: this.options?.styles ?? Notify.defaultStyles,
            gap: this.options?.gap ?? 10,
            elementShiftTime: this.options?.elementShiftTime ?? 500,
        }
    }
}