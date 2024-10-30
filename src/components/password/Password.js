import TextField from '../textfield/TextField.js';
import PasswordForm from './Password.form.js';


export default class Password extends TextField {
    static editInfo = PasswordForm;

    static schema(...extend) {
        return TextField.schema({
            type: 'password',
            key: 'password',
            label: 'Password'
        }, ...extend);
    }

    static get builderInfo() {
        return {
            title: 'Password',
            group: 'basic',
            icon: 'tbd',
            schema: Password.schema()
        };
    }


    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Password.schema();
    }
}
