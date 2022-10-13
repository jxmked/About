var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define("globals", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.env_mode = exports.localforage = exports.envRes = void 0;
    window.__ENVIRONMENT__ = window.__ENVIRONMENT__ || new Map();
    var envRes = window.__ENVIRONMENT__;
    exports.envRes = envRes;
    exports.localforage = window.localforage || {};
    window.XIO.ENVIRONMENT_MODE = window.XIO.ENVIRONMENT_MODE || "dev";
    exports.env_mode = window.XIO.ENVIRONMENT_MODE;
    (function () {
        if (exports.env_mode == "dev")
            console.log("Development Mode");
        return;
        console.log("Console has been disabled");
        for (var i in console)
            console[i] = function () { };
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
define("models/label", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Label = (function () {
        function Label(attributes) {
            var properties = Object.assign({
                title: "",
                tooltip: void 0
            }, attributes);
            this.title = properties.title;
            this.tooltip = properties.tooltip;
        }
        Label.prototype.__normalize = function (str) {
            if (!str)
                return void 0;
            str = str.normalize("NFD");
            str = str.trim();
            return str;
        };
        Label.prototype.__get_tooltip = function () {
            var span = document.createElement("span");
            var text = document.createTextNode(this.__normalize(this.tooltip));
            span.classList.add("tooltip");
            span.appendChild(text);
            return span;
        };
        Object.defineProperty(Label.prototype, "html", {
            get: function () {
                var label = document.createElement("label");
                var text = document.createTextNode(this.__normalize(this.title));
                var tooltip = this.__normalize(this.tooltip);
                label.appendChild(text);
                if (tooltip != void 0 || tooltip != "") {
                    label.appendChild(this.__get_tooltip());
                }
                return label;
            },
            enumerable: false,
            configurable: true
        });
        return Label;
    }());
    exports.default = Label;
});
define("known-languages/Known_Lang", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Known_Lang = (function () {
        function Known_Lang() {
            Known_Lang.BASE.appendChild(Known_Lang.CONTAINER);
            Known_Lang.BASE.setAttribute("id", "main-languages");
            this.display_loading_screen();
            this.__promise = new Promise(function (resolve, reject) {
            }).catch(this.catch.bind(this));
        }
        Known_Lang.prototype.display_loading_screen = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    Known_Lang.BASE.classList.add("loading");
                    return [2];
                });
            });
        };
        Known_Lang.prototype.then = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.__promise.then(function (arg) { return arg; })];
                        case 1: return [2, _a.sent()];
                    }
                });
            });
        };
        Known_Lang.prototype.catch = function (err) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, true];
                });
            });
        };
        Known_Lang.BASE = document.createElement("div");
        Known_Lang.CONTAINER = document.createElement("div");
        return Known_Lang;
    }());
});
define("known-languages/bullet", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Bullet = (function () {
        function Bullet(lang) {
        }
        return Bullet;
    }());
    exports.default = Bullet;
});
define("known-languages/language", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("models/createElement", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CreateElement = (function () {
        function CreateElement(name, attr) {
            this.name = name;
            this.attr = attr;
            this.element = document.createElement(name.trim());
        }
        CreateElement.prototype.checkout_attributes = function () {
            if (this.attr == void 0)
                return;
        };
        return CreateElement;
    }());
    exports.default = (function (name, attr) {
        attr = Object.assign({
            "xio-is-virtual": true
        }, attr);
        return new CreateElement(name, attr);
    });
});
//# sourceMappingURL=main.js.map