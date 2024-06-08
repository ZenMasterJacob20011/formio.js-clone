import Components from './components/_classes/Components';
import Inputmask from 'inputmask';

export class Form {
    /**
     * @param {HTMLElement} htmlContainer
     * @param {object?} options
     */
    constructor(htmlContainer, options) {
        this.htmlContainer = htmlContainer;
        this.options = options || {};
    }

    /**
     * will render the components into the container
     * @param {object[]} components
     */
    set setForm(components) {
        this.createForm(components);
    }

    /**
     * sets the inner html for the container htmlElement
     * @param {object[]} components
     */
    createForm(components) {
        /** @type {Component[]}*/
        let componentsWithInputMasks = [];
        const classComponents = components.map((component) => {
            return Components.createComponent(component, {}, {});
        });
        let formContainer = '<div class="form">';

        classComponents.forEach((classComponent) => {
            formContainer += classComponent.render();
            if (classComponent.component.inputMask) {
                componentsWithInputMasks.push(classComponent);
            }
        });
        formContainer += '</div>';
        this.htmlContainer.innerHTML = formContainer;
        componentsWithInputMasks.forEach((component) => {
            let inputMask = new Inputmask(component.component.inputMask);
            inputMask.mask(document.getElementById(component.id));
        });
    }
}
