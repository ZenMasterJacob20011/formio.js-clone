/**
 * template for creating edit component forms
 * @param {object} ctx the context
 * @returns {string} the html
 */
export default function(ctx){
    return `
        <div class="component-edit-container">
            <div class="row">${ctx.label} Component</div>
            <div class="row">
                <div class="col">
                    ${ctx.form}
                </div>
                <div class="col">
                    <button ref="saveButton" class="btn btn-success">Save</button>
                    <button ref="cancelButton" class="btn btn-info">Cancel</button>
                    <button ref="removeButton" class="btn btn-danger">Remove</button>
                </div>
            </div>
        </div>  
    `;
}
