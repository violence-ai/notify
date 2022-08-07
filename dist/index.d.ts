import { Options } from "./types/Options";
import { MessageParams } from "./types/MessageParams";
import { Styles } from "./types/Styles";
import { Animate } from "./types/Animate";
export default class Notify {
    static animateFunctions: {
        animateLikeOnIphone: Animate;
    };
    static defaultStyles: Styles;
    readonly rootElement: HTMLElement;
    readonly options: Options;
    constructor(options: Options);
    private createRootElement;
    push(params: MessageParams): void;
    getStyles(): Styles;
    getAnimate(): Animate;
}
