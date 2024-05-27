import TextField from "../TextField";
import Button from "../Button";
import TextArea from "../TextArea";

export default class Components {

    static components = {
        'textfield': TextField,
        'button': Button,
        'textarea': TextArea
    }


    /**
     * creates a new class given a component schema
     * @param {object} component
     * @return {Component || undefined}
     */
    static createComponent(component, options, data) {
        const componentType = component.type.toLowerCase()

        return new this.components[componentType](component, options, data);

    }
}
