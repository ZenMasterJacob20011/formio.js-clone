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
                },
                {
                    key: 'tab2',
                    label: 'Tab 2',
                    components: []
                }
            ]
        }, ...extend);
    }

    static get builderInfo() {
        return {
            title: 'Tabs',
            group: 'layout',
            icon: 'tbd',
            schema: Tabs.schema()
        };
    }

    init() {
        this.tabs = this._tabs.map((tab) => Components.convertComponentArrayToClassArray(tab.components, this.options));
    }

    constructor(component, options, data) {
        super(component, options, data);
        this._tabs = this.component.components || [];
        this.currentTab = 0;
    }

    get defaultSchema() {
        return Tabs.schema();
    }

    render() {
        this.init();
        return super.render(Template.renderTemplate('tabs', {
            tabKey: this.component.key,
            tabComponents: this.tabs.map(tab => this.renderComponents(tab)),
            componentContext: this,
            currentTab: this.currentTab
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
            'tabs-container': 'multiple',
            'tab-link': 'multiple'
        });
        this.refs['tabs-container'].forEach((container, index) => {
            container.formioContainer = this._tabs[index].components;
            container.component = this;
            this.hook('attachDragula', container);
        });
        this.refs['tab-link'].forEach((element, index) => {
            element.addEventListener('click', this.setCurrentTab.bind(this, index));
        });
        this.tabs.forEach((tab) => {
            this.attachComponents(element, tab);
        });
    }

    get templateName() {
        return 'tabs';
    }

    /**
     * sets the current tab
     * @param {number} index the index
     */
    setCurrentTab(index){
        this.currentTab = index;
    }
}
