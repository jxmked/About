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
 
(():void => {
    if(env_mode == "dev")
        console.log("Development Mode");
        return;
    
    /**
     * Any last words? 
     * */
    // @ts-ignore
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
})