import TextField from '../textfield/TextField';
import PasswordForm from './Password.form';


export default class Password extends TextField {
    static schema(...extend) {
        return TextField.schema({
            type: 'password',
            key: 'password',
            label: 'Password'
        }, ...extend);
    }
    static builderInfo = PasswordForm;
    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Password.schema();
    }
}
