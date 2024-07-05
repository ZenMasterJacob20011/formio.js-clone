import Field from './Field';
import Template from '../../templates/Template';

export default class Input extends Field {

    static schema(...extend) {
        return Field.schema({
            input: true,
        }, ...extend);
    }

    /**
     *
     * @param {object} component the json schema of the component
     * @param {object} options component options
     * @param {object} data component data
     */
    constructor(component, options, data) {
        super(component, options, data);
    }


    render() {
        return super.render(Template.renderTemplate('input', this));
    }
}
