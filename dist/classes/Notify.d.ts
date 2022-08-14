import { Options } from "../types/Options";
import { MessageParams } from "../types/MessageParams";
import Message from "./Message";
export default class Notify {
    static animateFunctions: {
        iphone: import("../types/Animate").Animate;
        slideRight: import("../types/Animate").Animate;
        slideAngle: import("../types/Animate").Animate;
    };
    static defaultStyles: import("../types/Styles").Styles;
    private readonly rootElement;
    private readonly options;
    constructor(options?: Options);
    private createRootElement;
    push(params: MessageParams): void;
    prependMessage(message: Message): void;
    getOptions(): {
        timeout: number;
        animateFunction: import("../types/Animate").Animate;
        styles: import("../types/Styles").Styles;
        gap: number;
        elementShiftTime: number;
    };
}
