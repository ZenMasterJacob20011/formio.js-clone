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
            components: components
        });
    }

    attach(element) {
        super.attach(element);
        this.loadRefs(element, {
            [this.nestedKey]: 'single'
        });
        const nestedComponentRef = this.refs[this.nestedKey];
        this.components.forEach((component) => {
            component.attach(nestedComponentRef);
        });
        if(this.options.builderMode){
            this.hook('attachDragula', element, this.component.components);
        }
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
