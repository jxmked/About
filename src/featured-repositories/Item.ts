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

import { envRes } from '../globals';
import createElement from '../modules/createElement';
import UsedLang from './used-languages';
import { fallbackEmpty, isEmpty } from '../Helpers';

export default class Item {
    private properties: RepoProperties;
    private container: HTMLElement;
    private target_keys: string[];

    html_url: string;
    node_id: string;
    name: string;
    homepage: string;
    id: number | string;
    description: string;

    constructor(properties: RepoProperties) {
        this.properties = properties;

        const { node_id, name, html_url, homepage, id, description } = this.properties;

        this.html_url = fallbackEmpty(html_url, '{url}');
        this.node_id = fallbackEmpty(node_id, '{node_id}');
        this.name = fallbackEmpty(name, '{name}');
        this.homepage = fallbackEmpty(homepage, '{homepage}');
        this.id = id === null || id === void 0 ? '{id}' : id;
        this.description = fallbackEmpty(description, '{description}');

        this.target_keys = envRes.get('featured-repositories')!;

        this.container = createElement('div', {
            'data-has-homepage': isEmpty(homepage) ? false : true,
            'node-id': this.node_id,
            'property-id': this.id,
            'data-item-name': this.name,
            'data-item-id': this.id,
            'class': 'pp-items'
        });

        this.label();
        this.create_description();
        this.tags();
        this.inused_lang();
    }

    inused_lang(): void {
        const lang_info = new UsedLang(this.properties.languages);

        this.container.appendChild(lang_info.html);
    }

    label(): void {
        const label: HTMLElement = createElement('label');
        const a: HTMLElement = createElement('a', {
            'class': 'listen-on-click',
            'target': '_blank',
            'rel': 'noopener noreferrer',
            'href': this.html_url,
            'text': this.name,
            'alt': this.html_url,
            'aria-label': this.html_url
        });

        label.appendChild(a);
        this.container.appendChild(label);
    }

    create_description(): void {
        const desc: HTMLElement = createElement('p', {
            'data-for': this.name,
            'text': this.description
        });

        this.container.appendChild(
            createElement('div', {
                'appendChild': desc,
                'aria-for': this.name,
                'aria-repository-link': this.html_url
            })
        );
    }

    tags(): void {
        const { topics } = this.properties;

        const topics_object: HTMLElement[] = topics
            .filter((value: string) => {
                // Remove target keys from topic list
                return !(!isEmpty(value) && this.target_keys.some((key) => key == value));
            })
            .map((topic: string) => {
                // Create Element For All Topics
                return createElement('li', {
                    'text': topic,
                    'data-property-of': this.name
                });
            });

        const list_con: HTMLElement = createElement('ul', {
            appendChild: topics_object
        });

        this.container.appendChild(
            createElement('div', {
                appendChild: list_con
            })
        );
    }

    get html() {
        return this.container;
    }
}
