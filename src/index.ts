import {Options} from "./types/Options";
import Message from "./classes/Message";
import {MessageParams} from "./types/MessageParams";
import {setCSSStyles} from "./functions/setCSSStyles";
import {styles} from "./styles";
import {Styles} from "./types/Styles";
import {animateLikeOnIphone} from "./animate-functions/animateLikeOnIphone";
import {Animate} from "./types/Animate";

export default class Notify {

    static animateFunctions = { animateLikeOnIphone }
    static defaultStyles = styles

    readonly rootElement: HTMLElement
    readonly options: Options

    constructor(options: Options) {
        this.options = options
        this.rootElement = this.createRootElement()
    }

    private createRootElement(): HTMLElement {
        const el = document.createElement('div')
        setCSSStyles(el, this.getStyles().root)
        document.body.prepend(el)
        return el
    }

    public push(params: MessageParams): void {
        new Message(params, this)
    }

    public getStyles(): Styles {
        return this.options.styles ?? Notify.defaultStyles
    }

    public getAnimate(): Animate {
        return this.options.animateFunction ?? animateLikeOnIphone
    }
}