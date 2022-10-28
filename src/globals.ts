/**
 * Global Modules and Configs
 * 
 * 
 * */

// env-res - DOM version
window.__ENVIRONMENT__ = window.__ENVIRONMENT__ || new Map<string, any>();
const envRes = window.__ENVIRONMENT__;

export { envRes };

/**
 * localforage
 * */
export const localforage:LocalForage = window.localforage || {};


/**
 * Environment mode
 * prod|dev
 * */
window.XIO.ENVIRONMENT_MODE = window.XIO.ENVIRONMENT_MODE || "dev";
export const env_mode:"prod"|"dev" = window.XIO.ENVIRONMENT_MODE;

/**
 * Disable any console logging function when its production mode
 * 
 * Only receiving native errors
 * */
 
(() => {
    if(window.XIO.ENVIRONMENT_MODE == "dev") {
        console.log("Development Mode");
        return;
    }
    
    /**
     * Any last words? 
     * */
    console.log("Console has been disabled");
    
    for (let i in console)
        console[i as keyof Console] = () => {};
})();


/**
 * Setup and config 
 * */

envRes.set("configs", {
    "personal": {
        "name":{
            "first":"Jovanni",
            "last":"De Guia"
        },
        "github_username":"jxmked",
        "email":"jovandeguia@gmail.com"
    },
    "socials": {
        "github":"https://github.com/jxmked",
        "facebook":"https://facebook.com/deguia25",
        "instagram":"https://www.instagram.com/jxmked/",
        "twitter":"https://twitter.com/jxmked"
    } 
});

envRes.set("username", "jxmked");

envRes.set("known-lang-skip", []);
envRes.set("featured-repositories", ["portfolio-include"]);


if(! Object.prototype.hasOwnProperty.call(Object, "take")) {
    // Using `get` as method name Throws an error 
    Object.defineProperty(Object.prototype, "take", {
        configurable:false,
        enumerable: false,
        writable:false,
        value: function(key:string|number, fallback:any) {
            const props = this!;
            return (props.hasOwnProperty(key)) ? props[key] : fallback;
        }
    });
    
    console.log("Object.prototype.get has been defined");
}

// Initialize

export default (() => {
    return ()=> {}
})();
