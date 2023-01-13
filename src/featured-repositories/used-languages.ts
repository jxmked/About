/**
 *
 * HTML Structure
 * - div (Used Languages)
 *   - div (Language Bar Graph)
 *     - span[]
 *
 *   - ul (Language Names)
 *     - li[].item
 *       - span (Bullet)
 *       - p.language (Language Name)
 *       - p (percentages)
 * */

import createElement from '../modules/createElement';
import Color from '../modules/get-lang-colors';
import { isEmpty } from '../Helpers';

export default class Used_Lang {
    private BASE: HTMLElement;
    private languages: Record<string, number>;
    private structure: {
        color: hexCode;
        name: string;
        percent: number;
    }[];

    constructor(languages: Record<string, number>) {
        this.languages = languages;
        this.structure = [];
        this.BASE = createElement('div', {
            'data-languages-count': Object.values(this.languages).length.toString()
        });

        if (!isEmpty(this.languages)) {
            // Sort COUNTED_LANGS by value
            // Max -> Min
            const entries: [string, number][] = Object.entries(this.languages);
            const rebuild: Record<string, number> = {};

            entries.sort((a, b) => a[1] + b[1]);

            // Rebuild object
            entries.forEach((item: [string, number]) => {
                rebuild[item[0]] = item[1];
            });

            const sum: number = Object.values(this.languages).reduce((x, y) => x + y);

            this.structure = Object.entries(this.languages).map(([lang, map]) => {
                return {
                    name: lang,
                    color: Color.lang(lang),
                    percent: (map / sum) * 100
                };
            });

            this.languages = Object.assign({}, rebuild);
        }

        this.create_bar_graph();
        this.create_language_list();
    }

    private create_bar_graph(): void {
        const container: HTMLElement = createElement('div');

        this.structure.forEach((args) => {
            const { name, color, percent } = args;

            container.appendChild(
                createElement('span', {
                    'style': `background-color: ${color};width: ${percent}%;`,
                    'data-languages': name,
                    'data-color': color,
                    'data-value': percent
                })
            );
        });

        this.BASE.appendChild(container);
    }

    private create_language_list(): void {
        const container: HTMLElement = createElement('ul');

        this.structure.forEach(({ color, name, percent }) => {
            const bullet: HTMLElement = createElement('span', {
                'style': `background-color: ${color};`,
                'data-language': name
            });

            const lang_name: HTMLElement = createElement('p', {
                class: 'language',
                text: name
            });

            const percentage: HTMLElement = createElement('p', {
                text: `${percent.toFixed(2)}%`
            });

            container.appendChild(
                createElement('li', {
                    'data-color': color,
                    'data-name': name,
                    'data-value': percent,
                    'class': 'item',
                    'appendChild': [bullet, lang_name, percentage]
                })
            );
        });

        this.BASE.appendChild(container);
    }

    get html(): HTMLElement {
        return this.BASE;
    }
}
