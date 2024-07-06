import Form from './Form';
import FormBuilder from './FormBuilder';
import Components from './components/_classes/Components';
import Button from './components/Button';

export default class Formio {
    /**
     * creates a form and displays renders it in the htmlElement
     * @param {HTMLElement} htmlElement the container to put the form into
     * @param {{components: object[]}} form the components of the form
     * @param {object?} options options for the form
     */
    static createForm(htmlElement, form, options) {
        const formClass = new Form(htmlElement, Components.convertComponentArrayToClassArray(form.components), options);
        formClass.createForm();
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
        const formBuilder = new FormBuilder(htmlElement, options, new Form(formContainer, [new Button()]));
        formBuilder.setBuilder = data;
    }

}
