/**
 * renders checkbox template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function(ctx){
    return `
        <div class="form-check">
            <input class="form-check-input" id="${ctx.component._id}" type="checkbox">
            <label class="form-check-label" for="${ctx.component._id}">${ctx.component.label}</label>
        </div>
    `;
}
