import Input from './_classes/Input';

export default class TextField extends Input {

    static schema(...extend){
        return Input.schema({
            label: 'Text Field',
            key: 'textField',
            type: 'textfield'
        },...extend);
    }

    /**
     * creates a new textfield component
     * @param {object} component
     * @param {object} options
     * @param {object} data
     */
    constructor(component, options, data) {
        super(component, options, data);
    }


    get defaultSchema() {
        return TextField.schema();
    }
}
