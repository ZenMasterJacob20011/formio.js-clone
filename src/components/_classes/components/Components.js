import Component from '../component/Component.js';
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
import DataGrid from '../../datagrid/DataGrid.js';
import baseEditForm from '../component/Component.form.js';
import _ from 'lodash';

export default class Components {

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
        'tabs': Tabs,
        'component': Component,
        'datagrid': DataGrid
    };

    static _baseEditForm = baseEditForm();

    /**
     * creates a new class given a component schema (factory for creating components)
     * @param {object} component the json schema of the component
     * @param {object?} options component options
     * @param {object?} data component data
     * @param {object[]} components a reference to the list of component json
     * @returns {import('../component/Component.js').Component | undefined} a component class object
     */
    static createComponent(component, options, data, components) {
        const componentType = component.type.toLowerCase();
        const componentClass = new Components.components[componentType](component, options, data);
        componentClass.component.key = Components.uniquifyKey(componentClass.component, components);
        return componentClass;
    }

    /**
     * converts an array of component objects to an array of component classes
     * @param {object[]} components the array of component JSON
     * @param {object} options options to be passed to each component created
     * @returns {import('../component/Component.js').Component[]} a list of class components
     */
    static convertComponentArrayToClassArray(components, options) {
        components = components || [];
        return components.map((component) => {
            return Components.createComponent(component, options, undefined, components);
        });
    }

    static baseEditForm(extend) {
        return _.merge(_.cloneDeep(this._baseEditForm), extend);
    }

    /**
     * gets builder info based on component type
     * @param {string} componentType the type of component
     * @returns {object} the class components builder info
     */
    static editInfo(componentType) {
        return Components.components[componentType].editInfo();
    }

    /**
     * creates a unique key that doesn't collide with other components
     * @param {object} component the component json
     * @param {object[]} components the list of components json
     * @returns {string} a unique key
     */
    static uniquifyKey(component, components) {
        let cnt = 1;
        let uniqueKey = component.key;
        while (components.find((currentComponent) => {
            if (component.id !== currentComponent.id && uniqueKey === currentComponent.key) {
                return true;
            }
        })) {
            uniqueKey = component.key + String(cnt++);
        }
        return uniqueKey;
    }
}
