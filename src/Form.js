export class Form {
    /**
     * @param {HTMLElement} htmlContainer
     * @param {object[]} components
     * @param {object?} options
     */
    constructor(htmlContainer, components, options) {
        this.htmlContainer = htmlContainer
        this.components = components
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
     */
    createForm() {
        this.components.map((component)=>{

        })

        this.htmlContainer.innerHTML =
    }

    render() {
        this.components.forEach()
    }
}
