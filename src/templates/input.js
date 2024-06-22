export default function (ctx) {
    return `
            <label for="${ctx.component._id}">${ctx.component.label}</label>
            <${ctx.component.type === 'textarea' ? 'textarea' : 'input'} 
            class="form-control" 
            id="${ctx.component._id}" 
            type="${ctx.component.type}"
            placeholder="${ctx.component.placeholder}">
            ${ctx.component.type === 'textarea' ? '</textarea>' : ''}`;
}
