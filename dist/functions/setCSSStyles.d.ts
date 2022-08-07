export declare type CSSStyle = {
    [key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[key];
};
export declare function setCSSStyles(el: HTMLElement, styles: CSSStyle): void;
