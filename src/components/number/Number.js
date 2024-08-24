import NumberForm from './Number.form';
import Input from '../_classes/input/Input';


export default class Number extends Input {

    static editInfo = NumberForm;

    static schema(...extend) {
        return Input.schema({
            type: 'number',
            key: 'number',
            label: 'Number',
            inputMask: '[0-9].*'
        }, ...extend);
    }

    static get builderInfo() {
        return {
            title: 'Number',
            group: 'basic',
            icon: 'tbd',
            schema: Number.schema()
        };
    }


    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Number.schema();
    }


}
