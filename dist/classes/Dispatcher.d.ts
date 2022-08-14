export declare type Changes<T> = {
    action: string;
    payload: T;
};
export interface Observer {
    update: (changes: Changes<any>) => void;
}
export default class Dispatcher {
    private observers;
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    fire(changes: Changes<any>): void;
}
