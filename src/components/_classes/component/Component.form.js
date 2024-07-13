/**
 * creates the base edit form for components
 * @returns {object} the json of the edit form
 */
export default function (){
    return {
        components: [
            {
                type: 'textfield',
                label: 'Label',
            },
            {
                type: 'textfield',
                label: 'Placeholder',
                placeholder: 'Placeholder'
            },
            {
                type: 'textfield',
                key: 'editKey',
                label: 'Property Name'
            }
        ]
    };
}
