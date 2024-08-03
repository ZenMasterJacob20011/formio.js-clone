import NestedComponent from '../_classes/nestedcomponent/NestedComponent';
import Template from '../../templates/Template';
import Components from '../_classes/components/Components';

export default class Tabs extends NestedComponent {
    static schema(...extend) {
        return NestedComponent.schema({
            type: 'tabs',
            key: 'tabs',
            label: 'Tabs',
            components: [
                {
                    key: 'tab1',
                    label: 'Tab 1',
                    components: []
                }
            ]
        }, ...extend);
    }

    static get builderInfo(){
        return {
            title: 'Tabs',
            group: 'layout',
            icon: 'tbd',
            schema: Tabs.schema()
        };
    }

    constructor(component, options, data) {
        super(component, options, data);
        this.tabs = this.component.components || [];
    }

    get defaultSchema() {
        return Tabs.schema();
    }

    render() {
        return super.render(Template.renderTemplate('tabs', {
            tabKey: this.component.key,
            tabComponents: this.tabs.map(tab => this.renderComponents(Components.convertComponentArrayToClassArray(tab.components))),
            componentContext: this
        }));
    }

    /**
     * Takes the parent container as element and attaches this.nestedKey and then loops through each tab and calls
     * attach components on each of the of
     * @param {HTMLElement} element the parent container
     */
    attach(element) {
        super.attach(element);
        this.loadRefs(element, {
            [this.nestedKey]: 'single',
            'tabsContainer': 'multiple'
        });
        this.refs['tabsContainer'].forEach((container, index) => {
            container.formioContainer = this.tabs[index].components;
            this.hook('attachDragula', container);
        });
    }

    get templateName() {
        return 'tabs';
    }
}
