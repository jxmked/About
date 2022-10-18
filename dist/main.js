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
define("modules/get-lang-colors", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Get_Colors = (function () {
        function Get_Colors() {
            console.log("Get colors has been initiated");
            this.thenCallback = function (args) { };
            this.catchCallback = function (args) { };
        }
        Get_Colors.prototype.load = function () {
            console.log("Fetching colors has been started");
            var _catch = this.catchCallback.bind(this.catchCallback);
            var _then = this.thenCallback.bind(this.thenCallback);
            fetch(Get_Colors.url, {
                method: "get"
            }).then(function (res) {
                var status = res.status;
                if (status != 200) {
                    throw new Error("Failed to fetch colors with status code: ".concat(status));
                }
                Get_Colors.__is_success = true;
                console.log("Colors has been fetched!");
                return res.json();
            }).then(function (res) {
                console.log("Translating Color keys into lowercase...");
                var colors = {};
                var keys = Object.keys(res);
                var index = keys.length;
                while (index--) {
                    var key = keys[index];
                    colors[key.toLowerCase()] = res[key];
                }
                console.log("Translated");
                Get_Colors.__loaded_colors = colors;
                console.log("Languages color is good to go");
                _then();
            }).catch(_catch);
        };
        Object.defineProperty(Get_Colors.prototype, "success", {
            get: function () {
                return Get_Colors.__is_success;
            },
            enumerable: false,
            configurable: true
        });
        Get_Colors.lang = function (lang) {
            if (!Get_Colors.__is_success) {
                throw new Error("No colors available");
            }
            lang = lang.toLowerCase();
            if (Get_Colors.__loaded_colors.hasOwnProperty(lang)) {
                return Get_Colors.__loaded_colors[lang];
            }
            throw new TypeError("Cannot find color for ".concat(lang));
        };
        Get_Colors.prototype.then = function (callback) {
            this.thenCallback = callback;
            return this;
        };
        Get_Colors.prototype.catch = function (callback) {
            this.catchCallback = callback;
            return this;
        };
        Get_Colors.url = "assets/data/colors.json";
        Get_Colors.__loaded_colors = {};
        Get_Colors.__is_success = false;
        return Get_Colors;
    }());
    exports.default = Get_Colors;
});
define("known-languages/create-bar-graph", ["require", "exports", "modules/get-lang-colors", "modules/createElement"], function (require, exports, get_lang_colors_1, createElement_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    get_lang_colors_1 = __importDefault(get_lang_colors_1);
    createElement_2 = __importDefault(createElement_2);
    var CreateBarGraph = (function () {
        function CreateBarGraph() {
            this.BASE = (0, createElement_2.default)("div");
            this.PARENT = (0, createElement_2.default)("div");
            this.BASE.appendChild(this.PARENT);
        }
        CreateBarGraph.prototype.item = function (_a) {
            var name = _a.name, value = _a.value;
            var color = get_lang_colors_1.default.lang(name);
            var bar = (0, createElement_2.default)("span", {
                "data-value": value,
                "data-language": name,
                "style": "background-color:".concat(color, ";width:").concat(value, "%;")
            });
            this.PARENT.appendChild(bar);
        };
        Object.defineProperty(CreateBarGraph.prototype, "html", {
            get: function () {
                return this.BASE;
            },
            enumerable: false,
            configurable: true
        });
        return CreateBarGraph;
    }());
    exports.default = CreateBarGraph;
});
define("known-languages/create-list-item", ["require", "exports", "modules/createElement", "modules/get-lang-colors"], function (require, exports, createElement_3, get_lang_colors_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    createElement_3 = __importDefault(createElement_3);
    get_lang_colors_2 = __importDefault(get_lang_colors_2);
    var CreateListItem = (function () {
        function CreateListItem() {
            this.BASE = (0, createElement_3.default)("div");
            this.LIST = (0, createElement_3.default)("ul");
            this.BASE.appendChild(this.LIST);
        }
        CreateListItem.prototype.item = function (_a) {
            var name = _a.name, value = _a.value;
            var color = get_lang_colors_2.default.lang(name);
            var li = (0, createElement_3.default)("li", {
                "data-value": value,
                "data-language": name,
                "data-color": color
            });
            li.appendChild(this.bullet(name, value, color));
            li.appendChild(this.itemName(name, value, color));
            li.appendChild(this.itemValue(name, value, color));
            this.LIST.appendChild(li);
        };
        Object.defineProperty(CreateListItem.prototype, "html", {
            get: function () {
                return this.BASE;
            },
            enumerable: false,
            configurable: true
        });
        CreateListItem.prototype.itemValue = function (name, value, color) {
            return (0, createElement_3.default)("span", {
                "data-value": value,
                "data-language": name,
                "data-color": color,
                "text": value.toFixed(2)
            });
        };
        CreateListItem.prototype.itemName = function (name, value, color) {
            return (0, createElement_3.default)("p", {
                "data-value": value,
                "data-language": name,
                "data-color": color,
                "text": name
            });
        };
        CreateListItem.prototype.bullet = function (name, value, color) {
            return (0, createElement_3.default)("span", {
                "data-value": value,
                "data-language": name,
                "data-color": color,
                "style": "background-color: ".concat(color)
            });
        };
        return CreateListItem;
    }());
    exports.default = CreateListItem;
});
define("known-languages/Known_Lang", ["require", "exports", "modules/label", "modules/createElement", "modules/get_repos", "known-languages/create-bar-graph", "known-languages/create-list-item"], function (require, exports, label_1, createElement_4, get_repos_1, create_bar_graph_1, create_list_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    label_1 = __importDefault(label_1);
    createElement_4 = __importDefault(createElement_4);
    get_repos_1 = __importDefault(get_repos_1);
    create_bar_graph_1 = __importDefault(create_bar_graph_1);
    create_list_item_1 = __importDefault(create_list_item_1);
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
                var last = null;
                var first = null;
                do {
                    if (last && first)
                        Known_Lang.CONTAINER.removeChild(last);
                    last = Known_Lang.CONTAINER.lastChild;
                    first = Known_Lang.CONTAINER.firstChild;
                } while (last != first);
                Known_Lang.BASE.classList.remove("loading");
                console.log("Loading element has been removed");
                console.log("Sorting languages");
                var sortedPert = [];
                var entries = Object.entries(_this.COUNTED_LANGS);
                var rebuild = {};
                entries.sort(function (a, b) {
                    return a[1] - b[1];
                });
                entries.forEach(function (item) {
                    rebuild[item[0]] = item[1];
                });
                _this.COUNTED_LANGS = rebuild;
                _this.createDOMElements();
            });
        }
        Known_Lang.prototype.createDOMElements = function () {
            console.log("Creating DOM Elements...");
            var barGraph = new create_bar_graph_1.default();
            var listItem = new create_list_item_1.default();
            var pert = this.COUNTED_LANGS;
            var keys = Object.keys(pert);
            var index = keys.length;
            var ival = window.setInterval(function () {
                try {
                    var lang = keys[--index];
                    barGraph.item({
                        name: lang,
                        value: pert[lang]
                    });
                    listItem.item({
                        name: lang,
                        value: pert[lang]
                    });
                    console.log("".concat(lang, " has been added to bar graph."));
                }
                catch (TypeError) {
                    clearInterval(ival);
                }
            }, 100);
            Known_Lang.CONTAINER.appendChild(barGraph.html);
            Known_Lang.CONTAINER.appendChild(listItem.html);
        };
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
                    container = (0, createElement_4.default)("div", {
                        "class": "loading-state"
                    });
                    waveContainer = (0, createElement_4.default)("div");
                    waveMotion = (0, createElement_4.default)("div");
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
        Known_Lang.BASE = (0, createElement_4.default)("div", { id: "main-languages" });
        Known_Lang.CONTAINER = (0, createElement_4.default)("div");
        Known_Lang.TEXT_CONTAINER = (0, createElement_4.default)("span");
        return Known_Lang;
    }());
    exports.default = Known_Lang;
});
define("main", ["require", "exports", "globals", "known-languages/Known_Lang", "modules/get-lang-colors"], function (require, exports, globals_2, Known_Lang_1, get_lang_colors_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    globals_2 = __importDefault(globals_2);
    Known_Lang_1 = __importDefault(Known_Lang_1);
    get_lang_colors_3 = __importDefault(get_lang_colors_3);
    (0, globals_2.default)();
    new get_lang_colors_3.default().then(function () {
        console.log("Color loaded");
        new Known_Lang_1.default();
    }).catch(function (err) {
        console.error("Failed to load");
    }).load();
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