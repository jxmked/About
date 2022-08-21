
function normalize(str:string):string {
    return String(str).replaceAll(/\s/g, '').toLowerCase();
}

function ObjectSort(value:{[id:string]:number}):{[id:string]:number} {
    let cloned:any[] = Object.keys(value).map((v:string) => {
        return {
            'key' : v,
            'value' : value[v]
        };
    });
    const res:{[id:string]:number} = {};
    
    cloned = cloned.sort((a:any, b:any) => (b['value'] - a['value']));
    cloned.forEach((i:any) => res[i['key']] = i['value']);
    
    return res; 
}


function safeConcat(...args:any):string {
    return args.filter((x:string) => {
        return String(x.trim()).length > 0
    }).map((t:string) => {
        let str:string = String(t).trim().replace(/^\//, "");
        return str.replace(/\/$/, "");
    }).join("/");
}