/**
 * Get Languages Color Interface
 * 
 * assets/data/color.json
 * */

/**
 * In main.ts
 * 
 * Call this constructor first to make initial load so, we can use 
 * static get color function with sync method
 * */

type colorProperties = {[key:string]:hexCode};

export default class Get_Colors {
    private static url:string = "assets/data/colors.json";
    
    // Save all fetched colors for later use
    private static __loaded_colors:colorProperties = {};
    
    private thenCallback:Function;
    private catchCallback:Function;
    
    // Is successfully fetch colors?
    private static __is_success:boolean = false;
    
    constructor() {
        console.log("Get colors has been initiated");
        
        this.thenCallback = (args:any) => {};
        this.catchCallback = (args:any) => {};
    }
    
    load() {
        console.log("Fetching colors has been started");
        
        const _catch = this.catchCallback.bind(this.catchCallback);
        const _then = this.thenCallback.bind(this.thenCallback);
        
        fetch(Get_Colors.url, {
            method:"get"
        }).then((res:any) => { 
            const status = res.status;
            
            if(status != 200) { // Not ok
                throw new Error(`Failed to fetch colors with status code: ${status}`);
            }
            
            Get_Colors.__is_success = true;
            
            console.log("Colors has been fetched!");
            
            return res.json() as colorProperties;
        }).then((res:colorProperties) => {
            
            console.log("Translating Color keys into lowercase...");
            
            // Translate key to lower case
            const colors:colorProperties = {};
            const keys:string[] = Object.keys(res);
            let index:number = keys.length;
            
            while(index--) {
                let key:string = keys[index];
                colors[key.toLowerCase() as keyof colorProperties] = res[key];
            }
            
            console.log("Translated");
            
            Get_Colors.__loaded_colors = colors;
            
            console.log("Languages color is good to go");
            
            _then();
        }).catch(_catch);
    }
    
    get success():boolean {
        return Get_Colors.__is_success;
    }
    
    static lang(lang:string):hexCode {
        if(! Get_Colors.__is_success) {
            throw new Error("No colors available");
        }
        
        lang = lang.toLowerCase();
        
        if(Get_Colors.__loaded_colors.hasOwnProperty(lang)) {
            return Get_Colors.__loaded_colors[lang as keyof colorProperties];
        }
        
        throw new TypeError(`Cannot find color for ${lang}`);
    }
    
    then(callback:Function):Get_Colors {
        this.thenCallback = callback;
        return this;
    }
    
    catch(callback:Function):Get_Colors {
        this.catchCallback = callback;
        return this;
    }
    
}


