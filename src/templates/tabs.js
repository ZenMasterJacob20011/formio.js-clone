/**
 * renders tabs template
 * @param {object} ctx the context
 * @returns {string} the html template
 */
export default function(ctx){
    return `
        <div class="card" ref="${ctx.componentContext.nestedKey}">
            <div class="card-header">
                <ul class="nav nav-tabs" role="tablist">
                    ${(function(){
                       let theHTML = '';
                       ctx.componentContext.component.components.forEach((component, index) => {
                           theHTML += `<li ref="${component.key}" class="nav-item" role="presentation">
                                            <button class="nav-link ${!index ? 'active' : ''}" data-bs-toggle="tab" data-bs-target="#${component.key}" type="button" role="tab" aria-selected="${!index ? 'true' : 'false'}">${component.label}</button>
                                        </li>`;
                       });
                       return theHTML;
                    })()}
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    ${(function (){
                        let theHTML = '';
                        ctx.componentContext.component.components.forEach((component, index) => {
                            theHTML += `<div ref='tabsContainer' class="tab-pane ${index === 0 ? 'show active' : ''}" id="${component.key}" role="tabpanel">${ctx.tabComponents[index]}</div>`;
                        });
                        return theHTML;
                    }())}
                </div>
            </div>
        </div>
    `;
}
