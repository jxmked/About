/**
 * 
 * Handling Configuration
 * */

class Config {
    __url:string;
    private static __config:any = {};
    
    constructor(){
        let pre_path:string = window.GLOBAL_ENV['pre_path'];
        this.__url = safeConcat(window.location.origin, pre_path, "config.json");
    }
    
    async load(callback:Function = (x:any)=>x) {
       await fetch(this.__url, {
            method: "GET",
            mode: "cors",
            cache: "force-cache",
            redirect: "follow",
            referrerPolicy: "no-referrer"
        }).then((res:Response) => res.json()).then((res:any) => {
            Config.__config = res;
            callback(res);
        }).catch((err:any) => {
            console.error(err);
        });
    }
    
    static get config() {
        return Config.__config;
    }
    
}