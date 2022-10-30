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
import getColors from "modules/get-lang-colors";

interface CreateItemProperties {
    name:string;
    value:number;
}

export default class CreateListItem {
    private BASE:HTMLElement;
    private LIST:HTMLElement;
    
    constructor() {
        this.BASE = createElement("div");
        this.LIST = createElement("ul");
        
        this.BASE.appendChild(this.LIST);
    }
    
    item({name, value}:CreateItemProperties):void {
        const color:hexCode = getColors.lang(name);
        const li:HTMLElement = createElement("li", {
            "data-value": value,
            "data-language":name,
            "data-color":color
        });
        
        li.appendChild(this.bullet(name, value, color));
        li.appendChild(this.itemName(name, value, color));
        li.appendChild(this.itemValue(name, value, color));
        
        this.LIST.appendChild(li);
    }
    
    get html():HTMLElement {
        return this.BASE;
    }
    
    itemValue(name:string, value:number, color:string):HTMLElement {
        return createElement("span", {
            "data-value": value,
            "data-language":name,
            "data-color":color,
            "text": value.toFixed(2)
        });
    }
    
    itemName(name:string, value:number, color:hexCode):HTMLElement {
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
