/**
 * components template
 * @param {object} ctx the context
 * @returns {string} the components html
 */
export default function (ctx) {
    let showDragAndDropAlert = false;
    if (ctx.containerType === 'form' && ctx.components.some(component => component.component.type === 'button') && ctx.children.length <= 1) {
        showDragAndDropAlert = true;
    }else if(ctx.containerType !== 'form' && ctx.children.length <= 0){
        showDragAndDropAlert = true;
    }
    return `<div ref="${ctx.containerType}-container">
                ${ctx.builderMode && showDragAndDropAlert ? '<div class="drag-and-drop-alert no-drag">Drag and Drop a form component</div>' : ''}
                ${ctx.children.join('')}
            </div>`;
}
