import tabsEditDisplay from './editForm/Tabs.edit.display.js';
import Components from '../_classes/components/Components.js';

/**
 * edit form for tabs components
 * @returns {object} the edit form component json
 */
export default function () {
    return Components.baseEditForm([{
        key: 'display',
        components: tabsEditDisplay
    }]);
}
