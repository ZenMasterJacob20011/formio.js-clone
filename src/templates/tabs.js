/**
 * renders tabs template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function(ctx){
    return `
        <div class="card" ref="${ctx.componentContext.nestedKey}">
            <div class="row g-0">
                ${ctx.componentContext.component.verticalLayout ? '<div class="col-auto">' : ''}
                    <div class="card-header">
                        <ul class="nav nav-tabs ${ctx.componentContext.component.verticalLayout ? 'flex-column' : ''}" role="tablist">
                            ${(function(){
                               let theHTML = '';
                               ctx.componentContext.component.components.forEach((component, index) => {
                                   theHTML += `<li ref="${component.key}" class="nav-item" role="presentation">
                                                    <button ref="tab-link" class="nav-link w-100 text-start ${index === ctx.currentTab ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#${component.key}" type="button" role="tab" aria-selected="${!index ? 'true' : 'false'}">${component.label}</button>
                                                </li>`;
                               });
                               return theHTML;
                            })()}
                        </ul>
                    </div>
                ${ctx.componentContext.component.verticalLayout ? '</div>' : ''}
                ${ctx.componentContext.component.verticalLayout ? '<div class="col-10">' : ''}
                    <div class="card-body">
                        <div class="tab-content">
                            ${(function (){
                                let theHTML = '';
                                ctx.componentContext.component.components.forEach((component, index) => {
                                    theHTML += `<div ref='tabsContainer' class="tab-pane ${index === ctx.currentTab ? 'show active' : ''}" id="${component.key}" role="tabpanel">${ctx.tabComponents[index]}</div>`;
                                });
                                return theHTML;
                            }())}
                        </div>
                    </div>
                ${ctx.componentContext.component.verticalLayout ? '</div>' : ''}
            </div>
        </div>
    `;
}
