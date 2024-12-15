import Component from '../component/Component.js';
import Template from '../../../templates/Template.js';

export default class NestedComponent extends Component {

    static schema(...extend) {
        return Component.schema({}, ...extend);
    }

    constructor(component, options, data) {
        super(component, options, data);
    }

    attach(element) {
        super.attach(element);
        this.loadRefs(element, {
            [this.nestedKey]: 'single'
        });
        this.options.parent = this;
        this.attachComponents(this.element, this.components);
    }

    /**
     * Calls attach on an array of components
     * @param {HTMLElement} element the parent container
     * @param {Component[]} components the components to call attach on
     */
    attachComponents(element, components) {
        const refComponents = element.querySelectorAll('[ref="component"]');
        components.forEach((component, index) => {
            component.attach(refComponents.item(index));
        });
    }

    get components() {
        return this._components;
    }

    get formioContainer() {
        return this.element.querySelector('[ref*="-container"]').formioContainer;
    }

    get nestedKey() {
        return `nested-${this.component.key}`;
    }


    redraw() {
        const index = this.getComponentIndex();
        // Redrawing of the form
        this.element.outerHTML = this.render();
        // Reattach this.element
        this.element = this.parent.element.querySelector('[ref*="-container"]').children.item(index);
        this.attach(this.element);
    }

    render(html) {
        return super.render(html || Template.renderTemplate(this.templateName, {
            children: html
        }));
    }

    /**
     * renders a list of components wrapped in components template
     * @param {Component[]} components the components to be rendered
     * @returns {string} the html of the components wrapped in components template
     */
    renderComponents(components) {
        let children = components.map((component) => {
            return component.render();
        });
        return Template.renderTemplate('components', {
            children: children,
            components: components,
            containerType: this.component.type,
            builderMode: this.options.builderMode
        });
    }


    /**
     * sets the submission for each component based on the submission data
     * @param {object} submissionData the key value pairs to set the submission to
     */
    set submission(submissionData) {
        this.components.forEach((component) => {
            component.submission = submissionData;
        });
    }


}
