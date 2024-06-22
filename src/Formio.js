import {Form} from './Form';
import FormBuilder from './FormBuilder';

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

    /**
     * creates a form builder
     * @param {HTMLElement} htmlElement
     * @param {object} data
     * @param {object} options
     */
    static builder(htmlElement, data, options){
        Formio._data = data;
        Formio._options = options;
        const formBuilder = new FormBuilder(htmlElement, options);
        formBuilder.setBuilder = data;
    }

}
