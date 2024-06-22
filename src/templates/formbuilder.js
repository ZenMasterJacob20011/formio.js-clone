export default function (ctx){
    return `
        <div class="row formbuilder">
              <div class="col-2">
                ${ctx.formbuildersidebar}
              </div>
              <div class="col-10">
                ${ctx.form}
              </div>
        </div>
    `;
}
