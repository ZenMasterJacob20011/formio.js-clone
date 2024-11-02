import Form from './Form.js';
import FormBuilder from './FormBuilder.js';

export default class Formio {
    // Keeps track of all forms in Formio object
    static form = {};

    /**
     * creates a form and displays renders it in the htmlElement
     * @param {HTMLElement} htmlElement the container to put the form into
     * @param {{components: object[]}} form the components of the form
     * @param {object?} options options for the form
     * @returns {Promise<Form>} a form promise
     */
    static async createForm(htmlElement, form, options) {
        const formClass = new Form(htmlElement, form.components, options);
        formClass.createForm();
        return formClass;
    }

    /**
     * creates a form builder
     * @param {HTMLElement} htmlElement the container element for the form builder
     * @param {object} data the data for the form builder
     * @param {object} options options for the form builder
     * @returns {Promise<FormBuilder>} The form builder object
     */
    static async builder(htmlElement, data, options) {
        Formio._data = data;
        Formio._options = options;
        const formBuilder = new FormBuilder(htmlElement, options);
        formBuilder.setBuilder = data;
        Formio.form[formBuilder.form.id] = formBuilder.form;
        return formBuilder;
    }
}
