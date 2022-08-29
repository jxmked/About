/**
 * 
 * Fetch Data From Github API
 * 
 * https://api.github.com/....
 * 
 * See docs: https://docs.github.com/en/get-started
 * 
 * */
    
class GH_API {
    private __url__: string;
    private __expiry__: number;
    private __config__: {[id: string]:any};
    
    constructor(url:string, expiry:number) {
        if(typeof expiry != 'number' || expiry < 0) 
            throw new TypeError("Expiration should be a positive number");
        
        this.__expiry__ = expiry; // Hour
        this.__url__ = url;
        
        this.__config__ = {
            'method': "GET",
            'mode': "cors",
            'cache': "force-cache",
            'referrerPolicy': "no-referrer"
        };
        
        
        //return 
        if(GH_API.__auth_token__ != "") {
            /**
             * If you are running in development mode.
             * 
             * Github token is required to get 5k requests
            * */
            this.__config__['headers'] = this.__config__['headers'] || {};
            this.__config__['headers']['Authorization'] = `token ${GH_API.__auth_token__}`;
        }
    }
    
    private static get __auth_token__():string {
        return Config.config['github']['auth_token'];
    }
    
    async then(callback: Function, ev:boolean=false): Promise<void> {
        return await new Promise(async (resolve: Function, reject: Function) => {
            const key: string = this.__url__;
            
            try {
                /**
                 * Check database first if we have available data
                 * throw if expired or no data exists
                 * */
                await this.getFromDB(key, false, (data:any) => {
                    resolve([data, false]);
                });
            } catch(e:any) {
                if(!(e.message == "expired" || e.message == "empty")) {
                    throw e;
                }
                
                const return_old_data:Function = async () => {
                    try {
                        await this.getFromDB(key, true, (data:any) => {
                            
                            if(data)
                                resolve([data, false]);
                            else
                                resolve([Object, true]);
                        });
                        
                    } catch(e:any) {
                        resolve([Object, true]);
                    }
                };
                
                /**
                 * Check if we don't have Internet Connection
                 * then return local data if we have
                 * */
                
                if(!window.navigator.onLine){
                    
                    if(e.message == "expired") 
                        return return_old_data();
                    
                    /**
                     * Since I can't find the where getFromDB() Error goes
                     * */
                    return resolve([Object, true]);
                }
                
                try {
                    const nf:Response = await fetch(this.__url__, this.__config__);
                    
                    switch(nf.status) {
                        case 0: // No response or Slow Internet Connection
                            return resolve([Object, true]);
                            break;
                        
                        case 200:
                            // fetch.json() // I don't wan't this. Hahaha
                            let res:string = await nf.text();
                            
                            res = JSON.parse(res);
                            
                            let expiry:number = new Date().getTime();
                            
                            // 3600000 == hours
                            expiry += 36e5 * this.__expiry__;
                            
                            try {
                                GH_API.saveData(key, res, expiry);
                                return resolve([res, false]);
                            } catch(e:any) {
                                reject();
                                return;
                            }
                            break;
                            
                        case 400: // Bad Response
                        case 401: // Unauthorize
                            return return_old_data();
                            break;
                        case 403: // Unavailable, Restriction
                            /** 
                             * Check if we consumed the rate limit.
                             * Check if our local data is expired
                             * 
                             * Return expired data
                             * */
                            if(String(nf.headers.get('x-ratelimit-remaining')) == '0') {
                                if(e.message == 'expired')
                                    return return_old_data();
                                return resolve([Object, true]);
                            }
                            
                            /**
                             * Maybe, the repository is not available to fetch information
                             * */
                            const rpt:any = await nf.json();
                            
                            if(rpt['block']['reason'] == 'unavailable') {
                                if(ev) {
                                    return resolve([Object, true])
                                }
                            }
                            
                            reject();
                            break;
                        
                        default:
                            console.error(`fetch() returns ${nf.status} status code.`);
                    }
                } catch (TypeError) {
                    /**
                     * Using Ad Blocker,
                     * Some repository cannot fetch.
                     * Maybe, because ad blocker is based on url.
                     * 
                     * Example: this url cannot fetch and throws an error.
                     *  ~~ Try fetching this in using fetch() function with and without ad blocker~~
                     * 
                     * https://api.github.com/repos/google/google-analytics-utilities
                     * */
                     console.info("Ad blocker maybe turned on");
                    resolve([Object, true]);
                }
                reject("No available resources");
            }
        }).then((result:any) => {
            callback(result[0], result[1]);
        });
    }
    
    /**
     * Private Static Helpers
     * */
    private async getFromDB(key:string, justGet:boolean, callback:Function) {
        const db:any = await GH_API.__getDB__();
        
        try {
            await db.getItem(key).then((str:any) => {
                const data:{[id:string]:any} = JSON.parse(str);
                if(justGet){
                    return callback(data["data"]);
                }
                try {
                    if(Number(data["expiry"]) >= new Date().getTime()) {
                        // Not Expired
                        return callback(data["data"]);
                    }
                } catch(e:any){
                    throw new Error("empty");
                }
                throw new Error("expired");
            }).catch((err:any) => { 
                throw err;
            });
            
        } catch(e:any){
            const obj:string[] = ["expired", "empty"];
            
            if (obj.indexOf(e.message) != -1) {
                throw e;
            }
        }
    }
    
    private static async saveData(key:string, data:any, expiry:number) {
        const db:any = await GH_API.__getDB__();
        
        const toSave:any = {
            'save_time': new Date().getTime(),
            'data': data,
            'expiry': expiry,
        };
        try {
            db.setItem(key, JSON.stringify(toSave));
        } catch(e:any) {
            throw e;
        }
    }
    
    private static async __getDB__() {
        // @ts-expect-error
        return await localforage.createInstance({
            'name'        : "gh_fetched",
            'storeName'   : 'urls',
            'description' : 'Stored Data'
        });
    }
}

/** 
 * :)
 * */
 
function gh_fetch(url:string, expiry:number):GH_API {
    return new GH_API(url, expiry);
}