/**
 * label
 * 
 * 
 * 
 * HTML Structure
 * - label 
 *   - (string)
 *   - span.tooltip
 *     - (string)
 * 
 * */
import createElement from "modules/createElement";
import {isEmpty} from "Helpers";

interface LabelProperties {
    title:string,
    tooltip?:string
}

class Label {
    
    private title:string;
    private tooltip?:string;
    
    constructor(attributes:LabelProperties) {
        const properties:LabelProperties = Object.assign({
            title:"",
            tooltip:void 0
        }, attributes);
        
        this.title = properties.title;
        this.tooltip = properties.tooltip;
    }
    
    private __normalize(str?:string):string|null {
        if(isEmpty(str)) return "";
        
        str = str!.normalize("NFD");
        str = str.trim();
        
        return str;
    }
    
    private __get_tooltip():HTMLElement {
        return createElement("span", {
            "class":"tooltip",
            "text":this.__normalize(this.tooltip!)!
        });
    }
    
    /**
     * Create HTML element
     * 
     * */
    get html():HTMLElement {
        const label:HTMLElement = createElement("label", {
            "text":this.__normalize(this.title)!
        });
        
        if(! isEmpty(this.tooltip)) {
            label.appendChild(this.__get_tooltip());
        }
        
        return label;
    }
    
}

export default Label;
