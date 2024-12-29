/**
 * renders data grid template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx) {
    return `
        <label>${ctx.label}</label>
        <table class="table datagrid-border" >
            <tr>
                ${(function () {
                    let theHTML = '';
                    for(const column of ctx.columns){
                        theHTML += `<td class="datagrid-border">${column.label}</td>`;
                    }
                    return theHTML;
                })()}
            </tr>
            <tr>
                ${(function () {
                    let theHTML = '';
                    for(const row of ctx.rows){
                        for(const rowKey in row) {
                            theHTML += `<td class="datagrid-border" ref="${ctx.componentType}-container">${row[rowKey]}</td>`;
                        }
                    }
                    if(ctx.builder) {
                        theHTML += `
                                <td class="datagrid-border" ref="${ctx.componentType}-container">
                                        ${ctx.placeholder}
                                </td>
                                `;
                    }
                    return theHTML;
                })()}
            </tr>
        </table>
    `;
}
