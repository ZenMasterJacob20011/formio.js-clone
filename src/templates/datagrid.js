/**
 * renders data grid template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function (ctx) {
    return `
        <label>${ctx.label}</label>
        <table class="table datagrid-border" >
            <thead>
                <tr>
                    ${(function () {
                        let theHTML = '';
                        for(const column of ctx.columns){
                            theHTML += `<th class="datagrid-border">${column.label}</th>`;
                        }
                        if(!ctx.builder){
                          theHTML += '<th class="datagrid-border"><b>Add/Remove</b></th>';
                        }
                        return theHTML;
                    })()}
                </tr>
            </thead>
            ${(function () {
                let theHTML = '';
                for (const row of ctx.rows) {
                    theHTML += '<tr>';
                    for (const rowKey in row) {
                        theHTML += `<td class="datagrid-border" ref="${ctx.componentType}-container">${row[rowKey]}</td>`;
                    }
                    if(ctx.builder){
                        theHTML += `
                                <td class="datagrid-border" ref="${ctx.componentType}-container">
                                        ${ctx.placeholder}
                                </td>
                                `;
                    }else{
                        theHTML += `
                                <td class="datagrid-border">
                                    <button class="btn btn-secondary" ref="remove-row"><i class="bi bi-x-circle"></i></button>
                                </td>
                                `;
                    }
                    theHTML += '</tr>';
                }
                return theHTML;
            })()}
            ${!ctx.builder ? '<tr class="datagrid-border"><td><button ref="add-another" class="btn btn-primary">Add Another <i class="bi bi-plus-lg"></i></button></td></tr>' : ''}
        </table>
    `;
}
