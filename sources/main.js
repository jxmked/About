"use strict";
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
window.addEventListener("DOMContentLoaded", function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, username, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                new NavigationPanel();
                NavigationPanel.addItem("Introduction", "main-introduction");
                NavigationPanel.addItem("About Me", "main-about");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, new Config().load()];
            case 2:
                _a.sent();
                data = Config.config;
                username = data['github']['username'];
                if (!username) {
                    console.error("Github username does not exists");
                    return [2];
                }
                return [4, new getColors().then()];
            case 3:
                _a.sent();
                new MostLanguages();
                new PersonalProjects();
                return [3, 5];
            case 4:
                e_1 = _a.sent();
                console.error(e_1);
                console.error("Failed to parse userdata!");
                console.error("Please check your inputs.");
                return [3, 5];
            case 5: return [2];
        }
    });
}); });
var PP_Item_Create = (function () {
    function PP_Item_Create(obj) {
        this.obj = obj;
        this.parent = document.createElement('div');
        this.parent.classList.add('pp-items');
        this.parent.classList.add('observable');
        this.name();
        this.description();
        this.topics();
        this.graphs();
        this.callback = function (x) { };
    }
    Object.defineProperty(PP_Item_Create, "escaped_topics", {
        set: function (topics) {
            PP_Item_Create.topicExceptions = topics;
        },
        enumerable: false,
        configurable: true
    });
    PP_Item_Create.prototype.name = function () {
        var a = document.createElement('a');
        var label = document.createElement('label');
        a.setAttribute('href', this.obj['html_url']);
        a.setAttribute('rel', 'noopener noreferrer');
        a.setAttribute('target', '_blank');
        a.appendChild(document.createTextNode(this.obj['full_name']));
        label.appendChild(a);
        this.parent.appendChild(label);
    };
    PP_Item_Create.prototype.description = function () {
        var desc = '"No description provided."';
        var p = document.createElement('p');
        var div = document.createElement('div');
        try {
            var res = String(this.obj['description']).trim();
            desc = (res.length == 0) ? desc : res;
        }
        catch (e) {
        }
        finally {
            p.appendChild(document.createTextNode(desc));
            div.appendChild(p);
            this.parent.appendChild(div);
        }
    };
    PP_Item_Create.prototype.topics = function () {
        var ul = document.createElement('ul');
        var div = document.createElement('div');
        this.obj['topics'].forEach(function (topic) {
            if (PP_Item_Create.topicExceptions.length > 0)
                if (PP_Item_Create.topicExceptions.indexOf(normalize(topic)) != -1)
                    return;
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(topic.trim()));
            ul.appendChild(li);
        });
        div.appendChild(ul);
        this.parent.appendChild(div);
    };
    PP_Item_Create.prototype.graphs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var div, ul, result, sum;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        div = document.createElement('div');
                        ul = document.createElement('ul');
                        result = {};
                        sum = 0;
                        return [4, gh_fetch(this.obj['languages_url'], 1).then(function (res) {
                                result = ObjectSort(res);
                                if (Object.entries(res).length > 0)
                                    sum = Object.values(result).reduce(function (x, y) { return x + y; });
                                Object.keys(result).forEach(function (key) {
                                    var color = getColors.color(key);
                                    var percent = (result[key] / sum) * 100;
                                    if (sum == 0)
                                        percent = 0;
                                    var span = _this.create_bar_graph(percent, color);
                                    div.appendChild(span);
                                    var li = _this.create_ranking(key, percent, color);
                                    ul.appendChild(li);
                                });
                                var base = document.createElement('div');
                                base.appendChild(div);
                                base.appendChild(ul);
                                _this.parent.appendChild(base);
                                _this.callback(_this.parent);
                            }).catch(function (err) {
                                console.error(err);
                            })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PP_Item_Create.prototype.create_bar_graph = function (percent, color) {
        var span = document.createElement('span');
        span.style.backgroundColor = color;
        span.style.width = String(percent) + "%";
        return span;
    };
    PP_Item_Create.prototype.create_ranking = function (key, percent, color) {
        var li = document.createElement('li');
        var a, b, c;
        a = document.createElement('span');
        a.style.backgroundColor = color;
        b = document.createElement('p');
        b.classList.add('language');
        b.appendChild(document.createTextNode(key));
        c = document.createElement('p');
        var x = parseFloat(String(percent)).toFixed(2);
        c.appendChild(document.createTextNode(x));
        li.appendChild(a);
        li.appendChild(b);
        li.appendChild(c);
        li.classList.add('item');
        return li;
    };
    PP_Item_Create.prototype.then = function (callback) {
        this.callback = callback;
    };
    PP_Item_Create.topicExceptions = [];
    return PP_Item_Create;
}());
var Main_Lang_loading = (function () {
    function Main_Lang_loading(parent) {
        Main_Lang_loading._parent = parent;
    }
    Main_Lang_loading.prototype.loadUp = function () {
        Main_Lang_loading._parent.classList.add("loading");
        this.wave_animation();
    };
    Main_Lang_loading.prototype.wave_animation = function () {
    };
    return Main_Lang_loading;
}());
var MostLanguages = (function () {
    function MostLanguages() {
        var _this = this;
        this.repoLang = {};
        MostLanguages.username = Config.config['github']['username'];
        var el = Config.config['github']['mostly_used_languages']['exception'];
        var ml = Config.config['github']['mostly_used_languages']['max_display_language'];
        MostLanguages.maxLanguages = ml;
        MostLanguages.exceptLangs = el.map(function (x) { return normalize(x); });
        if (MostLanguages.__is_initiated__)
            return;
        MostLanguages.__is_initiated__ = true;
        MostLanguages.BASE.setAttribute('id', "main-languages");
        MostLanguages.BASE.appendChild(MostLanguages.PARENT);
        var target = document.getElementById('main-about');
        MostLanguages.BASE.classList.add('observable');
        target.parentNode.insertBefore(MostLanguages.BASE, target.nextSibling);
        NavigationPanel.addItem("Known Languages", "main-languages");
        this.create_loading_container();
        this.get_repositories(function () {
            _this.beginCounting();
            console.log(MostLanguages.countedRepos);
        });
    }
    MostLanguages.prototype.create_loading_container = function () {
        this.setLabel();
        MostLanguages.BASE.classList.add('loading');
        var container = document.createElement('div');
        container.classList.add('loading-state');
        var waveContainer = document.createElement('div');
        var waveMotion = document.createElement('div');
        waveContainer.appendChild(waveMotion);
        container.appendChild(waveContainer);
        container.appendChild(MostLanguages.TEXT_LOADING_CONTAINER);
        MostLanguages.TEXT_LOADING_CONTAINER.innerText = "Loading...";
        MostLanguages.PARENT.appendChild(container);
    };
    MostLanguages.UpdateText = function (text, hasCount) {
        if (hasCount === void 0) { hasCount = false; }
        var str = text;
        if (hasCount) {
            str = "".concat(text, " (").concat(MostLanguages.countedRepos, " out of ").concat(MostLanguages.currentRepoCount, ")");
        }
        MostLanguages.TEXT_LOADING_CONTAINER.innerText = str;
    };
    MostLanguages.prototype.beginCounting = function () {
        var _this = this;
        var sorted = ObjectSort(MostLanguages.countLangs);
        Object.keys(sorted).splice(0, MostLanguages.maxLanguages).forEach(function (key) {
            _this.repoLang[key] = sorted[key];
        });
        this.createObject();
    };
    MostLanguages.prototype.get_repositories = function (callback) {
        var _this = this;
        var url = "https://api.github.com/users/".concat(MostLanguages.username, "/repos?per_page=50");
        var getLangs = function (repo, resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                gh_fetch(repo['languages_url'], 1).then(function (langs, isError) {
                    for (var _i = 0, _a = Object.entries(langs); _i < _a.length; _i++) {
                        var _b = _a[_i], key = _b[0], value = _b[1];
                        if (MostLanguages.exceptLangs.indexOf(normalize(key)) == -1) {
                            if (!MostLanguages.countLangs[key])
                                MostLanguages.countLangs[key] = 0;
                            MostLanguages.countLangs[key] += value;
                        }
                    }
                    MostLanguages.UpdateText(repo['name'], true);
                    if (!isError) {
                        MostLanguages.countedRepos++;
                    }
                    else {
                        console.info("Error: ".concat(repo['name']));
                    }
                    resolve();
                }, true).catch(function (err) { return reject(err); });
                return [2];
            });
        }); };
        var start = function (page, callback) {
            var count = 0;
            var repoUrl = url;
            if (page > 1)
                repoUrl = "".concat(url, "&page=").concat(page);
            gh_fetch(repoUrl, 1).then(function (repos) {
                MostLanguages.currentRepoCount += repos.length;
                if (repos.length == 0) {
                    callback();
                    return;
                }
                try {
                    repos.forEach(function (repo) {
                        getLangs(repo, function () {
                            count++;
                            if (repos.length == count) {
                                start(page + 1, callback);
                            }
                        }, callback);
                    });
                }
                catch (TypeError) {
                    callback();
                }
            });
        };
        var isCalled = false;
        start(1, function () {
            if (!isCalled) {
                callback();
                isCalled = true;
            }
        });
    };
    MostLanguages.prototype.createObjectAttribute = function (color, computed, name) {
        var bullet = document.createElement('span');
        var langName = document.createElement('p');
        var percentage = document.createElement('span');
        var parent = document.createElement('li');
        bullet.style.backgroundColor = color;
        bullet.setAttribute('data-value', color);
        parent.appendChild(bullet);
        langName.appendChild(document.createTextNode(name));
        parent.appendChild(langName);
        var text = parseFloat(computed).toFixed(2);
        percentage.appendChild(document.createTextNode("".concat(text, "%")));
        percentage.setAttribute('data-value', computed);
        parent.appendChild(percentage);
        return parent;
    };
    MostLanguages.prototype.setLabel = function (ret) {
        if (ret === void 0) { ret = false; }
        var label = document.createElement('label');
        var tooltip = document.createElement('span');
        label.appendChild(document.createTextNode('Known Languages:'));
        tooltip.appendChild(document.createTextNode('from Github'));
        tooltip.classList.add('tooltip');
        label.appendChild(tooltip);
        if (ret)
            return label;
        MostLanguages.PARENT.appendChild(label);
    };
    MostLanguages.prototype.createObject = function () {
        var _this = this;
        if (Object.values(this.repoLang).length < 1) {
            MostLanguages.UpdateText("No Entries Found");
            return;
        }
        var parent = document.createElement("div");
        var sum = Object.values(this.repoLang).reduce(function (x, y) { return x + y; });
        var sorted = ObjectSort(this.repoLang);
        var barElement = document.createElement('div');
        var ulElement = document.createElement('ul');
        Object.entries(sorted).forEach(function (_) {
            var k = _[0];
            var v = _[1];
            var computed = String((v / sum) * 100);
            var color = getColors.color(k);
            var bar = document.createElement('span');
            bar.style.backgroundColor = color;
            bar.style.width = computed + "%";
            bar.setAttribute('data-value', computed);
            barElement.appendChild(bar);
            ulElement.appendChild(_this.createObjectAttribute(color, computed, k));
        });
        var barBase = document.createElement('div');
        barBase.appendChild(barElement);
        var mainLang = document.createElement('div');
        mainLang.appendChild(ulElement);
        parent.appendChild(this.setLabel(true));
        parent.appendChild(barBase);
        parent.appendChild(mainLang);
        MostLanguages.UpdateText("".concat(MostLanguages.countedRepos, " repositories loaded."));
        window.setTimeout(function () {
            MostLanguages.PARENT.remove();
            MostLanguages.BASE.classList.remove('loading');
            MostLanguages.BASE.appendChild(parent);
        }, 1000);
    };
    MostLanguages.maxLanguages = 0;
    MostLanguages.exceptLangs = [];
    MostLanguages.__is_initiated__ = false;
    MostLanguages.currentRepoCount = 0;
    MostLanguages.countedRepos = 0;
    MostLanguages.countLangs = {};
    MostLanguages.BASE = document.createElement('div');
    MostLanguages.PARENT = document.createElement('div');
    MostLanguages.TEXT_LOADING_CONTAINER = document.createElement('span');
    return MostLanguages;
}());
var NavigationPanel = (function () {
    function NavigationPanel() {
        document.getElementById("nav-panel").addEventListener("click", function () {
            document.getElementById("--cb-burger-menu").click();
        }, true);
    }
    NavigationPanel.addItem = function (str, target) {
        var invalid = [void 0, 0, null, ""];
        str = String(str).trim();
        target = encodeURI(String(target));
        if ((invalid.indexOf(str) != -1) ||
            (invalid.indexOf(target) != -1)) {
            throw new Error("Unable to add");
        }
        var base = document.createElement("li");
        var hyper = document.createElement("a");
        hyper.appendChild(document.createTextNode(str));
        hyper.setAttribute("href", "#".concat(target));
        hyper.setAttribute("rel", "noreferrer origin");
        hyper.setAttribute("alt", "Navigate to ".concat(str));
        base.appendChild(hyper);
        try {
            var parent_1 = document.getElementById("nav-panel-list");
            parent_1.appendChild(base);
        }
        catch (e) {
            console.error("Unable to insert element");
            console.error(e);
        }
    };
    return NavigationPanel;
}());
var PersonalProjects = (function () {
    function PersonalProjects() {
        var _this = this;
        var username = Config.config['github']['username'];
        var targetTopics = Config.config['github']['personal_projects']['target_topics'];
        var maxProjects = Config.config['github']['personal_projects']['max_display_projects'];
        var hideProjects = Config.config['github']['personal_projects']['hide_projects'];
        this.topicIncludes = targetTopics.map(function (v) { return normalize(v); });
        this.hideProjects = hideProjects.map(function (v) { return normalize(v); });
        this.maxProjects = Number(maxProjects);
        this.repositories = [];
        PersonalProjects.username = username;
        if (PersonalProjects.__is_initiated__)
            return;
        PersonalProjects.__is_initiated__ = true;
        this.getAllRepositories(function () {
            _this.__start__();
        });
    }
    PersonalProjects.prototype.getAllRepositories = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var url, getRepositories;
            var _this = this;
            return __generator(this, function (_a) {
                url = "https://api.github.com/users/".concat(PersonalProjects.username, "/repos?per_page=50");
                getRepositories = function (page) { return __awaiter(_this, void 0, void 0, function () {
                    var repoUrl;
                    var _this = this;
                    return __generator(this, function (_a) {
                        repoUrl = url;
                        if (page > 1)
                            repoUrl = "".concat(url, "&page=").concat(page);
                        gh_fetch(repoUrl, 1).then(function (repos) {
                            if (_this.repositories.length >= _this.maxProjects || repos.length == 0) {
                                callback();
                                return;
                            }
                            _this.repositories = _this.repositories.concat(repos);
                            getRepositories(page + 1);
                        });
                        return [2];
                    });
                }); };
                getRepositories(1);
                return [2];
            });
        });
    };
    PersonalProjects.prototype.__start__ = function () {
        return __awaiter(this, void 0, void 0, function () {
            var base, div, itemList, label, tooltip, target, result, valids;
            var _this = this;
            return __generator(this, function (_a) {
                base = document.createElement('div');
                div = document.createElement('div');
                itemList = document.createElement('div');
                base.setAttribute('id', 'main-personal-projects');
                label = document.createElement('label');
                tooltip = document.createElement('span');
                label.appendChild(document.createTextNode('Some Personal Projects:'));
                tooltip.appendChild(document.createTextNode('from Github'));
                tooltip.classList.add('tooltip');
                label.appendChild(tooltip);
                div.appendChild(label);
                base.appendChild(div);
                target = document.getElementById('main-languages');
                if (!target) {
                    target = document.getElementById("main-about");
                }
                result = this.repositories.splice(0, this.maxProjects);
                valids = result;
                if (this.topicIncludes.length > 0) {
                    valids = result.filter(function (value) {
                        if (_this.hideProjects.indexOf(normalize(value['name'])) != -1) {
                            return false;
                        }
                        return value['topics'].some(function (x) {
                            if (_this.topicIncludes.indexOf(x) == -1)
                                return false;
                            return true;
                        });
                    });
                    PP_Item_Create.escaped_topics = this.topicIncludes;
                }
                valids.forEach(function (repo) {
                    new PP_Item_Create(repo).then(function (obj) {
                        itemList.appendChild(obj);
                    });
                });
                itemList.setAttribute('id', 'pp-list');
                div.appendChild(itemList);
                NavigationPanel.addItem("Personal Projects", "main-personal-projects");
                target.parentNode.insertBefore(base, target.nextSibling);
                return [2];
            });
        });
    };
    PersonalProjects.__is_initiated__ = false;
    PersonalProjects.username = "";
    return PersonalProjects;
}());
function normalize(str) {
    return String(str).replaceAll(/\s/g, '').toLowerCase();
}
function ObjectSort(value) {
    var cloned = Object.keys(value).map(function (v) {
        return {
            'key': v,
            'value': value[v]
        };
    });
    var res = {};
    cloned = cloned.sort(function (a, b) { return (b['value'] - a['value']); });
    cloned.forEach(function (i) { return res[i['key']] = i['value']; });
    return res;
}
function safeConcat() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.map(function (t) {
        var str = String(t).trim().replace(/^\//, "");
        return str.replace(/\/$/, "");
    }).join("/");
}
var Config = (function () {
    function Config() {
        this.__url = safeConcat(window.location.origin, "config.json");
    }
    Config.prototype.load = function (callback) {
        if (callback === void 0) { callback = function (x) { return x; }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(this.__url, {
                            method: "GET",
                            mode: "cors",
                            cache: "force-cache",
                            redirect: "follow",
                            referrerPolicy: "no-referrer"
                        }).then(function (res) { return res.json(); }).then(function (res) {
                            Config.__config = res;
                            callback(res);
                        }).catch(function (err) {
                            console.error(err);
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Object.defineProperty(Config, "config", {
        get: function () {
            return Config.__config;
        },
        enumerable: false,
        configurable: true
    });
    Config.__config = {};
    return Config;
}());
var GH_API = (function () {
    function GH_API(url, expiry) {
        if (typeof expiry != 'number' || expiry < 0)
            throw new TypeError("Expiration should be a positive number");
        this.__expiry__ = expiry;
        this.__url__ = url;
        this.__config__ = {
            method: "GET",
            mode: "cors",
            cache: "force-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer"
        };
        if (GH_API.__auth_token__) {
            this.__config__['headers'] = this.__config__['headers'] || {};
            this.__config__['headers']['Authorization'] = "token ".concat(GH_API.__auth_token__);
        }
    }
    Object.defineProperty(GH_API, "__auth_token__", {
        get: function () {
            return Config.config['github']['auth_token'];
        },
        enumerable: false,
        configurable: true
    });
    GH_API.prototype.then = function (callback, ev) {
        if (ev === void 0) { ev = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var key, e_2, return_old_data, nf, _a, res, expiry, rpt, TypeError_1;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        key = this.__url__;
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 16]);
                                        return [4, this.getFromDB(key, false, function (data) {
                                                resolve([data, false]);
                                            })];
                                    case 2:
                                        _b.sent();
                                        return [3, 16];
                                    case 3:
                                        e_2 = _b.sent();
                                        if (!(e_2.message == "expired" || e_2.message == "empty")) {
                                            throw e_2;
                                        }
                                        return_old_data = function () { return __awaiter(_this, void 0, void 0, function () {
                                            var e_3;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 2, , 3]);
                                                        return [4, this.getFromDB(key, true, function (data) {
                                                                if (data)
                                                                    resolve([data, false]);
                                                                else
                                                                    resolve([Object, true]);
                                                            })];
                                                    case 1:
                                                        _a.sent();
                                                        return [3, 3];
                                                    case 2:
                                                        e_3 = _a.sent();
                                                        resolve([Object, true]);
                                                        return [3, 3];
                                                    case 3: return [2];
                                                }
                                            });
                                        }); };
                                        if (!window.navigator.onLine) {
                                            if (e_2.message == "expired")
                                                return [2, return_old_data()];
                                            return [2, resolve([Object, true])];
                                        }
                                        _b.label = 4;
                                    case 4:
                                        _b.trys.push([4, 14, , 15]);
                                        return [4, fetch(this.__url__, this.__config__)];
                                    case 5:
                                        nf = _b.sent();
                                        _a = nf.status;
                                        switch (_a) {
                                            case 0: return [3, 6];
                                            case 200: return [3, 7];
                                            case 400: return [3, 9];
                                            case 401: return [3, 9];
                                            case 403: return [3, 10];
                                        }
                                        return [3, 12];
                                    case 6: return [2, resolve([Object, true])];
                                    case 7: return [4, nf.text()];
                                    case 8:
                                        res = _b.sent();
                                        res = JSON.parse(res);
                                        expiry = new Date().getTime();
                                        expiry += 36e5 * this.__expiry__;
                                        try {
                                            GH_API.saveData(key, res, expiry);
                                            return [2, resolve([res, false])];
                                        }
                                        catch (e) {
                                            reject();
                                            return [2];
                                        }
                                        return [3, 13];
                                    case 9: return [2, return_old_data()];
                                    case 10:
                                        if (String(nf.headers.get('x-ratelimit-remaining')) == '0') {
                                            if (e_2.message == 'expired')
                                                return [2, return_old_data()];
                                            return [2, resolve([Object, true])];
                                        }
                                        return [4, nf.json()];
                                    case 11:
                                        rpt = _b.sent();
                                        if (rpt['block']['reason'] == 'unavailable') {
                                            if (ev) {
                                                return [2, resolve([Object, true])];
                                            }
                                        }
                                        reject();
                                        return [3, 13];
                                    case 12:
                                        console.error("fetch() returns ".concat(nf.status, " status code."));
                                        _b.label = 13;
                                    case 13: return [3, 15];
                                    case 14:
                                        TypeError_1 = _b.sent();
                                        console.info("Ad blocker maybe turned on");
                                        resolve([Object, true]);
                                        return [3, 15];
                                    case 15:
                                        reject("No available resources");
                                        return [3, 16];
                                    case 16: return [2];
                                }
                            });
                        }); }).then(function (result) {
                            callback(result[0], result[1]);
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    GH_API.prototype.getFromDB = function (key, justGet, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var db, isEmpty, e_4, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, GH_API.__getDB__()];
                    case 1:
                        db = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        isEmpty = false;
                        return [4, db.getItem(key).then(function (str) {
                                var data = JSON.parse(str);
                                if (justGet) {
                                    return callback(data["data"]);
                                }
                                try {
                                    if (Number(data["expiry"]) >= new Date().getTime()) {
                                        return callback(data["data"]);
                                    }
                                }
                                catch (e) {
                                    throw new Error("empty");
                                }
                                throw new Error("expired");
                            }).catch(function (err) {
                                throw err;
                            })];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        e_4 = _a.sent();
                        obj = ["expired", "empty"];
                        if (obj.indexOf(e_4.message) != -1) {
                            throw e_4;
                        }
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    GH_API.saveData = function (key, data, expiry) {
        return __awaiter(this, void 0, void 0, function () {
            var db, toSave;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, GH_API.__getDB__()];
                    case 1:
                        db = _a.sent();
                        toSave = {
                            'save_time': new Date().getTime(),
                            'data': data,
                            'expiry': expiry,
                        };
                        try {
                            db.setItem(key, JSON.stringify(toSave));
                        }
                        catch (e) {
                            throw e;
                        }
                        return [2];
                }
            });
        });
    };
    GH_API.__getDB__ = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, localforage.createInstance({
                            name: "gh_fetched",
                            storeName: 'urls',
                            description: 'Stored Data'
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return GH_API;
}());
function gh_fetch(url, expiry) {
    return new GH_API(url, expiry);
}
var getColors = (function () {
    function getColors() {
        this.__url = safeConcat(window.location.origin, "/assets/data/colors.json");
    }
    getColors.prototype.then = function (callback) {
        if (callback === void 0) { callback = function (x) { }; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fetch(this.__url, {
                            method: "GET",
                            mode: "cors",
                            cache: "force-cache",
                            redirect: "follow",
                            referrerPolicy: "no-referrer"
                        }).then(function (res) { return res.json(); }).then(function (res) {
                            getColors.colors = res;
                            callback(res);
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    getColors.color = function (lang) {
        try {
            return String(getColors.colors[lang]);
        }
        catch (e) {
            for (var index in getColors.colors)
                if (String(index).trim().toLowerCase() == lang.trim().toLowerCase())
                    return String(getColors.colors[index]);
        }
        return "#f0f0f0";
    };
    return getColors;
}());
//# sourceMappingURL=main.js.map