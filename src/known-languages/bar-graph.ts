import { envRes } from "globals";
import createElement from "modules/createElement";

export default class BarGraph {
    
    
    private name:string;
    private value:number;
    
    constructor(name:string, value:number){
        this.name = name;
        this.value = value;
    }
    
    set Name(name:string) {
        this.name = name;
    }
    
    set Value(value:number) {
        this.value = value;
    }
    
    get html():HTMLElement {
        
        
        const elem:HTMLElement = createElement("span", {
            "data-value": this.value,
            "style": `background-color: #00ff00`
        })
        
        
        return elem;
    }
}