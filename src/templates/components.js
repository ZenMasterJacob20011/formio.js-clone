/**
 * components template
 * @param {object} ctx the context
 * @returns {string} the components html
 */
export default function(ctx){
    return `<div ref="${ctx.containerType}-container">
                ${ctx.builderMode && ctx.children.length <= 1 ? '<div class="drag-and-drop-alert no-drag">Drag and Drop a form component</div>' : ''}
                ${ctx.children.join('')}
            </div>`;
}
