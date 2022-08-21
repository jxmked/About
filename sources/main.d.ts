declare class PP_Item_Create {
    obj: any;
    parent: HTMLElement;
    callback: Function;
    static topicExceptions: string[];
    constructor(obj: any);
    static set escaped_topics(topics: any);
    name(): void;
    description(): void;
    topics(): void;
    graphs(): Promise<void>;
    create_bar_graph(percent: number, color: string): HTMLElement;
    create_ranking(key: string, percent: number, color: string): HTMLElement;
    then(callback: Function): void;
}
declare class Main_Lang_loading {
    private static _parent;
    constructor(parent: HTMLElement);
    loadUp(): void;
    private wave_animation;
}
declare class MostLanguages {
    private repoLang;
    private static maxLanguages;
    private static exceptLangs;
    private static __is_initiated__;
    private static username;
    private static currentRepoCount;
    private static countedRepos;
    private static countLangs;
    private static BASE;
    private static PARENT;
    private static TEXT_LOADING_CONTAINER;
    constructor();
    private create_loading_container;
    private static UpdateText;
    private beginCounting;
    private get_repositories;
    private createObjectAttribute;
    setLabel(ret?: boolean): HTMLElement | void;
    private createObject;
}
declare class NavigationPanel {
    constructor();
    static addItem(str: string | number, target: string | number): void;
}
declare class PersonalProjects {
    private repositories;
    private topicIncludes;
    private hideProjects;
    private maxProjects;
    private static __is_initiated__;
    private static username;
    constructor();
    getAllRepositories(callback: Function): Promise<void>;
    __start__(): Promise<void>;
}
declare function normalize(str: string): string;
declare function ObjectSort(value: {
    [id: string]: number;
}): {
    [id: string]: number;
};
declare function safeConcat(...args: any): string;
declare class Config {
    __url: string;
    private static __config;
    constructor();
    load(callback?: Function): Promise<void>;
    static get config(): any;
}
declare class GH_API {
    private __url__;
    private __expiry__;
    private __config__;
    constructor(url: string, expiry: number);
    private static get __auth_token__();
    then(callback: Function, ev?: boolean): Promise<void>;
    private getFromDB;
    private static saveData;
    private static __getDB__;
}
declare function gh_fetch(url: string, expiry: number): GH_API;
declare class getColors {
    private __url;
    private static colors;
    constructor();
    then(callback?: Function): Promise<void>;
    static color(lang: string): string;
}
//# sourceMappingURL=main.d.ts.map