/**
 * DOM creator for Personal Projects
 * */

class PP_Item_Create {
    obj:any;
    parent:HTMLElement; // Main item
    callback:Function;
    static topicExceptions:string[] = [];
    
    constructor(obj:any) {
        this.obj = obj;
        this.parent = document.createElement('div');
        this.parent.classList.add('pp-items');
        this.parent.classList.add('observable');
        
      //  this.parent.setAttribute('data-state', 'hide');
        
        this.name();
        this.description();
        this.topics();
        this.graphs();
        this.callback = (x:any) => {};
    }
    
    static set escaped_topics(topics:any) {
        PP_Item_Create.topicExceptions = topics;
    }
    
    name() {
        const a:HTMLElement = document.createElement('a');
        const label:HTMLElement = document.createElement('label');
        
        a.setAttribute('href', this.obj['html_url']);
        a.setAttribute('rel', 'noopener noreferrer'); // No referrer or any info
        a.setAttribute('target', '_blank'); // Open in new Tab
        
        a.appendChild(document.createTextNode(this.obj['full_name']));
        
        label.appendChild(a);
        
        this.parent.appendChild(label);
    }
    
    description() {
        let desc:string = '"No description provided."';
        
        const p:HTMLElement = document.createElement('p');
        const div:HTMLElement = document.createElement('div');
        
        try {
            /**
             * Check if description is existing...
             * */
            let res:string = String(this.obj['description']).trim();
            
            desc = (res.length == 0) ? desc : res;
            
        } catch(e){
            // No description provided
        } finally {
            
            p.appendChild(document.createTextNode(desc));
            div.appendChild(p);
            
            this.parent.appendChild(div);
        }
    }
    
    topics() {
        const ul:HTMLElement = document.createElement('ul');
        const div:HTMLElement = document.createElement('div');
        
        this.obj['topics'].forEach((topic:string) => {
            /**
             * Remove Target Topics from display classList
             * */
            if(PP_Item_Create.topicExceptions.length > 0)
                if(PP_Item_Create.topicExceptions.indexOf(normalize(topic)) != -1)
                    return;
            
            const li:HTMLElement = document.createElement('li');
            li.appendChild(document.createTextNode(topic.trim()));
            
            ul.appendChild(li)
        })
        
        div.appendChild(ul);
        
        this.parent.appendChild(div);
    }
    
    async graphs() {
        /** Bar Graph **/
        const div:HTMLElement = document.createElement('div');
        const ul:HTMLElement = document.createElement('ul');
        
       // let count:number = 0;
        
        let result:{[id:string]:number} = {};
        let sum:number = 0;
        
        await gh_fetch(this.obj['languages_url'], 1).then((res:any) => {
            result = ObjectSort(res);
            
            if(Object.entries(res).length > 0)
                sum = Object.values(result).reduce((x:any, y:any) => x + y);
            
            
            Object.keys(result).forEach((key) => {
                const color:string = getColors.color(key);
                let percent:number = (result[key] / sum) * 100;
                
                if(sum == 0)
                     percent = 0;
                 
                /** Bar Graph **/
                const span:HTMLElement = this.create_bar_graph(percent, color);
                div.appendChild(span);
                /*** * * * * ***/
                
                /** Ranking **/
                const li:HTMLElement = this.create_ranking(key, percent, color);
                ul.appendChild(li);
            });
            
            // Main div
            const base:HTMLElement = document.createElement('div');
            
            base.appendChild(div);
            base.appendChild(ul)
            this.parent.appendChild(base);
            
            this.callback(this.parent);
        }).catch((err:any) => {
            console.error(err);
        });
    }
    
    create_bar_graph(percent:number, color:string) {
        const span:HTMLElement = document.createElement('span');
        span.style.backgroundColor = color;
        span.style.width = String(percent) + "%";
        
        return span;
    }
    
    create_ranking(key:string, percent:number, color:string) {
        const li:HTMLElement = document.createElement('li');
        let a:HTMLElement, b:HTMLElement, c:HTMLElement;
        
        // Bullet
        a = document.createElement('span'); 
        a.style.backgroundColor = color;
        
        // Language
        b = document.createElement('p');
        
        b.classList.add('language');
        
        b.appendChild(document.createTextNode(key));
        
        // Percent
        c = document.createElement('p');
        
        let x:string = parseFloat(String(percent)).toFixed(2);
        c.appendChild(document.createTextNode(x));
        
        li.appendChild(a);
        li.appendChild(b);
        li.appendChild(c);
        
        li.classList.add('item');
        
        return li;
    }
    
    then(callback:Function) {
        this.callback = callback;
    }
}
