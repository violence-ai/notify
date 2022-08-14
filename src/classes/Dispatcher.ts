export type Changes<T> = {
    action: string
    payload: T
}

export interface Observer {
    update: (changes: Changes<any>) => void
}

export default class Dispatcher {

    private observers: Observer[] = []

    subscribe(observer: Observer) {
        this.observers.push(observer)
    }

    unsubscribe(observer: Observer) {
        this.observers = this.observers.filter(item => item !== observer)
    }

    fire(changes: Changes<any>) {
        this.observers.forEach(observer => {
            observer.update(changes)
        })
    }
}