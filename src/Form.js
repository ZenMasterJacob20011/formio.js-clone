import Components from './components/_classes/Components';
import Inputmask from 'inputmask/lib/inputmask.js';

export class Form {
    /**
     * @param {HTMLElement} htmlContainer
     * @param {object[]?} components
     * @param {object?} options
     */
    constructor(htmlContainer, components, options) {
        this.htmlContainer = htmlContainer;
        this.options = options || {};
        if (components) {
            this.components = components;
        } else {
            this.components = [];
        }
        this._components = components;
    }

    /**
     * sets the inner html for the container htmlElement
     */
    createForm() {
        /** @type {Component[]}*/
        let componentsWithInputMasks = [];
        const classComponents = this.components.map((component) => {
            return Components.createComponent(component, {}, {});
        });
        classComponents.forEach((classComponent) => {
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
     * @param component
     * @param position
     */
    addComponent(component, position) {
        this.components.splice(position, 0, component);
    }

    /**
     * Removes a component at a position
     * @param {number} position
     */
    removeComponent(position){
        this.components.splice(position, 1);
    }

    get components() {
        return this._components;
    }


    set components(value) {
        this._components = value;
    }


    redraw() {
        this.createForm(this.components);
    }

    render(){
        const classComponents = this.components.map((component) => {
            return Components.createComponent(component, {}, {});
        });
        let formContainer = '<div class="form">';

        classComponents.forEach((classComponent) => {
            formContainer += classComponent.render();
        });
        formContainer += '</div>';
        return formContainer;
    }
}
