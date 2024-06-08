export default function(ctx){
    return `
        <div class="form-check">
            <label class="form-check-label" for="${ctx._id}">
            <input class="form-check-input" id="${ctx._id}" type="checkbox">${ctx.label}</label>
        </div>
    `;
}
