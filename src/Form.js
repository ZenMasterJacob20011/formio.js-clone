import Inputmask from 'inputmask/lib/inputmask.js';
import Components from './components/_classes/components/Components.js';
import Template from './templates/Template.js';
import NestedComponent from './components/_classes/nestedcomponent/NestedComponent.js';
import _ from 'lodash';
import Formio from './Formio.js';

export default class Form extends NestedComponent {

    static schema(...extend) {
        return NestedComponent.schema({
            type: 'form'
        }, ...extend);
    }

    /**
     * @param {HTMLElement} htmlContainer the container the form will go into
     * @param {object} form the form json
     * @param {object?} options options for the form
     */
    constructor(htmlContainer, form, options) {
        super(null, options, null);
        this.component.components = form.components;
        this.htmlContainer = htmlContainer;
        this._form = {};
        this._form.components = form.components;
        this.name = '';
        this.title = '';
        this.path = '';
        Formio.forms[this.component._id] = this;
        this.init();
    }

    /**
     * gets components
     * @returns {object[]} gets components
     */
    get components() {
        return this._components;
    }

    set components(value) {
        this._components = value;
    }

    get submission() {
        return this.getSubmission();
    }

    set submission(data) {
        this.setSubmission(data.data);
    }

    /**
     * Adds a component to the form
     * @param {object | import('./components/_classes/component/Component.js').Component} component the component to be added
     * @param {number} position the position to add it to
     */
    addComponent(component, position) {
        if (Object.getPrototypeOf(component) === Object.prototype) {
            this.components.splice(position, 0, Components.createComponent(component, this.options));
            return;
        }
        this.components.splice(position, 0, component);
    }

    /**
     * attaches event listeners to the form
     * @param {HTMLElement} parentContainer the parent container
     */
    attach(parentContainer) {
        super.attach(parentContainer);
        this.parent = null;
        this.htmlContainer = parentContainer.querySelector('[ref="form"]') || this.htmlContainer;
        let componentsContainer = this.htmlContainer.querySelector('[ref="form-container"]');
        componentsContainer.formioContainer = this._form.components;
        componentsContainer.component = this;
        this.hook('attachDragula', componentsContainer);
    }

    /**
     * sets the inner html for the container htmlElement
     */
    createForm() {
        this.init();
        let componentsWithInputMasks = [];
        this.components.forEach((classComponent) => {
            if (classComponent.component.inputMask) {
                componentsWithInputMasks.push(classComponent);
            }
        });
        this.htmlContainer.innerHTML = this.render();
        componentsWithInputMasks.forEach((component) => {
            let inputMask = new Inputmask(component.component.inputMask);
            inputMask.mask(document.getElementById(component.id));
        });
    }


    get defaultSchema() {
        return Form.schema();
    }


    /**
     * Go through each of the components and create an object containing components property as key and components value
     * as the value
     * @returns {object} the submission value
     */
    getSubmission() {
        let value = {data: {}, metadata: {}};
        this.components.forEach((component) => {
            _.merge(value.data, component.submission);
        });
        return value;
    }

    init() {
        this.components = Components.convertComponentArrayToClassArray(this._form.components, this.options);
    }


    redraw() {
        this.init();
        this.htmlContainer.innerHTML = Template.renderTemplate('components', {
            children: this.components.map((component) => component.render()),
            components: this.components,
            containerType: 'form',
            builderMode: this.options.builderMode
        });
        this.attach(this.htmlContainer);
    }

    /**
     * Removes a component at a position
     * @param {number} position the position of the component to remove
     */
    removeComponent(position) {
        this._form.components.splice(position, 1);
    }


    render() {
        this.init();
        let formContainer = '<div ref="form" class="form">';
        formContainer += Template.renderTemplate('components', {
            children: this.components.map((component) => component.render()),
            components: this.components,
            containerType: 'form',
            builderMode: this.options.builderMode
        });
        formContainer += '</div>';
        return formContainer;
    }

    /**
     * Go through each of the components and call set submission on each of them passing in the value/values as well
     * @param {object} submission the submission object
     */
    setSubmission(submission) {
        this._submission = submission;
        this.components.forEach((component) => {
            component.submission = submission;
        });
    }


}
