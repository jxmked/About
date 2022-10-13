declare module "globals" {
    const envRes: Map<any, any>;
    export { envRes };
    export const localforage: LocalForage;
    export const env_mode: "prod" | "dev";
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
declare module "models/createElement" {
    type CreateElementName = string;
    interface CreateElementAttributes {
        [key: string]: any;
    }
    class CreateElement {
        private element;
        private name;
        private attr?;
        constructor(name: CreateElementName, attr?: CreateElementAttributes);
        private checkout_attributes;
    }
    const _default: (name: CreateElementName, attr: CreateElementAttributes) => CreateElement;
    export default _default;
}
