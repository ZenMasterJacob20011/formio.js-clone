import _ from 'lodash';
import {getRandomComponentId} from '../../../utils/utils.js';
import editInfo from './Component.form.js';

export default class Component {

    static editInfo = editInfo;

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
        this.component._id = this.component.id || getRandomComponentId();
        this.refs = {};
    }

    get dataValue() {
        this._dataValue = this.refs.input.value;
        return this._dataValue;
    }

    set dataValue(value) {
        this._dataValue = value;
    }

    get submission() {
        return this.dataValue;
    }

    /**
     * sets the submission for the component
     * @param {object} submissionData the submission data
     */
    set submission(submissionData) {
        const value = submissionData[this.component.key];
        this.setValue(value);
    }

    /**
     * attaches functions to component element
     * @param {HTMLElement} element the element to attach to
     */
    attach(element) {
        this.loadRefs(element, {
            messageContainer: 'single',
        });
        this.parent = element.parentElement;
        this.hook('attachComponent', element, this);

        this.element = element;
    }

    get defaultSchema() {
        return Component.schema();
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

    get id() {
        return this.component._id;
    }

    /**
     * gives the class refs instance variable to access references
     * @param {HTMLElement} element the element to get the references from
     * @param {object} refs the list of references
     */
    loadRefs(element, refs) {
        for (const ref in refs) {
            if (refs[ref] === 'multiple') {
                let htmlCollection = [];
                element.querySelectorAll(`[ref='${ref}']`).forEach((item) => {
                    htmlCollection.push(item);
                });
                this.refs[ref] = htmlCollection;
            } else {
                this.refs[ref] = element.querySelector(`[ref='${ref}']`);
            }
        }
    }

    /**
     * merges the static schemas with the component json
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
        return this.hook('renderComponent', `<div ref="component" class="component formio-component-${this.component.type}" id="${this.id}">${html}</div>`, this);
    }


    /**
     * sets the value for the component
     * @param {number | string | object} value the value to be set
     */
    setValue(value) {
        this.dataValue = value;
        if(typeof value === 'object'){
            value = JSON.stringify(value, null, 2);
        }
        this.refs.input.value = value;
    }


}
