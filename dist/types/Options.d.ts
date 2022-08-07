import { styleClassNames } from "../styles";
import { Styles } from "./Styles";
export declare type Options = {
    timeout: number;
    functionShow?: (el: HTMLElement) => Promise<void>;
    functionHide?: (el: HTMLElement) => Promise<void>;
    styles?: Styles;
    styleClassNames?: typeof styleClassNames;
};
