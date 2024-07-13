import Inputmask from 'inputmask/lib/inputmask.js';
import Component from './components/_classes/Component';
import Components from './components/_classes/Components';

export default class Form {
    /**
     * @param {HTMLElement} htmlContainer the container the form will go into
     * @param {Component[]?} components the components of the form
     * @param {object?} options options for the form
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
     * @param {object | Component} component the component to be added
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

    get components() {
        return this._components;
    }


    set components(value) {
        this._components = value;
    }


    redraw() {
        this.createForm(this.components);
    }

    render() {
        let formContainer = '<div class="form">';

        this.components.forEach((classComponent) => {
            formContainer += classComponent.render();
        });
        formContainer += '</div>';
        return formContainer;
    }
}
