import Component from '../component/Component';
import Template from '../../../templates/Template';
import Components from '../components/Components';

export default class NestedComponent extends Component {

    static schema(...extend) {
        return Component.schema({}, ...extend);
    }

    constructor(component, options, data) {
        super(component, options, data);
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

    attach(element) {
        super.attach(element);
        this.loadRefs(element, {
            [this.nestedKey]: 'single'
        });
    }

    /**
     * Calls attach on an array of components
     * @param {HTMLElement} element the parent container
     * @param {Component[]} components the components to call attach on
     */
    attachComponents(element, components) {
        const dragComponents = element.querySelectorAll('[ref="dragComponent"]');
        components.forEach((component, index) => {
            component.attach(dragComponents.item(index));
        });
    }

    addComponent(component, position) {
        if (Object.getPrototypeOf(component) === Object.prototype) {
            this.components.splice(position, 0, Components.createComponent(component, this.options));
            return;
        }
        this.components.splice(position, 0, component);
    }

    get nestedKey() {
        return `nested-${this.component.key}`;
    }
}
