import Input from './_classes/Input';

export default class Number extends Input {

    static schema(...extend) {
        return Input.schema({
            type: 'number',
            key: 'number',
            inputMask: '[0-9].*'
        },...extend);
    }

    get defaultSchema() {
        return Number.schema();
    }

    constructor(component, data, options) {
        super(component, data, options);
    }
}
