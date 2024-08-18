import _ from 'lodash';

/**
 * renders form builder sidebar groups template
 * @param {object} ctx holds component builder information
 * @returns {string} the html template
 */
export default function (ctx) {
    return `
                  ${(function () {
        let theHTML = '';
        let index = 0;
        for (const group in ctx) {
            theHTML += `<div class="sidebar-group-${group} accordion-item">
                                            <h2 class="accordion-header">
                                                <button class="accordion-button ${index ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${group}">${_.capitalize(group)}</button>
                                            </h2>
                                            <div id="collapse${group}" class="accordion-collapse collapse ${!index ? 'show' : ''}" data-bs-parent="#formBuilderSidebar">
                                                <div class="accordion-body no-drop">
                                                    ${(function () {
                let theHTML = '';
                for (const component in ctx[group]) {
                    const componentClass = ctx[group][component];
                    theHTML += `<span class="btn btn-primary form-component d-block drag-copy" data-type="${componentClass.builderInfo.schema.type}">${componentClass.builderInfo.title}</span>`;
                }
                return theHTML;
            })()}
                                                </div>
                                            </div>
                                        </div>`;
            index += 1;
        }
        return theHTML;
    })()}
    `;
}
