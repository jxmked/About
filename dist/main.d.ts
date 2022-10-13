declare module "globals" {
    const envRes: Map<any, any>;
    export { envRes };
    export const localforage: LocalForage;
}
declare module "main" { }
declare module "models/label" {
    interface LabelProperties {
        title: string;
        tooltip?: string;
    }
    class Label {
        private title;
        private tooltip?;
        constructor(attributes: LabelProperties);
        private __normalize;
        private __get_tooltip;
        get html(): HTMLElement;
    }
    export default Label;
}
declare module "known-languages/Known_Lang" { }
declare module "known-languages/bullet" {
    export default class Bullet {
        constructor(lang: string);
    }
}
declare module "known-languages/language" { }
