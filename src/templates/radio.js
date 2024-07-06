/**
 * renders radio template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx) {
    let theHTML = '';
    for (const value of ctx.component.values) {
        theHTML += `<div class="form-check">
                        <input class="form-check-input" name="${ctx.component._id}-radio" type="radio" id="${ctx.component._id + '-radio-' + value.value}">
                        <label class="form-check-label" for="${ctx.component._id + '-radio-' + value.value}">${value.label}</label>
                    </div>`;
    }
    return theHTML;
}
