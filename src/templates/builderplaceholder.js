/**
 * creates builder placeholder
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx) {
    return `<div class="drag-and-drop-alert no-drag" data-position="${ctx.position}">Drag and Drop a form component</div>`;
}
