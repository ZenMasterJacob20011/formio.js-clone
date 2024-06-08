export default function (ctx) {
    return `
            <label for="${ctx._id}">${ctx.label}</label>
            <${ctx.type === 'textarea' ? 'textarea' : 'input'} 
            class="form-control" 
            id="${ctx._id}" 
            type="${ctx.type}"
            placeholder="${ctx.placeholder}">
            ${ctx.type === 'textarea' ? '</textarea>' : ''}`;
}
