export default class Component {
    static editInfo: typeof editInfo;
    static schema(...sources: any[]): any;
    /**
     * creates a new component
     * @param {object} component the component json
     * @param {object} options options
     * @param {object} data data
     */
    constructor(component: object, options: object, data: object);
    options: any;
    data: any;
    component: any;
    refs: {};
    set dataValue(value: any);
    get dataValue(): any;
    _dataValue: any;
    /**
     * sets the submission for the component
     * @param {object} submissionData the submission data
     */
    set submission(submissionData: object);
    get submission(): object;
    /**
     * attaches functions to component element
     * @param {HTMLElement} element the element to attach to
     */
    attach(element: HTMLElement): void;
    parent: HTMLElement;
    element: HTMLElement;
    get defaultSchema(): any;
    hook(...args: any[]): any;
    get id(): any;
    /**
     * gives the class refs instance variable to access references
     * @param {HTMLElement} element the element to get the references from
     * @param {object} refs the list of references
     */
    loadRefs(element: HTMLElement, refs: object): void;
    /**
     * merges the static schemas with the component json
     * @param {object} component the component to merge
     * @returns {object} the merged component object
     */
    mergeSchema(component: object): object;
    /**
     * return the html of a component
     * @param {string} html the html to be wrapped
     * @returns {string} the html to be rendered
     */
    render(html: string): string;
    /**
     * sets the value for the component
     * @param {number | string | object} value the value to be set
     */
    setValue(value: number | string | object): void;
}
import editInfo from './Component.form.js';
//# sourceMappingURL=Component.d.ts.map