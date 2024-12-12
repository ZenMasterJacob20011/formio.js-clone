export default class Components {
    static components: {
        textfield: typeof TextField;
        button: typeof Button;
        textarea: typeof TextArea;
        number: typeof Number;
        password: typeof Password;
        checkbox: typeof Checkbox;
        selectboxes: typeof Selectboxes;
        select: typeof Select;
        radio: typeof Radio;
        tabs: typeof Tabs;
        component: typeof Component;
    };
    static _baseEditForm: typeof baseEditForm;
    /**
     * creates a new class given a component schema (factory for creating components)
     * @param {object} component the json schema of the component
     * @param {object?} options component options
     * @param {object?} data component data
     * @returns {import('../component/Component.js').Component | undefined} a component class object
     */
    static createComponent(component: object, options: object | null, data: object | null): import("../component/Component.js").Component | undefined;
    /**
     * converts an array of component objects to an array of component classes
     * @param {object[]} components the array of component JSON
     * @param {object} options options to be passed to each component created
     * @returns {import('../component/Component.js').Component[]} a list of class components
     */
    static convertComponentArrayToClassArray(components: object[], options: object): import("../component/Component.js").Component[];
    static get baseEditForm(): typeof baseEditForm;
    /**
     * gets builder info based on component type
     * @param {string} componentType the type of component
     * @returns {object} the class components builder info
     */
    static editInfo(componentType: string): object;
}
import TextField from '../../textfield/TextField.js';
import Button from '../../button/Button.js';
import TextArea from '../../textarea/TextArea.js';
import Number from '../../number/Number.js';
import Password from '../../password/Password.js';
import Checkbox from '../../checkbox/Checkbox.js';
import Selectboxes from '../../selectboxes/Selectboxes.js';
import Select from '../../select/Select.js';
import Radio from '../../radio/Radio.js';
import Tabs from '../../tabs/Tabs.js';
import Component from '../component/Component.js';
import baseEditForm from '../component/Component.form.js';
//# sourceMappingURL=Components.d.ts.map