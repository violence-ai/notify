import {CSSStyle} from "../functions/setCSSStyles";
import {StyleClassNames} from "./StyleClassNames";

export type Styles = {
    [k in keyof StyleClassNames]: CSSStyle
}