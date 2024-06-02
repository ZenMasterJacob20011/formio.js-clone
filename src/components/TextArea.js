import Input from './_classes/Input';

export default class TextArea extends Input {

    static schema(...extend) {
        return Input.schema({
            label: 'Text Area',
            key: 'textArea',
            type: 'textarea'
        }, ...extend)
    }

    constructor(component, options, data) {
        super(component, options, data);
    }

    get defaultSchema() {
        return TextArea.schema();
    }
}
