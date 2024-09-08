/**
 * renders input template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx) {
    return `
            <label for="${ctx.component._id}-${ctx.component.type}">${ctx.component.label}</label>
            ${(function(){
                if(ctx.component.editor === 'ace'){
                    return `<div ref="input" id="${ctx.component._id}-${ctx.component.type}" type="${ctx.component.type}" style="width: ${ctx.component.width}; height: ${ctx.component.height}"></div>`;
                }else{
                    return ` 
                        <${ctx.component.type === 'textarea' ? 'textarea' : 'input'}
                          class="form-control"
                          ref="input"
                          id="${ctx.component._id}-${ctx.component.type}"
                          type="${ctx.component.type}"
                          placeholder="${ctx.component.placeholder}">${ctx.component.type === 'textarea' ? '</textarea>' : ''} 
                        `;
                }
            })()}
            `;
}
