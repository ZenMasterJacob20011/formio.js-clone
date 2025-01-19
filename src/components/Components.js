import _ from 'lodash';
import baseEditForm from './_classes/component/Component.form.js';
import components from './index.js';

export default class Components {

    static _baseEditForm = baseEditForm();

    static components = components;
    
    /**
     * creates a new class given a component schema (factory for creating components)
     * @param {object} component the json schema of the component
     * @param {object?} options component options
     * @param {object?} data component data
     * @param {object[]} components a reference to the list of component json
     * @returns {import('./_classes/component/Component.js').Component | undefined} a component class object
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
     * @returns {import('./_classes/component/Component.js').Component[]} a list of class components
     */
    static convertComponentArrayToClassArray(components, options) {
        components = components || [];
        return components.map((component) => {
            return Components.createComponent(component, options, undefined, components);
        });
    }

    /**
     * Creates an extended base edit form
     * @param {object[]} extend An array of tabs
     * @returns {object[]} an extended base edit form
     */
    static baseEditForm(extend) {
        const baseEditFormClone = _.cloneDeep(this._baseEditForm);
        return baseEditFormClone.map((tab) => {
            const extendTab = _.find(extend, (obj) => {
                return obj.key === tab.key;
            });
            if(extendTab && extendTab.components) {
                tab.components.push(...extendTab.components);
            }
            return tab;
        });
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
