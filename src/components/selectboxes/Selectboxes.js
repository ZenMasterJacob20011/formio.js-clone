import Field from '../_classes/field/Field';
import Template from '../../templates/Template';
import SelectboxesForm from './Selectboxes.form';


export default class Selectboxes extends Field {
    static schema(...extend) {
        return Field.schema({
            type: 'selectboxes',
            label: 'selectboxes',
            key: 'selectboxes',
            values: [{label: 'a', value: 'a'}, {label: 'b', value: 'b'}]
        }, ...extend);
    }

    static builderInfo = SelectboxesForm;

    constructor(component, data, options) {
        super(component, data, options);
    }

    render() {
        return super.render(Template.renderTemplate('selectboxes', this));
    }

    get defaultSchema() {
        return Selectboxes.schema();
    }
}
