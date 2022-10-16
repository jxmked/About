/**
 * 
 * Get repositories from Github
 * 
 * return RepoProperties[]
 * */


type getRepoProperties = (arg:RepoProperties[]) => void;

export default class getRepo {
    
    private static url:string = "https://cdn.jsdelivr.net/gh/jxmked/resources@master/repositories.json";
    private thenCallback:getRepoProperties;
    private catchCallback:Function;
    
    constructor(){
        this.thenCallback = (args:any) => {};
        this.catchCallback = (args:any) => {};
        
        
        
        fetch(getRepo.url, {
            "method":"GET"
        })
            .then((res:any) => res.json())
            .then((res:any) => {
                this.thenCallback.bind(this.thenCallback)(res["data"] as RepoProperties[])
            })
            .catch(this.catchCallback.bind(this))
    }
    
    then(callback:getRepoProperties) {
        this.thenCallback = callback;
    }
    
    catch(callback:any) {
        this.catchCallback = callback;
    }
}
