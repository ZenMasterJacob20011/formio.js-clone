export default class NestedComponent extends Component {
    constructor(component: any, options: any, data: any);
    attach(element: any): void;
    /**
     * Calls attach on an array of components
     * @param {HTMLElement} element the parent container
     * @param {Component[]} components the components to call attach on
     */
    attachComponents(element: HTMLElement, components: Component[]): void;
    get components(): any;
    get nestedKey(): string;
    redraw(): void;
    render(html: any): string;
    /**
     * renders a list of components wrapped in components template
     * @param {Component[]} components the components to be rendered
     * @returns {string} the html of the components wrapped in components template
     */
    renderComponents(components: Component[]): string;
}
import Component from '../component/Component.js';
//# sourceMappingURL=NestedComponent.d.ts.map