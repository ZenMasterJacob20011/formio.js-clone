export default class Component {
    /**
     *
     * @param {string} type
     * @param {string} key
     */
    constructor(type, key) {
        this.type = type
        this.key = key
    }

    /**
     * return the html of a component
     * @param {string} html
     * @return {string}
     */
    render(html) {
        return html
    }
}
