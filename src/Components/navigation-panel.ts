/**
 * For Navigation Panel
 * 
 * 
 * Add item to navigation panel.
 * 
 * target id:nav-panel-list
 * */

class NavigationPanel {
    
    constructor(){
        document.getElementById("nav-panel")!.addEventListener("click", () => {
            document.getElementById("--cb-burger-menu")!.click();
        }, true);
    }
    
    static addItem(str:string|number, target:string|number):void{
        const invalid:any = [void 0, 0, null, ""];
        
        str = String(str).trim();
        target = encodeURI(String(target));
        
        if(
            (invalid.indexOf(str) != -1) || 
            (invalid.indexOf(target) != -1)
        ) {
            throw new Error("Unable to add");
        }
        const base:HTMLElement = document.createElement("li");
        const hyper:HTMLElement = document.createElement("a");
        
        hyper.appendChild(document.createTextNode(str));
        
        hyper.setAttribute("href", `#${target}`);
        hyper.setAttribute("rel", "noreferrer origin");
        hyper.setAttribute("alt", `Navigate to ${str}`);
        base.appendChild(hyper);
        
        try {
            const parent:HTMLElement = document.getElementById("nav-panel-list")!;
            
            //console.log(parent.childNodes.length)
           // console.log(parent)
           // parent.insertBefore(base, parent.childNodes[2]);
            parent.appendChild(base)
        } catch(e){
            console.error("Unable to insert element");
            console.error(e)
        }
    }
}
