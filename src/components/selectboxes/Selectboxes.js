import Field from '../_classes/field/Field';
import Template from '../../templates/Template';
import SelectboxesForm from './Selectboxes.form';


export default class Selectboxes extends Field {
    static editInfo = SelectboxesForm;

    static schema(...extend) {
        return Field.schema({
            type: 'selectboxes',
            label: 'selectboxes',
            key: 'selectboxes',
            values: [{label: 'a', value: 'a'}, {label: 'b', value: 'b'}]
        }, ...extend);
    }


    static get builderInfo() {
        return {
            title: 'Select Boxes',
            group: 'basic',
            icon: 'tbd',
            schema: Selectboxes.schema()
        };
    }

    constructor(component, data, options) {
        super(component, data, options);
    }

    get defaultSchema() {
        return Selectboxes.schema();
    }

    render() {
        return super.render(Template.renderTemplate('selectboxes', this));
    }


}
