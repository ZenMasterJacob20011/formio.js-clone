/**
 * renders label template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx){
    return `<label class="form-label" for="${ctx.component._id}">${ctx.component.label}</label>`;
}
