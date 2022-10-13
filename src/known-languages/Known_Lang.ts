/**
 * Known Languages
 * Desc: Known/Used languages to create or develop something...
 * 
 * HTML structure
 * [Default State]
 * - div#main-languages
 *   - div
 *     - label
 *       - (string)
 *       - span.tooltip
 *         - (string)
 *     
 *     - div
 *       - div
 *         - span (This must be a bars)
 * 
 *     - div
 *       - ul
 *         - li (This must be a language color, name and percentages)
 *           - span (Bullet)
 *           - p (Programming language name)
 *           - span (Percentages)
 * 
 * [Loading State]
 * - div#main-languages
 *   - div
 *     - label
 *       - (string)
 *       - span.tooltip
 *         - (string)
 * 
 *     - div.loading-state
 *       - div
 *         - div
 *       - span
 *         - (string)
 * 
 * 
 * */

import {envRes} from "globals";
import Label from "../modules/label";

class Known_Lang {
    
    private static BASE:HTMLElement = document.createElement("div"); // #main-languages
    private static CONTAINER:HTMLElement = document.createElement("div"); // Base container
    private __promise:Promise<boolean>;
    
    constructor() {
        
        Known_Lang.BASE.appendChild(Known_Lang.CONTAINER);
        Known_Lang.BASE.setAttribute("id", "main-languages");
        
        this.display_loading_screen();
        
        this.__promise = new Promise<boolean>((resolve, reject) => {
            
        }).catch(this.catch.bind(this));
    }
    
    async display_loading_screen() {
        Known_Lang.BASE.classList.add("loading");
        
        
    }
    
    async then():Promise<boolean> {
        return await this.__promise.then((arg) => arg);
    }
    
    async catch(err:any):Promise<boolean> {
        
        return true;
    }
    
    /*html():HTMLElement {
       container.appendChild(new Label({
            title:"Known Languages",
            tooltip:"from Github"
        }).html);
        
        base.appendChild(container);
         
        return base; 
    } */
    
    
    
}