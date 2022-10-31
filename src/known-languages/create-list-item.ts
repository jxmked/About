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
import {fallbackEmpty} from "Helpers";

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
        
        name = fallbackEmpty(name, "{lang_name}");
        const num:string = fallbackEmpty(String(value), "{lang_count}");
        
        li.appendChild(this.bullet(name, num, color));
        li.appendChild(this.itemName(name, num, color));
        li.appendChild(this.itemValue(name, value, color));
        
        this.LIST.appendChild(li);
    }
    
    get html():HTMLElement {
        return this.BASE;
    }
    
    private itemValue(name:string, value:number, color:string):HTMLElement {
        return createElement("span", {
            "data-value": value,
            "data-language":name,
            "data-color":color,
            "text": value.toFixed(2)
        });
    }
    
    private itemName(name:string, value:string, color:hexCode):HTMLElement {
        return createElement("p", {
            "data-value": value,
            "data-language":name,
            "data-color":color,
            "text": name
        });
    }
    
    private bullet(name:string, value:string, color:string):HTMLElement {
        return createElement("span", {
            "data-value": value,
            "data-language":name,
            "data-color":color,
            "style":`background-color: ${color}`
        });
    }
}
