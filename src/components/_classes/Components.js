import TextField from '../TextField';
import Button from '../Button';
import TextArea from '../TextArea';
import Number from '../Number';
import Password from '../Password';
import Checkbox from '../Checkbox';
import Selectboxes from '../Selectboxes';
import Select from '../Select';
import Radio from '../Radio';
import Component from './Component';

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
        'radio': Radio
    };


    /**
     * creates a new class given a component schema (factory for creating components)
     * @param {object} component the json schema of the component
     * @param {object?} options component options
     * @param {object?} data component data
     * @returns {Component | undefined} a component class object
     */
    static createComponent(component, options, data) {
        const componentType = component.type.toLowerCase();

        return new Components.components[componentType](component, options, data);

    }

    /**
     * converts an array of component objects to an array of component classes
     * @param {object[]} components the array of component JSON
     * @returns {Component[]} a list of class components
     */
    static convertComponentArrayToClassArray(components) {
        return components.map((component) => {
            return Components.createComponent(component);
        });
    }
}
