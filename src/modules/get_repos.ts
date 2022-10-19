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
        this.catchCallback = (args:any) => {
            console.log(args)
        };
        
        fetch(getRepo.url, {
            "method":"GET"
        }).then((response:any) => response.json())
        .then((response:any) => {
            this.thenCallback(response["data"] as RepoProperties[]);
        }).catch((err:any) => { this.catchCallback(err)});
    }
    
    then(callback:getRepoProperties) {
        this.thenCallback = callback;
        return this;
    }
    
    catch(callback:any) {
        this.catchCallback = callback;
        return this;
    }
}
