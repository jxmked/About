/**
 * Get Languages Color Interface
 * 
 * assets/data/color.json
 * */

/**
 * In main.ts
 * 
 * Call this constructor first to make initial load so, we can use 
 * get color function with sync method
 * */

type colorProperties = {[key:string]:string};

export default class Get_Colors {
    private static url:string = "assets/data/color.json";
    private static __loaded_colors:colorProperties;
    private thenCallback:Function;
    private catchCallback:Function;
    private static __is_success:boolean = false;
    
    constructor() {
        console.log("Getting Languages Colors...");
        
        this.thenCallback = (args:any) => {};
        this.catchCallback = (args:any) => {};
        
        const _catch = this.catchCallback.bind(this);
        const _then = this.thenCallback.bind(this);
        
        fetch(Get_Colors.url, {
            method:"get"
        }).then((res:any) => { 
            const status = res.status;
            
            if(status != 200) { // Not ok
                console.error(`Failed to fetch colors with status code: ${status}`);
                throw new Error("Failed to colors");
            }
            Get_Colors.__is_success = true;
            return res.json() as colorProperties;
            
        }).then((res:colorProperties) => {
            // Translate key to lower case
            
            const colors:colorProperties = {};
            const keys:string[] = Object.keys(res);
            let index:number = keys.length;
            
            while(index--) {
                let key:string = keys[index];
                colors[key.toLowerCase() as keyof colorProperties] = res[key];
            }
            
            Get_Colors.__loaded_colors = colors;
            
            _then();
        }).catch(_catch);
    }
    
    get success():boolean {
        return Get_Colors.__is_success;
    }
    
    getColor(lang:string):string {
        if(! this.success) {
            throw new Error("No colors available");
        }
        
        lang = lang.toLowerCase();
        
        if(Get_Colors.__loaded_colors.hasOwnProperty(lang)) {
            return Get_Colors.__loaded_colors[lang as keyof colorProperties];
        }
        
        throw new TypeError(`Cannot find color for ${lang}`);
    }
    
    then(callback:Function):void {
        this.thenCallback = callback;
    }
    
    catch(callback:Function):void {
        this.catchCallback = callback;
    }
    
}