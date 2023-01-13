/**
 * Get Languages Color Interface
 *
 * assets/data/color.json
 * */

/**
 * In main.ts
 *
 * Call this constructor first to make initial load so, we can use
 * static get color function with sync method
 * */

type colorProperties = Record<string, hexCode>;

export default class Get_Colors {
    private static url = 'assets/data/colors.json';

    // Save all fetched colors for later use
    private static __loaded_colors: colorProperties = {};

    private thenCallback: Function;
    private catchCallback: Function;

    // Is successfully fetch colors?
    private static __is_success = false;

    constructor() {
        this.thenCallback = (args: any) => {};
        this.catchCallback = (args: any) => {};
    }

    load() {
        const _catch = this.catchCallback.bind(this.catchCallback);
        const _then = this.thenCallback.bind(this.thenCallback);

        fetch(Get_Colors.url, {
            method: 'GET'
        })
            .then((res: any) => {
                if (!res.ok) {
                    // Not ok
                    throw new Error(`Failed to fetch colors with status code: ${res.status}`);
                }

                Get_Colors.__is_success = true;

                return res.json() as colorProperties;
            })
            .then((res: colorProperties) => {
                // Translate key to lower case
                const colors: colorProperties = {};
                const keys: string[] = Object.keys(res);
                let index: number = keys.length,
                    key: string;

                while (index--) {
                    key = keys[index];
                    colors[key.toLowerCase() ] = res[key];
                }

                Get_Colors.__loaded_colors = colors;

                _then();
            })
            .catch(_catch);
    }

    get success(): boolean {
        return Get_Colors.__is_success;
    }

    static lang(lang: string): hexCode {
        if (!Get_Colors.__is_success) {
            throw new Error('No colors available');
        }

        lang = lang.toLowerCase();

        if (Get_Colors.__loaded_colors.hasOwnProperty(lang)) {
            return Get_Colors.__loaded_colors[lang ];
        }

        throw new TypeError(`Cannot find color for ${lang}`);
    }

    then(callback: Function): this {
        this.thenCallback = callback;
        return this;
    }

    catch(callback: Function): this {
        this.catchCallback = callback;
        return this;
    }
}
