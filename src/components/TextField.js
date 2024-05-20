import Component from "./_classes/Component.js";

export default class TextField extends Component {
    constructor(schema) {
        super(schema);
        this.type = 'textfield';
        this.label = 'Text Field'
        this.key = 'textfield';

    }


    render() {
        return super.render(`
            <div class="component">
                <div>
                    <label class="form-label">${this.label}</label>
                </div>
                <div>
                    <input type="text" class="form-control">
                </div>
            </div>
        `)
    }
}
