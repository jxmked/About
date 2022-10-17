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
        if (window.XIO.ENVIRONMENT_MODE == "dev") {
            console.log("Development Mode");
            return;
        }
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
    exports.default = (function () { });
});
define("modules/createElement", ["require", "exports", "globals"], function (require, exports, globals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CreateElement = void 0;
    var CreateElement = (function () {
        function CreateElement(name, attr) {
            this.attr = attr;
            this.element = document.createElement(name.trim());
            this.checkout_attributes();
        }
        CreateElement.prototype.checkout_attributes = function () {
            if (this.attr == void 0)
                return;
            for (var _i = 0, _a = Object.entries(this.attr); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (key == "text") {
                    this.element.appendChild(document.createTextNode(value));
                    continue;
                }
                this.element.setAttribute(key, value);
            }
        };
        Object.defineProperty(CreateElement.prototype, "html", {
            get: function () {
                return this.element;
            },
            enumerable: false,
            configurable: true
        });
        return CreateElement;
    }());
    exports.CreateElement = CreateElement;
    exports.default = (function (name, attr) {
        if (globals_1.env_mode == "dev")
            attr = Object.assign({ "xio-is-virtual": true }, attr);
        return new CreateElement(name, attr).html;
    });
});
define("modules/label", ["require", "exports", "modules/createElement"], function (require, exports, createElement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    createElement_1 = __importDefault(createElement_1);
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
            return (0, createElement_1.default)("span", {
                "class": "tooltip",
                "text": this.__normalize(this.tooltip)
            });
        };
        Object.defineProperty(Label.prototype, "html", {
            get: function () {
                var label = (0, createElement_1.default)("label", {
                    "text": this.__normalize(this.title)
                });
                var tooltip = this.__normalize(this.tooltip);
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
define("modules/get_repos", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getRepo = (function () {
        function getRepo() {
            var _this = this;
            this.thenCallback = function (args) { };
            this.catchCallback = function (args) { };
            fetch(getRepo.url, {
                "method": "GET"
            })
                .then(function (res) { return res.json(); })
                .then(function (res) {
                _this.thenCallback.bind(_this.thenCallback)(res["data"]);
            })
                .catch(this.catchCallback.bind(this));
        }
        getRepo.prototype.then = function (callback) {
            this.thenCallback = callback;
            return this;
        };
        getRepo.prototype.catch = function (callback) {
            this.catchCallback = callback;
            return this;
        };
        getRepo.url = "https://cdn.jsdelivr.net/gh/jxmked/resources@master/repositories.json";
        return getRepo;
    }());
    exports.default = getRepo;
});
define("known-languages/Known_Lang", ["require", "exports", "modules/label", "modules/createElement", "modules/get_repos"], function (require, exports, label_1, createElement_2, get_repos_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    label_1 = __importDefault(label_1);
    createElement_2 = __importDefault(createElement_2);
    get_repos_1 = __importDefault(get_repos_1);
    var Known_Lang = (function () {
        function Known_Lang() {
            var _this = this;
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
            new get_repos_1.default().then(function (repos) {
                console.log("Repositories has been fetched");
                console.log("Parsing Repositories...");
                _this.__calculate(repos);
            });
        }
        Known_Lang.prototype.__calculate = function (repos) {
            console.log("Calculating languages from each repository...");
            var calculated = {};
            for (var _i = 0, _a = Object.values(repos); _i < _a.length; _i++) {
                var _b = _a[_i], languages = _b.languages, name_1 = _b.name;
                console.log("Counting... " + name_1);
                for (var _c = 0, _d = Object.entries(languages); _c < _d.length; _c++) {
                    var _e = _d[_c], lang = _e[0], count = _e[1];
                    if (calculated.hasOwnProperty(lang)) {
                        calculated[lang] += count;
                        continue;
                    }
                    calculated[lang] = count;
                }
            }
            var sum = Object.values(calculated).reduce(function (x, y) { return x + y; });
            var pert = {};
            Object.entries(calculated).forEach(function (_a) {
                var lang = _a[0], count = _a[1];
                pert[lang] = (count / sum) * 100;
            });
            this.COUNTED_LANGS = pert;
            console.log("Calculated");
        };
        Known_Lang.prototype.display_loading_screen = function () {
            return __awaiter(this, void 0, void 0, function () {
                var container, waveContainer, waveMotion;
                return __generator(this, function (_a) {
                    Known_Lang.BASE.classList.add("loading");
                    container = (0, createElement_2.default)("div", {
                        "class": "loading-state"
                    });
                    waveContainer = (0, createElement_2.default)("div");
                    waveMotion = (0, createElement_2.default)("div");
                    Known_Lang.TEXT_CONTAINER.innerText = "Loading...";
                    waveContainer.appendChild(waveMotion);
                    container.appendChild(waveContainer);
                    container.appendChild(Known_Lang.TEXT_CONTAINER);
                    Known_Lang.CONTAINER.appendChild(container);
                    console.log("Loading screen has been added");
                    return [2];
                });
            });
        };
        Known_Lang.prototype.catch = function (err) {
            console.error(err);
        };
        Known_Lang.PLACEMENT = document.getElementById("main-about");
        Known_Lang.BASE = (0, createElement_2.default)("div", { id: "main-languages" });
        Known_Lang.CONTAINER = (0, createElement_2.default)("div");
        Known_Lang.TEXT_CONTAINER = (0, createElement_2.default)("span");
        return Known_Lang;
    }());
    exports.default = Known_Lang;
});
define("main", ["require", "exports", "globals", "known-languages/Known_Lang"], function (require, exports, globals_2, Known_Lang_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    globals_2 = __importDefault(globals_2);
    Known_Lang_1 = __importDefault(Known_Lang_1);
    (0, globals_2.default)();
    new Known_Lang_1.default();
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
//# sourceMappingURL=main.js.map