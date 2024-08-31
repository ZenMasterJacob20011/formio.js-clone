/**
 * creates the base edit form for components
 * @returns {object} the json of the edit form
 */
export default function () {
    return {
        components: [
            {
                type: 'tabs',
                key: 'editFormTabs',
                components: [
                    {
                        key: 'display',
                        label: 'Display',
                        components: [
                            {
                                type: 'textfield',
                                key: 'label',
                                label: 'label'
                            },
                            {
                                type: 'textfield',
                                key: 'placeholder',
                                placeholder: 'Placeholder',
                                label: 'placeholder'
                            }
                        ]
                    },
                    {
                        key: 'data',
                        label: 'Data',
                        components: []
                    },
                    {
                        key: 'validation',
                        label: 'Validation',
                        components: []
                    },
                    {
                        key: 'API',
                        label: 'API',
                        components: [
                            {
                                type: 'textfield',
                                key: 'key',
                                label: 'property Name',
                            }
                        ]
                    },
                    {
                        key: 'conditional',
                        label: 'Conditional',
                        components: []
                    },
                    {
                        key: 'logic',
                        label: 'Logic',
                        components: []
                    },
                    {
                        key: 'layout',
                        label: 'Layout',
                        components: []
                    }
                ]
            },
        ]
    };
}
