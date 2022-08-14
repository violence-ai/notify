import { CSSStyle } from "../functions/setCSSStyles";
declare enum StylesProps {
    root = "root",
    message = "message",
    content = "content",
    title = "title",
    text = "text",
    close = "close"
}
export declare type Styles = {
    [keyof in StylesProps]: CSSStyle;
};
export {};
