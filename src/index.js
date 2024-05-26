import Formio from "./Formio";

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
