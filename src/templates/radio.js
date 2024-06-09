export default function (ctx) {
    let theHTML = '';
    for (const value of ctx.values) {
        theHTML += `<div class="form-check">
                        <input class="form-check-input" name="${ctx._id}" type="radio" id="${ctx._id + value.value}">
                        <label class="form-check-label" for="${ctx._id + value.value}">${value.label}</label>
                    </div>`;
    }
    return theHTML;
}
