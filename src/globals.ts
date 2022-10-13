/**
 * Global Modules and Configs
 * 
 * 
 * */



// env-res - DOM version
window.__ENVIRONMENT__ = window.__ENVIRONMENT__ || new Map<any, any>();
const envRes = window.__ENVIRONMENT__;

export { envRes };

/**
 * localforage
 * */
export const localforage:LocalForage = window.localforage || {};



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