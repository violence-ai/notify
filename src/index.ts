import {Options} from "./types/Options";
import Message from "./classes/Message";
import {MessageParams} from "./types/MessageParams";
import inAnimate from "./animate-functions/inAnimate";
import outAnimate from "./animate-functions/outAnimate";
import {setCSSStyles} from "./functions/setCSSStyles";
import {styles, styleClassNames} from "./styles";
import {StyleClassNames} from "./types/StyleClassNames";
import {Styles} from "./types/Styles";

export default class Notify {

    static animateFunctions = {inAnimate, outAnimate}
    static defaultStyles = styles
    static defaultStyleClassNames = styleClassNames

    readonly rootElement: HTMLElement
    readonly options: Options

    constructor(options: Options) {
        this.options = options
        this.rootElement = this.createRootElement()
    }

    private createRootElement(): HTMLElement {
        const el = document.createElement('div')
        el.classList.add(this.getStyleClassNames().root)
        setCSSStyles(el, this.getStyles().root)
        document.body.prepend(el)
        return el
    }

    public push(params: MessageParams): void {
        const message = new Message(params, this)
        this.rootElement.prepend(message.element)
    }

    public getStyleClassNames(): StyleClassNames {
        return this.options.styleClassNames ?? styleClassNames
    }

    public getStyles(): Styles {
        return this.options.styles ?? styles
    }
}