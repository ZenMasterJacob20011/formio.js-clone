export default class FormBuilder extends Component {
    /**
     * Constructor for form builder
     * @param {HTMLElement} htmlContainer the container for the form builder
     * @param {object} options options for the builder
     */
    constructor(htmlContainer: HTMLElement, options: object);
    htmlContainer: HTMLElement;
    containers: any[];
    form: Form;
    attach(element: any): void;
    drake: any;
    /**
     *
     * @param {HTMLElement} element the element to attach listeners to
     * @param {Component} component the component being modified by listeners
     */
    attachComponent(element: HTMLElement, component: Component): void;
    /**
     * Adds a container to the list of containers for dragula
     * @param {HTMLElement} container the container to be added
     */
    attachDragula(container: HTMLElement): void;
    /**
     * attaches event listeners to edit form
     * @param {HTMLElement} element parent container for edit form
     * @param {Component} component the component being edited
     * @param {Form} editForm the edit form
     * @param {object} originalContainerSchema the original schema of the component parent container
     */
    attachEditForm(element: HTMLElement, component: Component, editForm: Form, originalContainerSchema: object): void;
    attachEditJSONForm(element: any, component: any, editForm: any, originalContainerSchema: any): void;
    closeModal(modal: any): void;
    createBuilder(): void;
    /**
     * Creates a modal edit form that will render edit form, attach listeners, and modify the component object, and then rerender on save
     * @param {string} modalContents the content to be inserted into the modal
     * @returns {HTMLElement} the modal element
     */
    createModal(modalContents: string): HTMLElement;
    editJSON(component: any): void;
    /**
     * attaches listeners to the edit modal
     * @param {Component} component the component of the edit modal
     * @param {object} originalContainerSchema the original parent container of the component
     */
    editModal(component: Component, originalContainerSchema: object): void;
    /**
     * get the position of a component in a container
     * @param {HTMLElement | Component} el the html element or component to find
     * @param {HTMLElement | Component[]} container the list of elements or list of components
     * @returns {number} the position of the component
     */
    getComponentPosition(el: HTMLElement | Component, container: HTMLElement | Component[]): number;
    redraw(): void;
    /**
     * redraws the builders form
     * @param {HTMLElement} container the container element to redraw
     */
    redrawContainer(container: HTMLElement): void;
    /**
     * removes component from form
     * @param {Component} component the component to remove
     */
    removeComponent(component: Component): void;
    /**
     * renders the form builder
     * @returns {string} the html of the form builder
     */
    render(): string;
    /**
     * sets and creates the builder
     * @param {object} form the form definition
     */
    set setBuilder(form: object);
    /**
     * Gets the sidebar components based on a filter value
     * @param {string} value the value to filter
     * @returns {object} an object of groups and components in those groups
     */
    sideBarComponents(value: string): object;
    sidebarSearch(event: any): void;
}
import Component from './components/_classes/component/Component.js';
import Form from './Form.js';
//# sourceMappingURL=FormBuilder.d.ts.map