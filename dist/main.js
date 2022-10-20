var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("globals", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.env_mode = exports.localforage = exports.envRes = void 0;
    window.__ENVIRONMENT__ = window.__ENVIRONMENT__ || new Map();
    const envRes = window.__ENVIRONMENT__;
    exports.envRes = envRes;
    exports.localforage = window.localforage || {};
    window.XIO.ENVIRONMENT_MODE = window.XIO.ENVIRONMENT_MODE || "dev";
    exports.env_mode = window.XIO.ENVIRONMENT_MODE;
    (() => {
        if (window.XIO.ENVIRONMENT_MODE == "dev") {
            console.log("Development Mode");
            return;
        }
        console.log("Console has been disabled");
        for (let i in console)
            console[i] = () => { };
    })();
    envRes.set("configs", {
        "personal": {
            "name": {
                "first": "Jovanni",
                "last": "De Guia"
            },
            "github_username": "jxmked",
            "email": "jovandeguia@gmail.com"
        },
        "socials": {
            "github": "https://github.com/jxmked",
            "facebook": "https://facebook.com/deguia25",
            "instagram": "https://www.instagram.com/jxmked/",
            "twitter": "https://twitter.com/jxmked"
        }
    });
    exports.default = () => { };
});
define("modules/createElement", ["require", "exports", "globals"], function (require, exports, globals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateElement = void 0;
    class CreateElement {
        constructor(name, attr) {
            this.attr = attr;
            this.element = document.createElement(name.trim());
            this.checkout_attributes();
        }
        checkout_attributes() {
            if (this.attr == void 0)
                return;
            for (const [key, value] of Object.entries(this.attr)) {
                if (key == "text") {
                    this.element.appendChild(document.createTextNode(value));
                    continue;
                }
                this.element.setAttribute(key, value);
            }
        }
        get html() {
            return this.element;
        }
    }
    exports.CreateElement = CreateElement;
    exports.default = (name, attr) => {
        if (globals_1.env_mode == "dev")
            attr = Object.assign({ "xio-is-virtual": true }, attr);
        return new CreateElement(name, attr).html;
    };
});
define("modules/label", ["require", "exports", "modules/createElement"], function (require, exports, createElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    createElement_1 = __importDefault(createElement_1);
    class Label {
        constructor(attributes) {
            const properties = Object.assign({
                title: "",
                tooltip: void 0
            }, attributes);
            this.title = properties.title;
            this.tooltip = properties.tooltip;
        }
        __normalize(str) {
            if (!str)
                return void 0;
            str = str.normalize("NFD");
            str = str.trim();
            return str;
        }
        __get_tooltip() {
            return (0, createElement_1.default)("span", {
                "class": "tooltip",
                "text": this.__normalize(this.tooltip)
            });
        }
        get html() {
            const label = (0, createElement_1.default)("label", {
                "text": this.__normalize(this.title)
            });
            const tooltip = this.__normalize(this.tooltip);
            if (tooltip != void 0 || tooltip != "") {
                label.appendChild(this.__get_tooltip());
            }
            return label;
        }
    }
    exports.default = Label;
});
define("modules/get_repos", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class getRepo {
        constructor() {
            this.thenCallback = (args) => { };
            this.catchCallback = (args) => {
                console.error(args);
            };
            fetch(getRepo.url, {
                "method": "GET"
            }).then((response) => response.json())
                .then((response) => {
                this.thenCallback(response["data"]);
            }).catch((err) => { this.catchCallback(err); });
        }
        then(callback) {
            this.thenCallback = callback;
            return this;
        }
        catch(callback) {
            this.catchCallback = callback;
            return this;
        }
    }
    exports.default = getRepo;
    getRepo.url = "https://cdn.jsdelivr.net/gh/jxmked/resources@master/repositories.json";
});
define("modules/get-lang-colors", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Get_Colors {
        constructor() {
            console.log("Get colors has been initiated");
            this.thenCallback = (args) => { };
            this.catchCallback = (args) => { };
        }
        load() {
            console.log("Fetching colors has been started");
            const _catch = this.catchCallback.bind(this.catchCallback);
            const _then = this.thenCallback.bind(this.thenCallback);
            fetch(Get_Colors.url, {
                method: "get"
            }).then((res) => {
                const status = res.status;
                if (status != 200) {
                    throw new Error(`Failed to fetch colors with status code: ${status}`);
                }
                Get_Colors.__is_success = true;
                console.log("Colors has been fetched!");
                return res.json();
            }).then((res) => {
                console.log("Translating Color keys into lowercase...");
                const colors = {};
                const keys = Object.keys(res);
                let index = keys.length;
                while (index--) {
                    let key = keys[index];
                    colors[key.toLowerCase()] = res[key];
                }
                console.log("Translated");
                Get_Colors.__loaded_colors = colors;
                console.log("Languages color is good to go");
                _then();
            }).catch(_catch);
        }
        get success() {
            return Get_Colors.__is_success;
        }
        static lang(lang) {
            if (!Get_Colors.__is_success) {
                throw new Error("No colors available");
            }
            lang = lang.toLowerCase();
            if (Get_Colors.__loaded_colors.hasOwnProperty(lang)) {
                return Get_Colors.__loaded_colors[lang];
            }
            throw new TypeError(`Cannot find color for ${lang}`);
        }
        then(callback) {
            this.thenCallback = callback;
            return this;
        }
        catch(callback) {
            this.catchCallback = callback;
            return this;
        }
    }
    exports.default = Get_Colors;
    Get_Colors.url = "assets/data/colors.json";
    Get_Colors.__loaded_colors = {};
    Get_Colors.__is_success = false;
});
define("known-languages/create-bar-graph", ["require", "exports", "modules/get-lang-colors", "modules/createElement"], function (require, exports, get_lang_colors_1, createElement_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    get_lang_colors_1 = __importDefault(get_lang_colors_1);
    createElement_2 = __importDefault(createElement_2);
    class CreateBarGraph {
        constructor() {
            this.BASE = (0, createElement_2.default)("div");
            this.PARENT = (0, createElement_2.default)("div");
            this.BASE.appendChild(this.PARENT);
        }
        item({ name, value }) {
            const color = get_lang_colors_1.default.lang(name);
            const bar = (0, createElement_2.default)("span", {
                "data-value": value,
                "data-language": name,
                "style": `background-color:${color};width:${value}%;`
            });
            this.PARENT.appendChild(bar);
        }
        get html() {
            return this.BASE;
        }
    }
    exports.default = CreateBarGraph;
});
define("known-languages/create-list-item", ["require", "exports", "modules/createElement", "modules/get-lang-colors"], function (require, exports, createElement_3, get_lang_colors_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    createElement_3 = __importDefault(createElement_3);
    get_lang_colors_2 = __importDefault(get_lang_colors_2);
    class CreateListItem {
        constructor() {
            this.BASE = (0, createElement_3.default)("div");
            this.LIST = (0, createElement_3.default)("ul");
            this.BASE.appendChild(this.LIST);
        }
        item({ name, value }) {
            const color = get_lang_colors_2.default.lang(name);
            const li = (0, createElement_3.default)("li", {
                "data-value": value,
                "data-language": name,
                "data-color": color
            });
            li.appendChild(this.bullet(name, value, color));
            li.appendChild(this.itemName(name, value, color));
            li.appendChild(this.itemValue(name, value, color));
            this.LIST.appendChild(li);
        }
        get html() {
            return this.BASE;
        }
        itemValue(name, value, color) {
            return (0, createElement_3.default)("span", {
                "data-value": value,
                "data-language": name,
                "data-color": color,
                "text": value.toFixed(2)
            });
        }
        itemName(name, value, color) {
            return (0, createElement_3.default)("p", {
                "data-value": value,
                "data-language": name,
                "data-color": color,
                "text": name
            });
        }
        bullet(name, value, color) {
            return (0, createElement_3.default)("span", {
                "data-value": value,
                "data-language": name,
                "data-color": color,
                "style": `background-color: ${color}`
            });
        }
    }
    exports.default = CreateListItem;
});
define("known-languages/Known_Lang", ["require", "exports", "globals", "modules/label", "modules/createElement", "modules/get_repos", "known-languages/create-bar-graph", "known-languages/create-list-item"], function (require, exports, globals_2, label_1, createElement_4, get_repos_1, create_bar_graph_1, create_list_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    label_1 = __importDefault(label_1);
    createElement_4 = __importDefault(createElement_4);
    get_repos_1 = __importDefault(get_repos_1);
    create_bar_graph_1 = __importDefault(create_bar_graph_1);
    create_list_item_1 = __importDefault(create_list_item_1);
    class Known_Lang {
        constructor() {
            console.log("Known_Lang has been initiated");
            this.COUNTED_LANGS = {};
            Known_Lang.CONTAINER.appendChild(new label_1.default({
                title: "Known Languages: ",
                tooltip: "from Github"
            }).html);
            this.display_loading_screen();
            Known_Lang.BASE.appendChild(Known_Lang.CONTAINER);
            Known_Lang.PLACEMENT.parentNode.insertBefore(Known_Lang.BASE, Known_Lang.PLACEMENT.nextSibling);
            console.log("Starting to fetch github repositories...");
            new get_repos_1.default().then((repos) => {
                console.log("Repositories has been fetched");
                console.log("Parsing Repositories...");
                this.__calculate(repos);
                console.log("Sorting languages");
                const entries = Object.entries(this.COUNTED_LANGS);
                const rebuild = {};
                const skips = (globals_2.envRes.get("known-lang-skip") || []).map((x) => x.toLowerCase());
                entries.sort((a, b) => a[1] - b[1]);
                console.log(skips);
                entries.forEach((item) => {
                    if (skips.indexOf(item[0].toLowerCase()) == -1)
                        rebuild[item[0]] = item[1];
                });
                const sum = Object.values(rebuild).reduce((x, y) => x + y);
                const pert = {};
                Object.entries(rebuild).forEach(([lang, count]) => {
                    pert[lang] = (count / sum) * 100;
                });
                this.COUNTED_LANGS = pert;
                let last = null;
                let first = null;
                do {
                    if (last && first)
                        Known_Lang.CONTAINER.removeChild(last);
                    last = Known_Lang.CONTAINER.lastChild;
                    first = Known_Lang.CONTAINER.firstChild;
                } while (last != first);
                Known_Lang.BASE.classList.remove("loading");
                console.log("Loading element has been removed");
                this.createDOMElements();
            }).catch((err) => {
                Known_Lang.TEXT_CONTAINER.innerText = "Failed to load";
                console.error(err);
            });
        }
        createDOMElements() {
            console.log("Creating DOM Elements...");
            const barGraph = new create_bar_graph_1.default();
            const listItem = new create_list_item_1.default();
            const pert = this.COUNTED_LANGS;
            const keys = Object.keys(pert);
            let index = keys.length;
            let ival = window.setInterval(() => {
                try {
                    const lang = keys[--index];
                    barGraph.item({
                        name: lang,
                        value: pert[lang]
                    });
                    listItem.item({
                        name: lang,
                        value: pert[lang]
                    });
                    console.log(`'${lang}' language has been added to bar graph.`);
                }
                catch (TypeError) {
                    clearInterval(ival);
                }
            }, 100);
            Known_Lang.CONTAINER.appendChild(barGraph.html);
            Known_Lang.CONTAINER.appendChild(listItem.html);
        }
        __calculate(repos) {
            console.log("Calculating languages from each repository...");
            const calculated = {};
            for (const { languages, name } of Object.values(repos)) {
                console.log("Counting... " + name);
                for (const [lang, count] of Object.entries(languages)) {
                    if (calculated.hasOwnProperty(lang)) {
                        calculated[lang] += count;
                        continue;
                    }
                    calculated[lang] = count;
                }
            }
            this.COUNTED_LANGS = calculated;
            console.log("Calculated");
        }
        display_loading_screen() {
            return __awaiter(this, void 0, void 0, function* () {
                Known_Lang.BASE.classList.add("loading");
                const container = (0, createElement_4.default)("div", {
                    "class": "loading-state"
                });
                const waveContainer = (0, createElement_4.default)("div");
                const waveMotion = (0, createElement_4.default)("div");
                Known_Lang.TEXT_CONTAINER.innerText = "Loading...";
                waveContainer.appendChild(waveMotion);
                container.appendChild(waveContainer);
                container.appendChild(Known_Lang.TEXT_CONTAINER);
                Known_Lang.CONTAINER.appendChild(container);
                console.log("Loading screen has been added");
            });
        }
        catch(err) {
            console.error(err);
        }
    }
    exports.default = Known_Lang;
    Known_Lang.PLACEMENT = document.getElementById("main-about");
    Known_Lang.BASE = (0, createElement_4.default)("div", { id: "main-languages" });
    Known_Lang.CONTAINER = (0, createElement_4.default)("div");
    Known_Lang.TEXT_CONTAINER = (0, createElement_4.default)("span");
});
define("main", ["require", "exports", "globals", "known-languages/Known_Lang", "modules/get-lang-colors"], function (require, exports, globals_3, Known_Lang_1, get_lang_colors_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    globals_3 = __importDefault(globals_3);
    Known_Lang_1 = __importDefault(Known_Lang_1);
    get_lang_colors_3 = __importDefault(get_lang_colors_3);
    (0, globals_3.default)();
    new get_lang_colors_3.default().then(() => {
        console.log("Color loaded");
        new Known_Lang_1.default();
    }).catch((err) => {
        console.error("Failed to load");
    }).load();
});
//# sourceMappingURL=main.js.map