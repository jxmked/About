/**
 * Create List Item 
 * 
 * - div
 *   - ul
 *     - li (Item)
 *       - span.bullet
 *       - p.language-name
 *       - span.percentage
 * */

import createElement from "modules/createElement";
 
export default class CreateListItem {
    private BASE:HTMLElement;
    private LIST:HTMLElement;
    
    constructor() {
        this.BASE = createElement("div");
        this.LIST = createElement("ul");
        
        this.BASE.appendChild(this.LIST);
    }
    
    get html():HTMLElement {
        return this.BASE;
    }
    
    itemValue(name:string, value:number, color:string):HTMLElement {
        return createElement("p", {
            "data-value": value,
            "data-language":name,
            "data-color":color,
            "text": value
        });
    }
    
    itemName(name:string, value:number, color:string):HTMLElement {
        return createElement("p", {
            "data-value": value,
            "data-language":name,
            "data-color":color,
            "text": name
        });
    }
    
    
    bullet(name:string, value:number, color:string):HTMLElement {
        return createElement("span", {
            "data-value": value,
            "data-language":name,
            "data-color":color,
            "style":`background-color: ${color}`
        });
    }
}
