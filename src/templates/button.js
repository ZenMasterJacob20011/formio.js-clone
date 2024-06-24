/**
 * function for creating the html for button
 * @param {object} ctx
 */
export default function (ctx) {
    return `
            <button type="button" class="btn btn-primary">${ctx.component.label}</button>
    `;
}
