import Input from "./_classes/Input";
import Template from "../Template";

export default class TextArea extends Input {

    static schema(...extend) {
        return Input.schema({
            label: "Text Area",
            key: "textArea",
            type: "textarea"
        }, ...extend)
    }

    constructor(component, options, data) {
        super(component, options, data);
    }

    render(html) {
        return super.render(Template.renderTemplate('textarea', this.component));
    }

    get defaultSchema() {
        return TextArea.schema();
    }
}
