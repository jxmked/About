/**
 * Create element
 * 
 * 
 * */

import {env_mode} from "globals";

type CreateElementName = string;
type CreateElementAttributes = {[id:string]:any}

class CreateElement {
    private element:HTMLElement;
    private attr?:CreateElementAttributes;
    
    constructor(name:CreateElementName, attr?:CreateElementAttributes ) {
        this.attr = attr;
        
        this.element = document.createElement(name.trim());
        this.checkout_attributes();
    }
    
    private checkout_attributes():void {
        if(this.attr == void 0)
            return;
        
        for (const [key, value] of Object.entries(this.attr)) {
            if(key == "text") {
                this.element.appendChild(document.createTextNode(value));
                continue;
            }
            
            this.element.setAttribute(key, value);
        }
    }
    
    get html():HTMLElement {
        return this.element;
    }
    
}

export { CreateElement };

export default (name:CreateElementName, attr:CreateElementAttributes):HTMLElement=> {
    
    if(env_mode == "dev") 
        attr = Object.assign({"xio-is-virtual":true}, attr);
    
    return new CreateElement(name, attr).html;
}
