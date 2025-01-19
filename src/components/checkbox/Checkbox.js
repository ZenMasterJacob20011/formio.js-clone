import Template from '../../templates/Template.js';
import Field from '../_classes/field/Field.js';
import CheckboxForm from './Checkbox.form.js';

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

    get dataValue() {
        this._dataValue = this.refs.input.checked;
        return this._dataValue;
    }

    set dataValue(value) {
        super.dataValue = value;
    }

    attach(element) {
        this.loadRefs(element, {'input': 'single'});
        super.attach(element);
    }

    get defaultSchema() {
        return Checkbox.schema();
    }


    render() {
        return super.render(Template.renderTemplate('checkbox', this));
    }

    setValue(value) {
        super.setValue(value);
        this.refs.input.checked = value;
    }
}
