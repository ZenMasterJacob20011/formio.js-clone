import '../formbuilder.css';

/**
 * renders form builder sidebar template
 * @param {object} ctx holds component builder information
 * @returns {string} the html template
 */
export default function (ctx) {
    return `
        <div class="formcomponents">
            <input ref="sidebarSearch" placeholder="Search field(s)" type="search" name="searchcomponent" id="searchcomponent" class="form-control builder-sidebar-search">
            <div ref="sidebarGroups" class="sidebar-groups accordion" id="formBuilderSidebar">
                ${ctx.sidebarGroups}
            </div>
        </div>
    `;
}
