/**
 * Create Bar Graph for Known-Languages
 * 
 * - div
 *   - div
 *     - span
 * 
 * */

import getColors from "modules/get-lang-colors";
import createElement from "modules/createElement";


interface CreateBarGraphProperties {
    name:string;
    value:number;
}

export default class CreateBarGraph {
    
    private BASE:HTMLElement;
    private PARENT:HTMLElement;
    
    constructor() {
        this.BASE = createElement("div");
        this.PARENT = createElement("div");
        
        this.BASE.appendChild(this.PARENT);
    }
    
    
    
    set item({name, value}:CreateBarGraphProperties) {
        const color:hexCode = getColors.lang(name);
        
        const bar:HTMLElement = createElement("span", {
            "data-value": value,
            "data-language": name,
            "style": `background-color:${color};width:${value}%;`
        });
        
        this.PARENT.appendChild(bar);
    }
    
    get html():HTMLElement {
        return this.BASE;
    }
}


