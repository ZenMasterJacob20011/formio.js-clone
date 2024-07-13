
import TextFieldForm from './TextField.form';
import Input from '../_classes/input/Input';

export default class TextField extends Input {

    static schema(...extend){
        return Input.schema({
            label: 'Text Field',
            key: 'textField',
            type: 'textfield'
        },...extend);
    }

    static builderInfo = TextFieldForm;

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
