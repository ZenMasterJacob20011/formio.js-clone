import NestedComponent from '../nestedcomponent/NestedComponent.js';

export default class NestedArrayComponent extends NestedComponent {
    static schema(...extend){
        return NestedComponent.schema({},...extend);
    }

    constructor(component, options, data) {
        super(component, options, data);
    }
}
