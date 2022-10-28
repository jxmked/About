/**
 * Featured Repositories
 * Desc: Display Featured Repositories. All Repositories with `portfolio-include` only
 * 
 * HTML structure
 * 
 * 
 * - div#main-personal-projects
 *   - div
 *     - label
 *     
 *     - div#pp-list
 *       - div[]
 *         - label
 *           - a.listen-on-click
 *         - div (Description)
 *           - p
 *         - div (Tags)
 *           - ul
 *             - li[]
 *         - div (Used Languages)
 *           - div (Language Bar Graph)
 *             - span[]
 *           - ul (Language Names)
 *             - li[].item
 *               - span (Bullet)
 *               - p.language (Language Name)
 *               - p (percentages)
 * 
 * */

import {envRes} from "globals";
import Label from "modules/label";
import createElement from "modules/createElement";
import getRepos from "modules/get_repos";
import Item from "Item";


class FeaturedRepositories {
    private static BASE:HTMLElement = createElement("div", {"id": "main-personal-projects"});
    private static PARENT:HTMLElement = createElement("div");
    private item_container:HTMLElement;
    
    constructor() {
        const self = FeaturedRepositories;
        this.item_container = createElement("div", {
            id: "pp-list"
        });
        
        // Add Label
        const label = new Label({title:"Featured Repositories"});
        self.PARENT.appendChild(label.html);
        self.PARENT.appendChild(this.item_container);
        self.BASE.appendChild(self.PARENT);
        
        // Append To DOM
        let target:HTMLElement = document.getElementById('main-languages')!;
        
        if(target) {
            target.parentNode!.insertBefore(self.BASE, target.nextSibling);
        }
        
        new getRepos().then((repos) => {
            repos.forEach((repository:RepoProperties) => {
                const item = new Item(repository);
                
                this.item_container.appendChild(item.html);
            })
           
        });
        
    }
    
}


export default FeaturedRepositories;
