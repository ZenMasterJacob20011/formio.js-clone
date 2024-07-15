import Inputmask from 'inputmask/lib/inputmask.js';
import Components from './components/_classes/components/Components';
import Component from './components/_classes/component/Component';

export default class Form extends Component {
    /**
     * @param {HTMLElement} htmlContainer the container the form will go into
     * @param {object[]} components the components of the form
     * @param {object?} options options for the form
     */
    constructor(htmlContainer, components, options) {
        super({type: 'form'}, options, {});
        this.htmlContainer = htmlContainer;
        this.options = options || {};
        let componentsClass = [];
        if (components) {
            componentsClass = components.map((component) => {
                return Components.createComponent(component, this.options);
            });
        }
        this._components = componentsClass;
    }

    /**
     * sets the inner html for the container htmlElement
     */
    createForm() {
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
        this.components.splice(position, 1);
    }

    /**
     * gets components
     * @returns {Component[]} gets components
     */
    get components() {
        return this._components;
    }


    set components(value) {
        this._components = value;
    }

    /**
     * attaches event listeners to the form
     * @param {HTMLElement} parentContainer the parent container
     */
    attach(parentContainer){
        this.htmlContainer = parentContainer.querySelector('[ref="form"]');
        this.components.forEach((classComponent, index) => {
            classComponent.attach(this.htmlContainer.children.item(index));
        });
    }

    redraw() {
        this.createForm(this.components);
    }

    render() {
        let formContainer = '<div ref="form" class="form">';
        if (this.options.builderMode && this.components.length <= 1) {
            formContainer += '<div class="drag-and-drop-alert">Drag and Drop a form component</div>';
        }
        this.components.forEach((classComponent) => {
            formContainer += classComponent.render();
        });
        formContainer += '</div>';
        return formContainer;
    }
}
