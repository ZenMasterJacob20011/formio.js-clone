/**
 * renders form builder form container template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function(ctx){
    return `
        <div class="builder-components">
            <div class="drag-and-drop-alert">Drag and Drop a form component</div>
            ${ctx.submitButton}
        </div>
    `;
}
