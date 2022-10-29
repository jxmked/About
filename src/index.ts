import __nothing__ from "legacy";
import __init__ from "./globals";
import Known_Lang from "./known-languages/Known_Lang";
import Feature_Repo from "./featured-repositories/Featured-Repositories"
import getColors from "modules/get-lang-colors";
import getRepos from "modules/get_repos";
//import {for_of} from "supports";


/**
 * My wifi went out
 * Override
 */
getRepos.url = "./excludes/repositories.json";

__nothing__();
/**
 * Just to initialize 
 * 
 * Global Config
 * */
__init__();

new getColors().then(() => {
    console.log("Color loaded")
    
    const known_Lang = new Known_Lang();
    
    known_Lang.then(() => {
        new Feature_Repo();
    });
    
}).catch((err:any) => {
    console.error("Failed to load")
}).load();

