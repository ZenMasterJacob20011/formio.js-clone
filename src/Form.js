import Inputmask from 'inputmask/lib/inputmask.js';
import Components from './components/_classes/components/Components';
import _ from 'lodash';

export default class Form{
    /**
     * @param {HTMLElement} htmlContainer the container the form will go into
     * @param {object[]} components the components of the form
     * @param {object?} options options for the form
     */
    constructor(htmlContainer, components, options) {
        this.htmlContainer = htmlContainer;
        this.options = options || {};
        delete this.options.attachComponent;
        this._form = {};
        this._form.components = components;
        this.init();
    }

    init(){
        this.components = Components.convertComponentArrayToClassArray(this._form.components, this.options);
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
     * Removes a component at a position
     * @param {number} position the position of the component to remove
     */
    removeComponent(position) {
        this._form.components.splice(position, 1);
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

    set submission(data) {
        this.setSubmission(data);
    }

    get submission() {
        return this.getSubmission();
    }

    /**
     * Go through each of the components and call set submission on each of them passing in the value/values as well
     * @param {object} submission the submission object
     */
    setSubmission(submission) {
        this._submission = submission;
        this.components.forEach((component) => {
            const value = _.get(submission.data, component.component.key);
            component.setValue(value);
        });
    }

    /**
     * Go through each of the components and create an object containing components property as key and components value
     * as the value
     * @returns {object} the submission value
     */
    getSubmission() {
        let value = {data: {}, metadata: {}};
        this.components.forEach((component) => {
            value.data[component.component.key] = component.dataValue;
        });
        return value;
    }

    /**
     * attaches event listeners to the form
     * @param {HTMLElement} parentContainer the parent container
     */
    attach(parentContainer) {
        this.htmlContainer = parentContainer.querySelector('[ref="form"]');
        this.htmlContainer.formioContainer = this._form.components;
        this.components.forEach((classComponent, index) => {
            if (this.options.builderMode && this.components.length <= 1){
                index++;
            }
            classComponent.attach(this.htmlContainer.children.item(index));
        });
    }

    redraw() {
        this.createForm(this.components);
    }

    render() {
        this.init();
        let formContainer = '<div ref="form" class="form">';
        if (this.options.builderMode && this.components.length <= 1) {
            formContainer += '<div class="drag-and-drop-alert no-drag">Drag and Drop a form component</div>';
        }
        this.components.forEach((classComponent) => {
            formContainer += classComponent.render();
        });
        formContainer += '</div>';
        return formContainer;
    }
}
