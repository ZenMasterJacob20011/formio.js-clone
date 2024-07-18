/**
 * creates the base edit form for components
 * @returns {object} the json of the edit form
 */
export default function (){
    return {
        components: [
            {
                type: 'textfield',
                key: 'label',
                label: 'Label',
            },
            {
                type: 'textfield',
                key: 'placeholder',
                label: 'Placeholder',
                placeholder: 'Placeholder'
            },
            {
                type: 'textfield',
                key: 'key',
                label: 'Property Name'
            }
        ]
    };
}
