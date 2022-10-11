/**
 * Get Specific Color For Languages
 * */


class getColors {
    private __url:string;
    private static colors:{[id:string]:string};
    
    constructor(){
        let pre_path:string = window.GLOBAL_ENV['pre_path'];
        this.__url = safeConcat(window.location.origin, pre_path, "/assets/data/colors.json");
    }
    
    async then(callback:Function = (x:any) => {}) {
        return await fetch(this.__url, {
            'method': "GET",
            'mode': "cors",
            'cache': "force-cache",
            'redirect': "follow",
            'referrerPolicy': "no-referrer"
        }).then((res:Response) => res.json()).then((res:any) => {
            getColors.colors = res;
            callback(res);
        });
    }
    
    static color(lang:string):string {
        try {
            return String(getColors.colors[lang]);
        } catch(e){
            // Try to Minimize the failure
            for(let index in getColors.colors)
                if(String(index).trim().toLowerCase() == lang.trim().toLowerCase())
                    return String(getColors.colors[index]);
        }
        
        return "#f0f0f0";
    }
}
