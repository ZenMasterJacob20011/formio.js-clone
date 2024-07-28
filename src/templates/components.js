/**
 * components template
 * @param {object} ctx the context
 * @returns {string} the components html
 */
export default function(ctx){
    return ctx.children.length ? ctx.children.join('') : '<div class="drag-and-drop-alert no-drag">Drag and Drop a form component</div>';
}
