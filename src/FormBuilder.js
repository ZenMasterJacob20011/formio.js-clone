import Template from './templates/Template';

export default class FormBuilder {

    /**
     * Constructor for form builder
     * @param {HTMLElement} htmlContainer
     * @param {object} options
     */
    constructor(htmlContainer, options) {
        this.htmlContainer = htmlContainer;
        this._options = options;
    }


    set setBuilder(data) {
        this.createBuilder();
    }

    createBuilder() {
        this.htmlContainer.innerHTML = this.render();
    }

    /**
     * renders the form builder
     */
    render() {
        return Template.renderTemplate('formbuilder', this);
    }
}
