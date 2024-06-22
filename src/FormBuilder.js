import Template from './templates/Template';
import Button from './components/Button';

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
        const submitButton = new Button({},{},{});
        return Template.renderTemplate('formbuilder', {
            formbuildersidebar: Template.renderTemplate('formbuildersidebar', {

            }),
            form: Template.renderTemplate('formbuilderform', {
                submitButton: submitButton.render()
            })
        });
    }
}
