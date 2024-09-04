import Component from '../_classes/component/Component';
import Template from '../../templates/Template';
import ButtonForm from './Button.form';

export default class Button extends Component {

    static editInfo = ButtonForm;

    static schema(...extend) {
        return Component.schema({
            label: 'Submit',
            type: 'button',
            key: 'button',
        }, ...extend);
    }

    static get builderInfo() {
        return {
            title: 'Button',
            group: 'basic',
            icon: 'tbd',
            schema: Button.schema()
        };
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
