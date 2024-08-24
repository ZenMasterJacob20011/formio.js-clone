
import TextAreaForm from './TextArea.form';
import Input from '../_classes/input/Input';

export default class TextArea extends Input {

    static editInfo = TextAreaForm;
static schema(...extend) {
        return Input.schema({
            label: 'Text Area',
            key: 'textArea',
            type: 'textarea'
        }, ...extend);
    }

    static get builderInfo(){
        return {
            title: 'Text Area',
            group: 'basic',
            icon: 'tbd',
            schema: TextArea.schema()
        };
    }

    

    constructor(component, options, data) {
        super(component, options, data);
    }

    get defaultSchema() {
        return TextArea.schema();
    }
}
