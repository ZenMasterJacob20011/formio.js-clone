export default function (ctx) {
    return `
        <label for="${ctx._id}">${ctx.label}</label>
        <select id="${ctx._id}" class="form-select">
            ${function(){
                let theHTML = '';
                for(const value of ctx.data.values){
                    theHTML += `<option value="${value.value}">${value.label}</option>`;
                }
                return theHTML;
            }()}
        </select>
    `;
}
