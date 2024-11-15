/**
 * renders form builder template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx){
    return `
        <div class="container-fluid">
            <div class="row formbuilder">
                  <div class="col-2">
                    ${ctx.formbuildersidebar}
                  </div>
                  <div class="col-10">
                    ${ctx.form}
                  </div>
            </div>
        </div>
    `;
}
