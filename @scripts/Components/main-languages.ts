/**
 * For Mostly Used Languages
 * 
 * Create mostly used Languages
 * 
 * */

class MostLanguages {
    private repoLang:{[id:string]:number};
    private static maxLanguages:number = 0;
    private static exceptLangs:string[] = [];
    private static __is_initiated__:boolean = false;
    private static username:string;
    private static currentRepoCount:number = 0;
    private static countedRepos:number = 0;
    private static countLangs:{[id:string]:number} = {};
    
    private static BASE:HTMLElement = document.createElement('div'); // Base Container
    private static PARENT:HTMLElement = document.createElement('div'); // Child Container
    private static TEXT_LOADING_CONTAINER:HTMLElement = document.createElement('span'); // For loading State
    
    constructor() {
        
        this.repoLang = {};
        
        MostLanguages.username = Config.config['github']['username'];
        const el:string[] = Config.config['github']['mostly_used_languages']['exception'];
        const ml:number = Config.config['github']['mostly_used_languages']['max_display_language'];
        
        /**
         * Remove White Spaces and translate to lower toLowerCase
         * */
        MostLanguages.maxLanguages = ml;
        MostLanguages.exceptLangs = el.map((x) => normalize(x));
        
        /**
         * Run Once Only
         * */
        if(MostLanguages.__is_initiated__)
            return;
        
        MostLanguages.__is_initiated__ = true;
        
        MostLanguages.BASE.setAttribute('id', "main-languages");
        MostLanguages.BASE.appendChild(MostLanguages.PARENT);
        
        /**
         * We're having a loading screen */
         
        const target:HTMLElement = document.getElementById('main-about')!;
         
      //   MostLanguages.BASE.setAttribute('data-state', 'hide');
        MostLanguages.BASE.classList.add('observable');
        target.parentNode!.insertBefore(MostLanguages.BASE, target.nextSibling);
        NavigationPanel.addItem("Known Languages", "main-languages");
        
        this.create_loading_container();
       
        this.get_repositories(() => {
            this.beginCounting();
            console.log(MostLanguages.countedRepos)
        })
        
    }
    
    private create_loading_container() {
        this.setLabel();
        
        /**
         * Set Loading State
         * */
        MostLanguages.BASE.classList.add('loading');
        
        const container:HTMLElement = document.createElement('div');
        container.classList.add('loading-state');
        /**
         * Wave Loading Animation
         * */
        
        const waveContainer:HTMLElement = document.createElement('div');
        const waveMotion:HTMLElement = document.createElement('div');
        waveContainer.appendChild(waveMotion);
        container.appendChild(waveContainer);
        
        /**
         * Text Container 
         * */
        
        container.appendChild(MostLanguages.TEXT_LOADING_CONTAINER);
        MostLanguages.TEXT_LOADING_CONTAINER.innerText = "Loading...";
        
        MostLanguages.PARENT.appendChild(container)
        
    }
    
    private static UpdateText(text:string, hasCount:boolean=false) {
        let str:string = text;
        if(hasCount) {
            str = `${text} (${MostLanguages.countedRepos} out of ${MostLanguages.currentRepoCount})`;
        }
        MostLanguages.TEXT_LOADING_CONTAINER.innerText = str;
    }
    
    private beginCounting() {
        const sorted:{[id:string]:number} = ObjectSort(MostLanguages.countLangs);
        
        // Display {count} languages
        Object.keys(sorted).splice(0, MostLanguages.maxLanguages).forEach((key) => {
            this.repoLang[key] = sorted[key];
        });
        
        this.createObject();
    }
    
