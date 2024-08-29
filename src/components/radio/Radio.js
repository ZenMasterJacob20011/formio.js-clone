import Field from '../_classes/field/Field';
import Template from '../../templates/Template';
import RadioForm from './Radio.form';


export default class Radio extends Field {
    static editInfo = RadioForm;

    static schema(...extend) {
        return Field.schema({
            type: 'radio',
            key: 'radio',
            label: 'Radio',
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
        }, ...extend);
    }

    static get builderInfo() {
        return {
            title: 'Radio',
            group: 'basic',
            icon: 'tbd',
            schema: Radio.schema()
        };
    }


    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Radio.schema();
    }

    render() {
        return super.render(Template.renderTemplate('radio', this));
    }
}
