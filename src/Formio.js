import TextField from "./components/TextField.js";

export default class Formio {
    /**
     * creates a form and displays renders it in the htmlElement
     * @param {HTMLElement} htmlElement
     * @param {{components: Component[]}} formJSON
     */
    static createForm(htmlElement, formJSON) {

        htmlElement.innerHTML = this.renderTemplate(formJSON.components)
    }

    /**
     *
     * @param {Component[]} components
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
}
