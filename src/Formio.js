import Form from './Form.js';
import FormBuilder from './FormBuilder.js';
import Components from './components/Components.js';
import Template from './templates/Template.js';

export default class Formio {
    // Keeps track of all forms in Formio object
    static forms = {};

    /**
     * creates a form and displays renders it in the htmlElement
     * @param {HTMLElement} htmlElement the container to put the form into
     * @param {{components: object[]}} form the components of the form
     * @param {object?} options options for the form
     * @returns {Promise<Form>} a form promise
     */
    static async createForm(htmlElement, form, options) {
        if (typeof form === 'string') {
            try {
                const response = await fetch(form);
                form = await response.json();
            } catch (err) {
                throw Error(err);
            }
        }
        const formClass = new Form(htmlElement, form, options);
        formClass.createForm();
        return formClass;
    }

    /**
     * creates a form builder
     * @param {HTMLElement} htmlElement the container element for the form builder
     * @param {object} form the form for the form builder
     * @param {object} options options for the form builder
     * @returns {Promise<FormBuilder>} The form builder object
     */
    static async builder(htmlElement, form, options) {
        const formBuilder = new FormBuilder(htmlElement, options);
        formBuilder.setBuilder = form;
        return formBuilder;
    }

    /**
     * adds plugin to formio
     * @param {{components: any, providers: any, templates: any}} plugin the plugin to be used
     */
    static use(plugin) {
        for (const component in plugin.components){
            Components.components[component] = plugin.components[component];
        }
        for (const template in plugin.templates){
            Template.templates[template] = plugin.templates[template];
        }
    }
}
