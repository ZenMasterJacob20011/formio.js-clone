import TextField from '../../textfield/TextField';
import Button from '../../button/Button';
import TextArea from '../../textarea/TextArea';
import Number from '../../number/Number';
import Password from '../../password/Password';
import Checkbox from '../../checkbox/Checkbox';
import Selectboxes from '../../selectboxes/Selectboxes';
import Select from '../../select/Select';
import Radio from '../../radio/Radio';
import Tabs from '../../tabs/Tabs';
import baseEditForm from '../component/Component.form';

export default class Components {

    static _baseEditForm = baseEditForm;

    static components = {
        'textfield': TextField,
        'button': Button,
        'textarea': TextArea,
        'number': Number,
        'password': Password,
        'checkbox': Checkbox,
        'selectboxes': Selectboxes,
        'select': Select,
        'radio': Radio,
        'tabs': Tabs
    };


    /**
     * creates a new class given a component schema (factory for creating components)
     * @param {object} component the json schema of the component
     * @param {object?} options component options
     * @param {object?} data component data
     * @returns {import('../component/Component.js').Component | undefined} a component class object
     */
    static createComponent(component, options, data) {
        const componentType = component.type.toLowerCase();

        return new Components.components[componentType](component, options, data);

    }

    /**
     * converts an array of component objects to an array of component classes
     * @param {object[]} components the array of component JSON
     * @param {object} options options to be passed to each component created
     * @returns {import('../component/Component.js').Component[]} a list of class components
     */
    static convertComponentArrayToClassArray(components, options) {
        return components.map((component) => {
            return Components.createComponent(component, options);
        });
    }

    static get baseEditForm() {
        return this._baseEditForm;
    }

    /**
     * gets builder info based on component type
     * @param {string} componentType the type of component
     * @returns {object} the class components builder info
     */
    static editInfo(componentType) {
        return Components.components[componentType].editInfo();
    }
}
