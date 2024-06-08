import Input from './_classes/Input';
import Template from '../templates/Template';

export default class Checkbox extends Input {
    static schema(...extend) {
        return Input.schema({
            type: 'checkbox',
            key: 'checkbox',
            label: 'checkbox'
        }, ...extend);
    }

    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Checkbox.schema();
    }

    render(){
        return Template.renderTemplate('checkbox', this);
    }
}
