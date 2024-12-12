export default class Tabs extends NestedComponent {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        schema: any;
    };
    _tabs: any;
    currentTab: number;
    /**
     * Takes the parent container as element and attaches this.nestedKey and then loops through each tab and calls
     * attach components on each of the of
     * @param {HTMLElement} element the parent container
     */
    attach(element: HTMLElement): void;
    init(): void;
    tabs: any;
    render(): string;
    /**
     * sets the current tab
     * @param {number} index the index
     */
    setCurrentTab(index: number): void;
    get templateName(): string;
}
import NestedComponent from '../_classes/nestedcomponent/NestedComponent.js';
//# sourceMappingURL=Tabs.d.ts.map