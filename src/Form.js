import Components from "./components/_classes/Components";

export class Form {
    /**
     * @param {HTMLElement} htmlContainer
     * @param {object[]} components
     * @param {object?} options
     */
    constructor(htmlContainer, options) {
        this.htmlContainer = htmlContainer
        this.options = options || {}
    }

    /**
     * will render the components into the container
     * @param {object[]} components
     */
    set setForm(components) {
        this.createForm(components)
    }

    /**
     * sets the inner html for the container htmlElement
     * @param {object[]} components
     */
    createForm(components) {
        const classComponents = components.map((component)=>{
            return Components.createComponent(component)
        })
        let formContainer = '<div class="form">'

        classComponents.forEach((classComponent) => {
            formContainer += classComponent.render()
        })
        formContainer += "</div>"
        this.htmlContainer.innerHTML = formContainer
    }
}
