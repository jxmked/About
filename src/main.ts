import __init__, { envRes, env_mode} from "./globals";
import Known_Lang from "known-languages/Known_Lang";
import getColors from "modules/get-lang-colors";

/**
 * Just to initialize 
 * 
 * Global Config
 * */
__init__();

new getColors().then(() => {
    console.log("Color loaded")
    
    
    
    console.log(getColors.lang("python"))
}).catch((err:any) => {
    console.error("Failed to load")
}).load()



//new Known_Lang()