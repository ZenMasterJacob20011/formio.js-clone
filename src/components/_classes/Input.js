import Component from "./Component";
import Field from "./Field";

export default class Input extends Field {

    static schema(...extend) {
        return Field.schema({
            input: true
        }, ...extend)
    }

    /**
     *
     * @param {object} component
     * @param {object} options
     * @param {object} data
     */
    constructor(component, options, data) {
        super(component, options, data);
    }
}
