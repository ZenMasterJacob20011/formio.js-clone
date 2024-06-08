import TextField from './TextField';

export default class Password extends TextField {
    static schema(...extend) {
        return TextField.schema({
            type: 'password',
            key: 'password',
            label: 'Password'
        }, ...extend);
    }

    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Password.schema();
    }
}
