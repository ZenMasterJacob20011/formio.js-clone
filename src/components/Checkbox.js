import Template from '../templates/Template';
import Field from './_classes/Field';

export default class Checkbox extends Field {
    static schema(...extend) {
        return Field.schema({
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
        return super.render(Template.renderTemplate('checkbox', this));
    }
}
