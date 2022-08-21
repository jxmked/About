/**
 * Handling Socials
 * */
/*

class Socials {
    socialList:{[id:string]:any};
    email_link:{[id:string]:any};
    parentNode:HTMLElement;
    
    constructor() {
        /**
         * We are separating email from socials since 
         * we don't have any event that suitable for click event
         * */
       /* 
        this.socialList = Config.config['socials'];
        this.email_link = Config.config['email'];
        this.parentNode = document.getElementById('list-socials')!;
        
    }
    
    
    async start() {
        
    }
    
    async create_email(ic:string, host:string){
        const base:HTMLElement = document.createElement('li');
        // Icon container
        const b1:HTMLElement = document.createElement('span');
        
        // Text container
        const b2:HTMLElement = document.createElement('span');
        
        b1.innerHTML = await this.svg_fetch(ic);
        b2.appendChild(document.createTextNode(host));
        
        base.appendChild(b1);
        base.appendChild(b2);
        
        return base;
    }
    
    
    create_Item() {
        
    }
    
    async svg_fetch(name:string) {
        return await fetch(safeConcat(window.location.origin, "/assets/icons", name))
            .then((r:any) => r.text())
            .then((str:string) => str)
            .catch(console.error.bind(console));
    }
    
}*/