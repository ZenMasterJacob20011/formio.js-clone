export default function (ctx) {
    return `<${ctx.type === 'textarea' ? 'textarea' : 'input'} class="form-control" id="${ctx.id}" type="${ctx.type}">${ctx.type === 'textarea' ? '</textarea>' : ''}`
}
