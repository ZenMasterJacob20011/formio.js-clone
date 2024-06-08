import Input from './_classes/Input';
import Template from '../templates/Template';

export default class Selectboxes extends Input {
    static schema(...extend) {
        return Input.schema({
            type: 'selectboxes',
            label: 'selectboxes',
            key: 'selectboxes'
        }, ...extend);
    }

    constructor(component, data, options) {
        super(component, data, options);
    }

    render() {
        return Template.renderTemplate('selectboxes', this);
    }

    get defaultSchema() {
        return Selectboxes.schema();
    }
}
