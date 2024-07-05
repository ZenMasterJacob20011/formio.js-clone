import Form from './Form';
import FormBuilder from './FormBuilder';

export default class Formio {
    /**
     * creates a form and displays renders it in the htmlElement
     * @param {HTMLElement} htmlElement the container to put the form into
     * @param {object[]} components the components of the form
     * @param {object?} options options for the form
     */
    static createForm(htmlElement, components, options) {
        const form = new Form(htmlElement, components.components, options);
        form.createForm();
    }

    /**
     * creates a form builder
     * @param {HTMLElement} htmlElement the container element for the form builder
     * @param {object} data the data for the form builder
     * @param {object} options options for the form builder
     */
    static builder(htmlElement, data, options) {
        Formio._data = data;
        Formio._options = options;
        const formContainer = document.createElement('div');
        const formBuilder = new FormBuilder(htmlElement, options, new Form(formContainer, [{type: 'button'}]));
        formBuilder.setBuilder = data;
    }

}
