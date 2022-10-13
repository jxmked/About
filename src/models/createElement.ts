/**
 * Create element
 * 
 * 
 * */

type CreateElementName = string;

interface CreateElementAttributes {
    [key:string]:any
}


class CreateElement {
    private element:HTMLElement;
    private name:CreateElementName;
    private attr?:CreateElementAttributes;
    
    constructor(name:CreateElementName, attr?:CreateElementAttributes ) {
        this.name = name;
        this.attr = attr;
        
        this.element = document.createElement(name.trim());
        
    }
    
    private checkout_attributes():void {
        if(this.attr == void 0)
            return;
        
        
    }
    
    
    
}




export default (name:CreateElementName, attr:CreateElementAttributes):CreateElement => {
    
    attr = Object.assign({
        "xio-is-virtual":true
    }, attr);
    
    return new CreateElement(name, attr);
}
