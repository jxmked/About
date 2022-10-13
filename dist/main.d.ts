declare module "globals" {
    const envRes: Map<string, any>;
    export { envRes };
    export const localforage: LocalForage;
    export const env_mode: "prod" | "dev";
}
declare module "main" { }
declare module "modules/createElement" {
    type CreateElementName = string;
    type CreateElementAttributes = {
        [id: string]: any;
    };
    class CreateElement {
        private element;
        private attr?;
        constructor(name: CreateElementName, attr?: CreateElementAttributes);
        private checkout_attributes;
        get html(): HTMLElement;
    }
    export { CreateElement };
    const _default: (name: CreateElementName, attr: CreateElementAttributes) => HTMLElement;
    export default _default;
}
declare module "modules/label" {
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
