export default class Form extends NestedComponent {
    /**
     * @param {HTMLElement} htmlContainer the container the form will go into
     * @param {object} form the form json
     * @param {object?} options options for the form
     */
    constructor(htmlContainer: HTMLElement, form: object, options: object | null);
    htmlContainer: HTMLElement;
    _form: {};
    name: string;
    title: string;
    path: string;
    set components(value: object[]);
    /**
     * gets components
     * @returns {object[]} gets components
     */
    get components(): object[];
    _components: any[];
    /**
     * Adds a component to the form
     * @param {object | import('./components/_classes/component/Component.js').Component} component the component to be added
     * @param {number} position the position to add it to
     */
    addComponent(component: object | import("./components/_classes/component/Component.js").Component, position: number): void;
    /**
     * attaches event listeners to the form
     * @param {HTMLElement} parentContainer the parent container
     */
    attach(parentContainer: HTMLElement): void;
    /**
     * sets the inner html for the container htmlElement
     */
    createForm(): void;
    /**
     * Go through each of the components and create an object containing components property as key and components value
     * as the value
     * @returns {object} the submission value
     */
    getSubmission(): object;
    init(): void;
    /**
     * Removes a component at a position
     * @param {number} position the position of the component to remove
     */
    removeComponent(position: number): void;
    render(): string;
    /**
     * Go through each of the components and call set submission on each of them passing in the value/values as well
     * @param {object} submission the submission object
     */
    setSubmission(submission: object): void;
    _submission: any;
}
import NestedComponent from './components/_classes/nestedcomponent/NestedComponent.js';
//# sourceMappingURL=Form.d.ts.map