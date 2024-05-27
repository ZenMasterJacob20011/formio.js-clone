import Component from "./_classes/Component.js";
import Template from "../Template";

export default class TextField extends Component {
    /**
     * creates a new textfield component
     * @param {string} type
     * @param {string} key
     */
    constructor(type, key) {
        super(type, key);
    }

    /**
     * return the html of the textfield component
     * @param {string} html
     * @return {string}
     */
    render(html) {
        return super.render(Template.renderTemplate('textfield', this))
    }
}
