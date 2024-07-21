/**
 * creates a dialog window
 * @param {object} ctx the context
 * @returns {string} the dialog html
 */
export default function(ctx){
    return `
        <div ref="dialog" class="formio-dialog">
            <div class="formio-dialog-contents">
                <button ref="dialogClose" class="formio-dialog-close float-end btn btn-lg"></button>
                ${ctx.dialogContents}
            </div>
        </div>
    `;
}
