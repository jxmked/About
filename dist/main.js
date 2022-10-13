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
});
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("known-languages/Known_Lang", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Known_Lang {
        constructor() {
            Known_Lang.BASE.appendChild(Known_Lang.CONTAINER);
            Known_Lang.BASE.setAttribute("id", "main-languages");
            this.display_loading_screen();
            this.__promise = new Promise((resolve, reject) => {
            }).catch(this.catch.bind(this));
        }
        async display_loading_screen() {
            Known_Lang.BASE.classList.add("loading");
        }
        async then() {
            return await this.__promise.then((arg) => arg);
        }
        async catch(err) {
            return true;
        }
    }
    Known_Lang.BASE = document.createElement("div");
    Known_Lang.CONTAINER = document.createElement("div");
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