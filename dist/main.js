define("globals", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.localforage = exports.envRes = void 0;
    window.__ENVIRONMENT__ = window.__ENVIRONMENT__ || new Map();
    exports.envRes = window.__ENVIRONMENT__;
    exports.localforage = window.localforage || {};
});
define("main", ["require", "exports", "globals"], function (require, exports, globals_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    globals_1.envRes.set("fuck", "up");
    console.log(globals_1.envRes.get("fuck"));
    globals_1.localforage.setItem("jdj", "jdjjd");
    alert("fuck");
});
//# sourceMappingURL=main.js.map