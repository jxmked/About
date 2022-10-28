/**
 * 
 * HTML Structure
 * - div[].pp-items
 *   - label
 *     - a.listen-on-click
 * 
 *   - div (Description)
 *     - p
 * 
 *   - div (Tags)
 *     - ul
 *       - li[]
 * 
 *   - div (Used Languages)
 *     - div (Language Bar Graph)
 *       - span[]
 *     - ul (Language Names)
 *       - li[].item
 *         - span (Bullet)
 *         - p.language (Language Name)
 *         - p (percentages)
 * */

import {envRes} from "globals";
import createElement from "modules/createElement";

export default class Item {
    private properties:RepoProperties;
    private container:HTMLElement;
    private target_keys:string[];
    
    constructor(properties:RepoProperties) {
        this.properties = properties;
        this.target_keys = envRes.get("featured-repositories")!;
        
        this.container = createElement("div", {
            "data-has-homepage": (this.properties.take("homepage") ? true : false),
            "node-id": this.properties.take("node_id"),
            "property-id": this.properties.take("id", "null"),
            "data-item-name": this.properties.take("name"),
            "data-item-id": this.properties.take("id", "null"),
            "class": "pp-items"
        });
        
        this.label();
        this.description();
        this.tags();
    }
    
    label() {
        const label:HTMLElement = createElement("label");
        const a:HTMLElement = createElement("a", {
            "class":"listen-on-click",
            "target":"_blank",
            "rel":"noopener noreferrer",
            "href": this.properties.take("html_url", "{html_url}"),
            "text": this.properties.take("name", "{name}"),
            "alt": this.properties.take("html_url", "{alt}"),
            "aria-label": this.properties.take("name", "{name}")
        });
        
        label.appendChild(a);
        this.container.appendChild(label);
    }
    
    description() {
        const desc:HTMLElement = createElement("p", {
            "data-for": this.properties.take("name"),
            text: this.properties.take("description", "{description}")
        });
        
        this.container.appendChild(createElement("div", {
            "appendChild": desc,
            "aria-for": this.properties.take("name", "{name}"),
            "aria-repository-link": this.properties.take("html_url", "{html_url}")
        }));
    }
    
    tags() {
        const topics:string[] = this.properties.take("topics").filter((value:string) => {
            // Remove target keys from topic list
            return !(this.target_keys.some((key) => key == value));
        }).map((topic:string) => {
            // Create Element For All Topics
            return createElement("li", {
                "text": topic,
                "data-property-of": this.properties.take("name")
            });
        });
        
        const list_con:HTMLElement = createElement("ul", {
            "appendChild": topics
        });
        
        this.container.appendChild(createElement("div", {
            "appendChild": list_con
        }));
    }
    
    get html() {
        return this.container;
    }
    
}
