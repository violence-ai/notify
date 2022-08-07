import { MessageParams } from "../types/MessageParams";
import Notify from "../index";
export default class Message {
    private readonly notify;
    private timeoutInterval;
    elMessage: HTMLElement;
    elContent: HTMLElement;
    elCloseBtn: HTMLElement;
    elTitle: HTMLElement;
    elText: HTMLElement;
    constructor(params: MessageParams, notify: Notify);
    private beforeInsert;
    private afterInsert;
    private afterInAnimateEnd;
    private startOutAnimate;
    private stopTimeout;
    private startTimeout;
}
