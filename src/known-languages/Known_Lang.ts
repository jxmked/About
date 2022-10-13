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
import Label from "../models/label";

type catcherProperties = (err:any) => Promise<boolean>;


class Known_Lang {
    private BASE:HTMLElement; // #main-languages
    private CONTAINER:HTMLElement; // Base container
    
    private __promise:Promise<boolean>;
    
    constructor() {
        this.BASE = document.createElement("div");
        this.BASE.setAttribute("id", "main-languages");

        this.display_loading_screen();
        
        this.__promise = new Promise<boolean>((resolve, reject) => {
            
        }).catch(this.catch.bind(this));
    }
    
    async display_loading_screen() {
        
    }
    
    async then():Promise<boolean> {
        return await this.__promise.then((arg) => arg);
    }
    
    async catch(err:any):Promise<boolean> {
        
        return true;
    }
    
    html():HTMLElement {
        container.appendChild(new Label({
            title:"Known Languages",
            tooltip:"from Github"
        }).html);
        
        base.appendChild(container);
        
        return base;
    }
    
    
    
}