/**
 * renders select template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx) {
    return `
        <label for="${ctx.component._id}-select">${ctx.component.label}</label>
        <select id="${ctx.component._id}-select" class="form-select">
            ${function(){
                let theHTML = '';
                for(const value of ctx.component.data.values){
                    theHTML += `<option value="${value.value}">${value.label}</option>`;
                }
                return theHTML;
            }()}
        </select>
    `;
}
