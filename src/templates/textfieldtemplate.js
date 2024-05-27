/**
 * Generate the html for the text field render
 * @param {object} ctx
 * @return {string}
 */
export default function (ctx){
    return `
        <div class="component">
            <label class="form-label">${ctx.label}</label>
            <input type="text" class="form-control">
        </div>
    `
}
