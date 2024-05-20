import Formio from "./src/Formio.js";

Formio.createForm(document.getElementById('formio'), {
    components: [
        {
            type: 'textfield',
            key: 'firstName',
            placeholder: 'Enter your first name.',
            input: true
        }
    ]
})
