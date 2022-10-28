/**
 * 
 * HTML Structure
 * - div (Used Languages)
 *   - div (Language Bar Graph)
 *     - span[]
 *   - ul (Language Names)
 *     - li[].item
 *       - span (Bullet)
 *       - p.language (Language Name)
 *       - p (percentages)
 * */

import {envRes} from "globals";
import createElement from "modules/createElement";
import Color from "modules/get-lang-colors";

export default class Used_Lang {
    private static BASE:HTMLElement = createElement("div");
    
    private languages:string[];
    private structure:{
        color:hexCode,
        name:string
    }[];
    
    constructor(languages:string[]) {
        this.languages = languages;
        this.structure = this.languages.map((language:string) => {
            return {
                name: language,
                color: Color.lang(language)
            }
        });
        
        
    }
    
    create_bar_graph() {
        
        const elements:HTMLElement[] = Object.entries
        const con:HTMLElement = createElement("div");
        
    }
    
}

