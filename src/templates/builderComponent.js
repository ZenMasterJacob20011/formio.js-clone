/**
 * the function to create the html for builder components
 * @param {object} ctx context for the function
 * @returns {string} html for a builder component
 */
export default function (ctx) {
    return `
        <div class="builder-component">
            <div class="component-button-group">
                <div ref="removeComponent" class="component-settings-button component-settings-button-remove btn btn-danger">
                    <i class="fa fa-remove"></i>
                </div>
                <div ref="copyComponent" class="component-settings-button component-settings-button-copy btn">
                    <i class="fa fa-copy"></i>
                </div>
                <div ref="pasteComponent" class="component-settings-button component-settings-button-paste btn">
                    <i class="fa fa-save"></i>
                </div>
                <div ref="editJSON" class="component-settings-button component-settings-button-edit-json btn">
                    <i class="fa fa-wrench"></i>
                </div>
                <div ref="moveComponent" class="component-settings-button component-settings-button-move btn">
                    <i class="fa-solid fa-up-down-left-right"></i>
                </div>
                <div ref="editComponent" class="component-settings-button component-settings-button-edit btn btn-secondary">
                    <i class="fa fa-cog"></i>
                </div>
            </div>
            ${ctx.html}
        </div>
    `;
}
