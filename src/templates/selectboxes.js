import checkboxTemplate from './checkbox.js';
import _ from 'lodash';

/**
 * renders selectboxes template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx) {
    let theHTML = `<div id="${ctx.component._id}" class="selectboxes">`;
    for (const value of ctx.component.values) {
        _.set(value, 'component._id', ctx.component._id + value.value);
        _.set(value, 'component.label', value.label);
        theHTML += checkboxTemplate(value);
    }
    theHTML += '</div>';
    return theHTML;
}
