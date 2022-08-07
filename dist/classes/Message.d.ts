import { MessageParams } from "../types/MessageParams";
import Notify from "../index";
export default class Message {
    private readonly notify;
    readonly element: HTMLElement;
    private readonly title;
    private readonly text;
    private timeoutInterval;
    constructor(params: MessageParams, notify: Notify);
    generateHtml(): HTMLElement;
    private show;
    private hide;
    private stopTimeout;
    private startTimeout;
}
