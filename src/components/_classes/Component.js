import _ from 'lodash';
import {getRandomComponentId} from '../../utils/utils';

export default class Component {

    static schema(...sources) {
        return _.merge({
            placeholder: ''
        }, ...sources);
    }

    /**
     *
     * @param {object} component
     * @param {object} options
     * @param {object} data
     */
    constructor(component, options, data) {
        this._options = options;
        this._data = data;
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
     *
     * @param {object} component
     * @return {object}
     */
    mergeSchema(component) {
        return _.defaultsDeep(component, this.defaultSchema);
    }

    /**
     * return the html of a component
     * @param {string} html
     * @return {string}
     */
    render(html) {
        return html;
    }
}
