declare module "globals" {
    const envRes: Map<string, any>;
    export { envRes };
    export const localforage: LocalForage;
    export const env_mode: "prod" | "dev";
    const _default: () => void;
    export default _default;
}
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
    const _default_1: (name: CreateElementName, attr?: CreateElementAttributes) => HTMLElement;
    export default _default_1;
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
declare module "modules/get_repos" {
    type getRepoProperties = (arg: RepoProperties[]) => void;
    export default class getRepo {
        private static url;
        private thenCallback;
        private catchCallback;
        constructor();
        then(callback: getRepoProperties): void;
        catch(callback: any): void;
    }
}
declare module "known-languages/Known_Lang" {
    export default class Known_Lang {
        private static PLACEMENT;
        private static BASE;
        private static CONTAINER;
        private static TEXT_CONTAINER;
        private __promise;
        constructor();
        display_loading_screen(): Promise<void>;
        then(): Promise<boolean>;
        catch(err: any): Promise<boolean>;
    }
}
declare module "main" { }
declare module "known-languages/bullet" {
    export default class Bullet {
        constructor(lang: string);
    }
}
declare module "known-languages/language" { }
