import TextFieldForm from './TextField.form.js';
import Input from '../_classes/input/Input.js';

export default class TextField extends Input {

    static editInfo = TextFieldForm;

    static schema(...extend) {
        return Input.schema({
            label: 'Text Field',
            key: 'textField',
            type: 'textfield'
        }, ...extend);
    }


    static get builderInfo() {
        return {
            title: 'Text Field',
            group: 'basic',
            icon: 'terminal',
            schema: TextField.schema()
        };
    }

    /**
     * creates a new textfield component
     * @param {object} component the json schema of the component
     * @param {object} options component options
     * @param {object} data component data
     */
    constructor(component, options, data) {
        super(component, options, data);
    }


    get defaultSchema() {
        return TextField.schema();
    }
}
