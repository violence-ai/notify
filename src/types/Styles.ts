import {CSSStyle} from "../functions/setCSSStyles";

enum StylesProps {
    root = 'root',
    message = 'message',
    content = 'content',
    title = 'title',
    text = 'text',
    close = 'close',
}

export type Styles = {
    [keyof in StylesProps]: CSSStyle
}