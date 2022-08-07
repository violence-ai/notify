import Message from "../classes/Message";

type AnimateDone = () => void

export interface Animate {
    beforeInsert: (message: Message, done: AnimateDone) => void
    afterInsert: (message: Message, done: AnimateDone) => void
    afterInAnimateEnd: (message: Message, done: AnimateDone) => void
    startOutAnimate: (message: Message, done: AnimateDone) => void
}