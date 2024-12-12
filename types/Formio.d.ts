export default class Formio {
    static forms: {};
    /**
     * creates a form and displays renders it in the htmlElement
     * @param {HTMLElement} htmlElement the container to put the form into
     * @param {{components: object[]}} form the components of the form
     * @param {object?} options options for the form
     * @returns {Promise<Form>} a form promise
     */
    static createForm(htmlElement: HTMLElement, form: {
        components: object[];
    }, options: object | null): Promise<Form>;
    /**
     * creates a form builder
     * @param {HTMLElement} htmlElement the container element for the form builder
     * @param {object} form the form for the form builder
     * @param {object} options options for the form builder
     * @returns {Promise<FormBuilder>} The form builder object
     */
    static builder(htmlElement: HTMLElement, form: object, options: object): Promise<FormBuilder>;
    /**
     * adds plugin to formio
     * @param {{components: any, providers: any, templates: any}} plugin the plugin to be used
     */
    static use(plugin: {
        components: any;
        providers: any;
        templates: any;
    }): void;
}
import Form from './Form.js';
import FormBuilder from './FormBuilder.js';
//# sourceMappingURL=Formio.d.ts.map