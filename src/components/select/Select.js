import Field from '../_classes/field/Field.js';
import Template from '../../templates/Template.js';
import SelectForm from './Select.form.js';

export default class Select extends Field {
    static editInfo = SelectForm;

    static schema(...extend) {
        return Field.schema({
            label: 'Select',
            key: 'select',
            type: 'select',
            data: {
                values: [
                    {
                        label: 'a',
                        value: 'a'
                    },
                    {
                        label: 'b',
                        value: 'b'
                    }
                ]
            }
        }, ...extend);
    }

    static get builderInfo() {
        return {
            title: 'Select',
            group: 'basic',
            icon: 'tbd',
            schema: Select.schema()
        };
    }


    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Select.schema();
    }

    render() {
        return super.render(Template.renderTemplate('select', this));
    }
}
