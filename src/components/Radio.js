import Input from './_classes/Input';
import Template from '../templates/Template';

export default class Radio extends Input {
    static schema(...extend) {
        return Input.schema({
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
        return Template.renderTemplate('radio', this);
    }

    get defaultSchema(){
        return Radio.schema();
    }
}
