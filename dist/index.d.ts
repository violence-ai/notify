import { Options } from "./types/Options";
import { MessageParams } from "./types/MessageParams";
import inAnimate from "./animate-functions/inAnimate";
import outAnimate from "./animate-functions/outAnimate";
import { StyleClassNames } from "./types/StyleClassNames";
import { Styles } from "./types/Styles";
export default class Notify {
    static animateFunctions: {
        inAnimate: typeof inAnimate;
        outAnimate: typeof outAnimate;
    };
    static defaultStyles: Styles;
    static defaultStyleClassNames: StyleClassNames;
    readonly rootElement: HTMLElement;
    readonly options: Options;
    constructor(options: Options);
    private createRootElement;
    push(params: MessageParams): void;
    getStyleClassNames(): StyleClassNames;
    getStyles(): Styles;
}
