/**
 * renders button template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx) {
    return `
            <button type="button" class="btn btn-primary">${ctx.component.label}</button>
    `;
}
