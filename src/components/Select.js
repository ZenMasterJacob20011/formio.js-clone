import Field from './_classes/Field';
import Template from '../templates/Template';

export default class Select extends Field {
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

    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Select.schema();
    }

    render(){
        return super.render(Template.renderTemplate('select', this));
    }
}
