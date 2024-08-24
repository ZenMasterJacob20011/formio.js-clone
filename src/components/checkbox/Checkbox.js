import Template from '../../templates/Template';
import Field from '../_classes/field/Field';
import CheckboxForm from './Checkbox.form';

export default class Checkbox extends Field {
    static editInfo = CheckboxForm;

    static schema(...extend) {
        return Field.schema({
            type: 'checkbox',
            key: 'checkbox',
            label: 'checkbox'
        }, ...extend);
    }

    static get builderInfo() {
        return {
            title: 'Checkbox',
            group: 'basic',
            icon: 'tbd',
            schema: Checkbox.schema()
        };
    }


    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Checkbox.schema();
    }

    render() {
        return super.render(Template.renderTemplate('checkbox', this));
    }
}