    private get_repositories(callback:Function) {
        /**
         * Get all available repositories as much it can
         * 
         * After fetching {per_page} repositories. It imediately
         * getting all languages in-used per repositories before proceeding
         * to fetch the next page.
         * */
        
        // Base Url
        let url:string = `https://api.github.com/users/${MostLanguages.username}/repos?per_page=50`;
        
        const getLangs:Function = async (repo:any, resolve:Function, reject:Function) => {
                
            gh_fetch(repo['languages_url'], 1).then((langs:any, isError:any) => {
                for(const [key, value] of Object.entries(langs)) {
                    if(MostLanguages.exceptLangs.indexOf(normalize(key)) == -1) {
                        if(! MostLanguages.countLangs[key])
                            MostLanguages.countLangs[key] = 0;
                        // @ts-expect-error
                        MostLanguages.countLangs[key] += value;
                    } 
                }
                MostLanguages.UpdateText(repo['name'], true);
                
                if(!isError) {
                    MostLanguages.countedRepos++;
                } else {
                    console.info(`Error: ${repo['name']}`);
                }
                
                resolve();
            }, true).catch((err:any) => reject(err));
        };
        
        const start:Function = (page:number, callback:Function) => {
            let count:number = 0;
            let repoUrl:string = url;
            
            if(page > 1) 
                repoUrl = `${url}&page=${page}`;
            
            gh_fetch(repoUrl, 1).then((repos:any) => {
                MostLanguages.currentRepoCount += repos.length;
                if(repos.length == 0) {
                    callback();
                    return;
                }
                try {
                    repos.forEach((repo:any) => {
                        getLangs(repo, () => {
                            count++;
                            
                            if(repos.length == count) {
                                start(page + 1, callback);
                            }
                        }, callback);
                    });
                } catch(TypeError) {
                    callback();
                }
            });
        };
        
        let isCalled:boolean = false;
        start(1, () => {
            if(!isCalled) {
                callback();
                isCalled = true;
            }
        });
    }
    
    /**
     * DOM creators
     * */
    
    private createObjectAttribute(color:string, computed:string, name:string) {
        const bullet:HTMLElement = document.createElement('span');
        const langName:HTMLElement = document.createElement('p');
        const percentage:HTMLElement = document.createElement('span');
        const parent:HTMLElement = document.createElement('li');
        
        // Apply Color to Bullet
        bullet.style.backgroundColor = color;
        bullet.setAttribute('data-value', color);
        parent.appendChild(bullet);
        
        // Insert Name
        langName.appendChild(document.createTextNode(name));
        parent.appendChild(langName);
        
        // Insert Percentage
        let text:string = parseFloat(computed).toFixed(2);
        percentage.appendChild(document.createTextNode(`${text}%`));
        percentage.setAttribute('data-value', computed);
        parent.appendChild(percentage);
        
        return parent;
    }
    
    setLabel(ret:boolean = false):HTMLElement|void {
        /**
         * Create Label
         * 
         * Insert Textnode and Insert element with specific text
         * */
        const label:HTMLElement = document.createElement('label');
        const tooltip:HTMLElement = document.createElement('span');
        label.appendChild(document.createTextNode('Known Languages:'));
        
        tooltip.appendChild(document.createTextNode('from Github'));
        tooltip.classList.add('tooltip');
        label.appendChild(tooltip);
        
        if(ret) return label;
        /**
         * Insert to main parent then to document.body
         * */
        
        MostLanguages.PARENT.appendChild(label);
    }
    
    private createObject():void {
        if(Object.values(this.repoLang).length < 1) {
            MostLanguages.UpdateText("No Entries Found");
            return;
        }
        
        const parent:HTMLElement = document.createElement("div");
        const sum:number = Object.values(this.repoLang).reduce((x, y) => x + y);
        const sorted:{[id:string]:number} = ObjectSort(this.repoLang);
        
        const barElement:HTMLElement = document.createElement('div');
        const ulElement:HTMLElement = document.createElement('ul');
        
        /** Faster **/
        Object.entries(sorted).forEach((_) => {
            let k:string = _[0]; // Language Name
            let v:number = _[1]; // Language Count
            
            let computed:string = String((v / sum) * 100);
            let color:string = getColors.color(k);
            
            // Bar graph
            const bar:HTMLElement = document.createElement('span');
            
            bar.style.backgroundColor = color;
            bar.style.width = computed + "%";
            bar.setAttribute('data-value', computed);
            barElement.appendChild(bar);
            
            // List Item
            ulElement.appendChild(this.createObjectAttribute(color, computed, k));
        })
        
        /**
         * Create Main Bar Graph 
         * */
        const barBase:HTMLElement = document.createElement('div');
        barBase.appendChild(barElement);
        
        /**
         * Create Main Name Laguages
         * */
        const mainLang:HTMLElement = document.createElement('div');
        mainLang.appendChild(ulElement);
        
        
        parent.appendChild(this.setLabel(true)!);
        parent.appendChild(barBase);
        parent.appendChild(mainLang);
        
        /** 
         * Loaded event
         * 
         * Replacing Parent Element (Base > Parent)
         * */
        MostLanguages.UpdateText(`${MostLanguages.countedRepos} repositories loaded.`);
        
        window.setTimeout(() => {
            MostLanguages.PARENT.remove();
            MostLanguages.BASE.classList.remove('loading');
            
            MostLanguages.BASE.appendChild(parent);
        }, 1000)

    }
}
