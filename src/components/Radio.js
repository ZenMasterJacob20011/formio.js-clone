import Template from '../templates/Template';
import Field from './_classes/Field';

export default class Radio extends Field {
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
    constructor(component, data, options) {
        super(component, data, options);
    }

    render(){
        return super.render(Template.renderTemplate('radio', this));
    }

    get defaultSchema(){
        return Radio.schema();
    }
}
