/**
 * renders input template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx) {
    return `
            <label for="${ctx.component._id}-${ctx.component.type}">${ctx.component.label}</label>
            <${ctx.component.type === 'textarea' ? 'textarea' : 'input'} 
            class="form-control" 
            id="${ctx.component._id}-${ctx.component.type}" 
            type="${ctx.component.type}"
            placeholder="${ctx.component.placeholder}">${ctx.component.type === 'textarea' ? '</textarea>' : ''}`;
}
