/**
 * Loading Screen for Main Languages
 * */

class Main_Lang_loading {
    private static _parent:HTMLElement;
    
    constructor(parent:HTMLElement){
        Main_Lang_loading._parent = parent;
    }
    
    loadUp() {
        Main_Lang_loading._parent.classList.add("loading");
        this.wave_animation();
    }
    
    private wave_animation() {
        
    }
   // static setL
}