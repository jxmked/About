/**
 * List Item HTML structure
 * - li
 *   - a
 * */

import createElement from '../modules/createElement';
import { isEmpty, normalizeString as normalize, fallbackEmpty } from '../Helpers';

class NavigationBar {
    static PANEL: HTMLElement = document.getElementById('nav-panel')!;
    static CHECKBOX_BURGER: HTMLElement = document.getElementById('--cb-burger-menu')!;
    static PANEL_LIST: HTMLElement = document.getElementById('nav-panel-list')!;

    constructor() {
        NavigationBar.PANEL.addEventListener(
            'click',
            () => {
                NavigationBar.CHECKBOX_BURGER.click();
            },
            true
        );
    }

    static addItem({ name, href }: NavigationBarAddItem): void {
        if ((typeof name !== 'number' && isEmpty(name)) || isEmpty(href)) {
            throw new Error('NavigationBar.addItem parameter 1 or 2 cannot be empty');
        }

        /**
         * Incase of.... Hahaha
         * */
        name = fallbackEmpty(normalize(name), '{target_name}');
        href = fallbackEmpty(normalize(href), '{target_link}');

        href = encodeURI(href);

        const a_tag: HTMLElement = createElement('a', {
            text: name,
            rel: 'noreferrer origin',
            alt: `Navigate to ${name}`,
            href: href
        });

        try {
            NavigationBar.PANEL_LIST.appendChild(
                createElement('li', {
                    appendChild: a_tag
                })
            );
        } catch (e) {
            console.error('Unable to insert element');
            console.error(e);
        }
    }
}

export default NavigationBar;
