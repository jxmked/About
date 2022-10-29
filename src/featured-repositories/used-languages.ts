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
import {isEmpty} from "Helpers";

export default class Used_Lang {
    private static BASE:HTMLElement = createElement("div");
    
    private languages:{[key:string]:number};
    private structure:{
        color:hexCode,
        name:string,
        percent:number
    }[];
    
    constructor(languages:{[key:string]:number}) {
        this.languages = languages;
        this.structure = [];
        
        if(! isEmpty(this.languages)) {
           /* sum = Object.values(this.languages).reduce((x, y) => x + y)
            
            this.structure = Object.entries(this.languages).map(([lang, map]) => {
                return {
                    name: lang,
                    color: Color.lang(lang),
                    percent: (map / sum) * 100
                }
            }); */
            
            // Sort COUNTED_LANGS by value
            // Min -> Max
            const entries:[string, number][] = Object.entries(this.languages);
            const rebuild:{[key:string]:number} = {};
            
            entries.sort((a, b) => a[1] - b[1]);
            
            // Rebuild object
            entries.forEach((item:[string, number]) => {
                rebuild[item[0]] = item[1];
            });
            
            /**
             * Convert to percentages
             * */
            const sum:number = Object.values(rebuild).reduce((x, y) => x + y);
            //const pert:{[key:string]:number} = {};
            this.languages = Object.fromEntries(Object.entries(rebuild).map(([lang, count]) => {
                return [lang, (count / sum) * 100];
            }))
            
///this.languages = pert;
            
            console.table(this.languages)
        }
        
        
    }
    
    create_bar_graph() {
        
      //  const elements:HTMLElement[] = Object.entries
        const con:HTMLElement = createElement("div");
        
    }
    
    
    get html(){
        return Used_Lang.BASE;
    }
}

