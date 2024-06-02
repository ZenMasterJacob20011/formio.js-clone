export default function (ctx) {
    return `<${ctx.type === 'textarea' ? 'textarea' : 'input'} 
            class="form-control" 
            id="${ctx._id}" 
            type="${ctx.type}"
            placeholder="${ctx.placeholder}">
            ${ctx.type === 'textarea' ? '</textarea>' : ''}`
}
