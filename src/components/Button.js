import Component from './_classes/Component';
import Template from '../templates/Template';

export default class Button extends Component {

    static schema(...extend){
        return Component.schema({
            label: 'Submit',
            type: 'button',
            key: 'button',
        },...extend);
    }

    constructor(component, options, data) {
        super(component, options, data);
    }


    get defaultSchema() {
        return Button.schema();
    }

    render() {
        return super.render(Template.renderTemplate('button', this));
    }
}
