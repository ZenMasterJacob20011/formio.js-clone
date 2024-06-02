import _ from 'lodash'

export default class Component {

    static schema(...sources) {
        return _.merge({
            placeholder: ''
        }, ...sources)
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
        this.component = this.mergeSchema(component || {})
    }

    get defaultSchema(){
        return Component.schema()
    }



    mergeSchema(component) {
        return _.defaultsDeep(component, this.defaultSchema)
    }

    /**
     * return the html of a component
     * @param {string} html
     * @return {string}
     */
    render(html) {
        return html
    }
}
