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
 *         - span[] (This must be a bars) (Define background color and width in style attr)
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
import getRepos from "modules/get_repos";


export default class Known_Lang {
    
    private static PLACEMENT:HTMLElement = document.getElementById("main-about")!;
    private static BASE:HTMLElement = createElement("div", {id:"main-languages"}); // #main-languages
    private static CONTAINER:HTMLElement = createElement("div"); // Base container
    private static TEXT_CONTAINER:HTMLElement = createElement("span"); // Text interact
    
    /**
     * Calculated Languages in Percentage
     * */
    private COUNTED_LANGS:{[key:string]:number};
    
    constructor() {
        
        console.log("Known_Lang has been initiated");
        
        this.COUNTED_LANGS = {};
        
        // Add label
        Known_Lang.CONTAINER.appendChild(new Label({
            title: "Known Languages: ", 
            tooltip: "from Github"}).html);
        
        this.display_loading_screen();
        
        Known_Lang.BASE.appendChild(Known_Lang.CONTAINER);
        Known_Lang.PLACEMENT.parentNode!.insertBefore(Known_Lang.BASE, Known_Lang.PLACEMENT.nextSibling);
        
        console.log("Starting to fetch github repositories...");
        
        new getRepos().then((repos:RepoProperties[]) => {
            
            console.log("Repositories has been fetched");
            console.log("Parsing Repositories...");
            this.__calculate(repos);
            
        })
        
    }
    
    __calculate(repos:RepoProperties[]):void {
        /**
         * Sum each unique languages has been used each repository
         * */
         
        console.log("Calculating languages from each repository...");
        const calculated:{[key:string]:number} = {};
        
        // Get language dictionary 
        for(const {languages, name} of Object.values(repos)) {
            
            console.log("Counting... " + name);
            
            for(const [lang, count] of Object.entries(languages)) {
                if(calculated.hasOwnProperty(lang)){
                    calculated[lang] += count
                    continue;
                }
                
                calculated[lang] = count;
            }
        }
        
        /**
         * Convert to percentages
         * */
        const sum:number = Object.values(calculated).reduce((x, y) => x + y);
        
        const pert:{[key:string]:number} = {};
        
        Object.entries(calculated).forEach(([lang, count]) => {
            pert[lang] = (count / sum) * 100;
        });
        
        this.COUNTED_LANGS = pert;
        
        console.log("Calculated");
    }
    
    
    async display_loading_screen():Promise<void> {
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
        
        console.log("Loading screen has been added");
    }
    
    catch(err:any):void {
        console.error(err)
    }
}