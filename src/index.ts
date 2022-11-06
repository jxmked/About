import __init__, { NavigationListItem } from "./globals";
import Known_Lang from "./known-languages/Known_Lang";
import Feature_Repo from "./featured-repositories/Featured-Repositories"
import getColors from "modules/get-lang-colors";
import navbar from "NavigationBar/NavigationBar";

/**
 * Just to initialize 
 * 
 * Global Config
 * */
__init__();

/**
 * Click Event In Nav Panel
 * */
new navbar();

/**
 * initialize Known Languages.
 * Add Loading display during Initialize
 * */
const known_Lang = new Known_Lang();

/**
 * Fetch Languages Color 
 * Ready...
 * */
new getColors().then(() => {
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
    NavigationListItem.forEach((navItem) => {
        navbar.addItem(navItem);
    });
    
}).catch((err:any) => {
    console.error("Failed to load");
}).load();

export default () => {};
