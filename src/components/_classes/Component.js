import _ from 'lodash';
import {getRandomComponentId} from '../../utils/utils';

export default class Component {

    static schema(...sources) {
        return _.merge({
            placeholder: ''
        }, ...sources);
    }

    /**
     * creates a new component
     * @param {object} component the component json
     * @param {object} options options
     * @param {object} data data
     */
    constructor(component, options, data) {
        this.options = options || {};
        this.data = data;
        this.component = this.mergeSchema(component || {});
        this.component._id = getRandomComponentId();
    }

    get defaultSchema() {
        return Component.schema();
    }

    get id() {
        return this.component._id;
    }

    /**
     * f
     * @param {object} component the component to merge
     * @returns {object} the merged component object
     */
    mergeSchema(component) {
        return _.defaultsDeep(component, this.defaultSchema);
    }

    /**
     * return the html of a component
     * @param {string} html the html to be wrapped
     * @returns {string} the html to be rendered
     */
    render(html) {
        return this.hook('renderComponent', `<div class="component formio-component-${this.component.type}" id="${this.id}">${html}</div>`, this);
    }

    hook() {
        const name = arguments[0];
        if (this.options &&
            this.options.hooks &&
            this.options.hooks[name]) {
            return this.options.hooks[name].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        return arguments[1];
    }
}
