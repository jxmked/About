/**
 * Create element
 * 
 * For initial 
 * */

import {env_mode} from "globals";

type CreateElementName = string;
type CreateElementAttributes = {[key:string]:any}


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
            switch(key.toLowerCase()) {
                case "text":
                    this.element.appendChild(document.createTextNode(value));
                    break;
                
                case "appendchild":
                    if(value instanceof Array) {
                        value.forEach((node:any) => this.appendChild(node))
                    } else {
                        this.appendChild(value);
                    }
                    
                    break;
                
                default:
                    this.element.setAttribute(key, value);
            }
        }
    }
    
    private appendChild(element:HTMLElement) {
        this.element.appendChild(element);
    }
    
    get html():HTMLElement {
        return this.element;
    }
    
}

export { CreateElement };

export default (name:CreateElementName, attr?:CreateElementAttributes):HTMLElement=> {
    
    if(env_mode == "dev") 
        attr = Object.assign({"xio-is-virtual":true}, attr);
    
    return new CreateElement(name, attr).html;
}
