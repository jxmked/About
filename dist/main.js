var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
        if (exports.env_mode == "dev")
            console.log("Development Mode");
        return;
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
define("known-languages/Known_Lang", ["require", "exports", "modules/label", "modules/createElement"], function (require, exports, label_1, createElement_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    label_1 = __importDefault(label_1);
    createElement_2 = __importDefault(createElement_2);
    class Known_Lang {
        constructor() {
            Known_Lang.CONTAINER.appendChild(new label_1.default({
                title: "Known Languages: ",
                tooltip: "from Github"
            }).html);
            this.display_loading_screen();
            Known_Lang.BASE.appendChild(Known_Lang.CONTAINER);
            Known_Lang.PLACEMENT.parentNode.insertBefore(Known_Lang.BASE, Known_Lang.PLACEMENT.nextSibling);
            this.__promise = new Promise((resolve, reject) => {
                resolve(true);
            }).catch(this.catch.bind(this));
        }
        async display_loading_screen() {
            Known_Lang.BASE.classList.add("loading");
            const container = (0, createElement_2.default)("div", {
                "class": "loading-state"
            });
            const waveContainer = (0, createElement_2.default)("div");
            const waveMotion = (0, createElement_2.default)("div");
            Known_Lang.TEXT_CONTAINER.innerText = "Loading...";
            waveContainer.appendChild(waveMotion);
            container.appendChild(waveContainer);
            container.appendChild(Known_Lang.TEXT_CONTAINER);
            Known_Lang.CONTAINER.appendChild(container);
        }
        async then() {
            return await this.__promise.then((arg) => arg);
        }
        async catch(err) {
            return true;
        }
    }
    exports.default = Known_Lang;
    Known_Lang.PLACEMENT = document.getElementById("main-about");
    Known_Lang.BASE = (0, createElement_2.default)("div", { id: "main-languages" });
    Known_Lang.CONTAINER = (0, createElement_2.default)("div");
    Known_Lang.TEXT_CONTAINER = (0, createElement_2.default)("span");
});
define("main", ["require", "exports", "globals"], function (require, exports, globals_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    globals_2 = __importDefault(globals_2);
    (0, globals_2.default)();
});
define("known-languages/bullet", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Bullet {
        constructor(lang) {
        }
    }
    exports.default = Bullet;
});
define("known-languages/language", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=main.js.map