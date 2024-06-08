import Component from './Component';

export default class Field extends Component {

    static schema(...extend) {
        return Component.schema({}, ...extend);
    }

    constructor(component, options, data) {
        super(component, options, data);
    }


    render(html) {
        return super.render(html);
    }
}
