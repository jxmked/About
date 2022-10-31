import __nothing__ from "legacy";
import __init__ from "./globals";
import Known_Lang from "./known-languages/Known_Lang";
import Feature_Repo from "./featured-repositories/Featured-Repositories"
import getColors from "modules/get-lang-colors";
import navbar from "NavigationBar/NavigationBar";

/**
 * My wifi went out
 * Override
 */
 /*
import getRepos from "modules/get_repos";
getRepos.url = "./excludes/repositories.json";
/**/

// Check and create Legacies
__nothing__();

/**
 * Just to initialize 
 * 
 * Global Config
 * */
__init__();

/**
 * Click Nav Panel to Close
 * */
new navbar();

/**
 * initialize Known Languages.
 * Add Loading Screen during Initialize
 * */
const known_Lang = new Known_Lang();

/**
 * Fetch Languages Color 
 * Ready...
 * */
new getColors().then(() => {
    console.log("Colors loaded");
    
    // Start Fetching and building DOM object
    known_Lang.start();
    
    known_Lang.then(() => {
        /**
         * To make sure we append Featured Repositories after
         * Known Languages.
         * Wait for completion of Known Languages
         * */
        new Feature_Repo();
    });
    
    /**
     * Add Item to Navigation List
     * */
    const navList:NavigationBarAddItem[] = [
        {
            name:"Introduction",
            href: "#main-cover"
        }, {
            name: "About me",
            href: "#main-about"
        }, {
            name: "Known Languages",
            href: "#main-languages"
        }, {
            name: "Featured Repositories",
            href: "#main-personal-projects"
        }, {
            name: "Connect",
            href: "#main-socials"
        }
    ];
    
    let ival = window.setInterval(() => {
        try {
            navbar.addItem(navList.shift() as NavigationBarAddItem);
        } catch(err) {
            clearInterval(ival);
        }
    }, 140);
    
}).catch((err:any) => {
    console.error("Failed to load");
}).load();

export default () => {};

