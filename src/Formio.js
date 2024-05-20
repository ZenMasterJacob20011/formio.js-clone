import TextField from "./components/TextField.js";
import {Form} from "./Form.js";

export default class Formio {
    /**
     * creates a form and displays renders it in the htmlElement
     * @param {HTMLElement} htmlElement
     * @param {{components: object[]}} formJSON
     */
    static createForm(htmlElement, formJSON) {
        const componentsClassList = []

        for (const componentJSON of formJSON.components) {
            componentsClassList.push(this.convertObjectToClass(componentJSON))
        }
        const form = new Form(componentsClassList)
        htmlElement.innerHTML = form.render()
    }

    /**
     *
     * @param {object[]} components
     * @return {string} an html template string
     */
    static renderTemplate(components) {
        let form = "<div class='components'>"
        components.forEach((component) => {
            if (component.type === 'textfield') {
                const myTextField = new TextField(component)
                form += myTextField.render()
                return
            }
            form += `Unknown component: ${component.type}`
        })
        form += "</div>"
        return form
    }

    /**
     * Converts the component.type to its class object representation
     * @param {object} componentJSON
     */
    static convertObjectToClass(componentJSON) {
        if (componentJSON.type === 'textfield') {
            return new TextField(componentJSON)
        }
    }
}
