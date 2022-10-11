/**
 * Personal Projects
 * 
 * Target Id: main-personal-projects
 * 
 * Target Topic = portfolio-include
 * TARGET KEYS:
 * - full_name
 * - name
 * - html_url
 * - description
 * - languages_url
 * - topics
 * 
 * 
 * Warning!
 *      May display all public repositories
 * */

class PersonalProjects {
    
    private repositories:any;
    private topicIncludes:string[];
    private hideProjects:string[];
    private maxProjects:number;
    
    private static __is_initiated__:boolean = false;
    private static username:string = "";
    
    constructor() {
        
        const username:string = Config.config['github']['username'];
        const targetTopics:string[] = Config.config['github']['personal_projects']['target_topics'];
        const maxProjects:number = Config.config['github']['personal_projects']['max_display_projects'];
        const hideProjects:string[] = Config.config['github']['personal_projects']['hide_projects'];
        
        this.topicIncludes = targetTopics.map((v:string) => normalize(v));
        this.hideProjects = hideProjects.map((v:string) => normalize(v));
        this.maxProjects = Number(maxProjects);
        this.repositories = [];
        
        PersonalProjects.username = username;
        
        if(PersonalProjects.__is_initiated__)
            return;
        
        PersonalProjects.__is_initiated__ = true;
        
        this.getAllRepositories(() => {
            this.__start__();
        });
    }
    
    async getAllRepositories(callback:Function) {
        /**
         * Get all public repositories until we reach the limit (maxProjects) we have.
         * or until we reach the end of array
         * */
        // Base Url
        let url:string = `https://api.github.com/users/${PersonalProjects.username}/repos?per_page=50`;
        
        const getRepositories:Function = async (page:number)=> {
            let repoUrl:string = url;
            if(page > 1) 
                repoUrl = `${url}&page=${page}`;
            
            gh_fetch(repoUrl, 1).then((repos:any) => {
                if(this.repositories.length >= this.maxProjects || repos.length == 0) {
                    callback();
                    return;
                }
                
                this.repositories = this.repositories.concat(repos);
                
                getRepositories(page + 1);
            })
        };
        
        getRepositories(1);
    }
    
    async __start__() {
        /**
         * Get All repositories with
         * valid key in topics
         * */
        const base:HTMLElement = document.createElement('div');
        const div:HTMLElement = document.createElement('div');
        const itemList:HTMLElement = document.createElement('div');
        
        base.setAttribute('id', 'main-personal-projects');
       // base.setAttribute('data-content', 'system generated');
        
        /**
         * Container label
         * */
        
        const label:HTMLElement = document.createElement('label');
        const tooltip:HTMLElement = document.createElement('span');
        label.appendChild(document.createTextNode('Some Personal Projects:'));
        
        tooltip.appendChild(document.createTextNode('from Github'));
        tooltip.classList.add('tooltip');
        label.appendChild(tooltip);
        
        div.appendChild(label); // Base Container
        base.appendChild(div);
        
        // DOM Element
        let target:HTMLElement = document.getElementById('main-languages')!;
        
        if(! target) {
            target = document.getElementById("main-about")! ;
        }
        
        const result:any = this.repositories.splice(0, this.maxProjects);
        /**
         * Filter out repositories without '{topicIncludes}'
         * in thier topics
         * */
         
        let valids:any = result;
        
        if(this.topicIncludes.length > 0) {
            valids = result.filter((value:any) => {
                if(this.hideProjects.indexOf(normalize(value['name'])) != -1) {
                    return false;
                }
            
                return value['topics'].some((x:string) => {
                    if(this.topicIncludes.indexOf(x) == -1)
                        return false;
                    return true;
                });
            });
            
            PP_Item_Create.escaped_topics = this.topicIncludes;
        }
        
            
        valids.forEach((repo:any) => {
            new PP_Item_Create(repo).then((obj:any) => {
                //obj.setAttribute('data-state', 'hide');
                itemList.appendChild(obj);
            });
        })
        
        // While Fetching... We can Insert it inti DOM
        // since we have its variable
        
        itemList.setAttribute('id', 'pp-list');
        div.appendChild(itemList);
         
        NavigationPanel.addItem("Personal Projects", "main-personal-projects");
        target.parentNode!.insertBefore(base, target.nextSibling);
    }
}
