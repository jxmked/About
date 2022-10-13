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
 *         - span[] (This must be a bars)
 * 
 *     - div
 *       - ul
 *         - li[] (This must be a language color, name and percentages)
 *           - span (Bullet)
 *           - p (Programming language name)
 *           - span (Percentages)
 * 
 * [Loading State]
 * - div#main-languages.loading
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
import Label from "modules/label";
import createElement from "modules/createElement";


export default class Known_Lang {
    
    private static PLACEMENT:HTMLElement = document.getElementById("main-about")!;
    private static BASE:HTMLElement = createElement("div", {id:"main-languages"}); // #main-languages
    private static CONTAINER:HTMLElement = createElement("div"); // Base container
    private static TEXT_CONTAINER:HTMLElement = createElement("span"); // Text interact
    private __promise:Promise<boolean>;
    
    constructor() {
        // Add label
        Known_Lang.CONTAINER.appendChild(new Label({
            title: "Known Languages: ", 
            tooltip: "from Github"}).html);
        
        this.display_loading_screen();
        
        Known_Lang.BASE.appendChild(Known_Lang.CONTAINER);
        Known_Lang.PLACEMENT.parentNode!.insertBefore(Known_Lang.BASE, Known_Lang.PLACEMENT.nextSibling);
        
        this.__promise = new Promise<boolean>((resolve, reject) => {
            resolve(true)
        }).catch(this.catch.bind(this));
    }
    
    async display_loading_screen() {
        Known_Lang.BASE.classList.add("loading");
        
        const container:HTMLElement = createElement("div", {
            "class":"loading-state"
        });
        
        const waveContainer:HTMLElement = createElement("div");
        const waveMotion:HTMLElement = createElement("div");
        Known_Lang.TEXT_CONTAINER.innerText = "Loading...";
        
        waveContainer.appendChild(waveMotion);
        container.appendChild(waveContainer);
        container.appendChild(Known_Lang.TEXT_CONTAINER);
        Known_Lang.CONTAINER.appendChild(container);
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