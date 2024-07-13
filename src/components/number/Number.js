import NumberForm from './Number.form';
import Input from '../_classes/input/Input';


export default class Number extends Input {

    static schema(...extend) {
        return Input.schema({
            type: 'number',
            key: 'number',
            label: 'Number',
            inputMask: '[0-9].*'
        },...extend);
    }
    static builderInfo = NumberForm;

    get defaultSchema() {
        return Number.schema();
    }

    constructor(component, data, options) {
        super(component, data, options);
    }
}
