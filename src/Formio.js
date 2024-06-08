import {Form} from './Form';

export default class Formio {
    /**
     * creates a form and displays renders it in the htmlElement
     * @param {HTMLElement} htmlElement
     * @param {object} components
     * @param {object?} options
     */
    static createForm(htmlElement, components, options) {
        const form = new Form(htmlElement, options);
        form.setForm = components.components;
    }
}
