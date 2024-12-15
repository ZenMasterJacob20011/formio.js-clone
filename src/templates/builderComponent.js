/**
 * the function to create the html for builder components
 * @param {object} ctx context for the function
 * @returns {string} html for a builder component
 */
export default function (ctx) {
    return `
        <div class="builder-component dragComponent">
            <div class="component-button-group">
                <div ref="removeComponent" class="component-settings-button component-settings-button-remove btn btn-danger">
                    <i class="bi bi-x-lg"></i>
                </div>
                <div ref="copyComponent" class="component-settings-button component-settings-button-copy btn">
                    <i class="bi bi-clipboard"></i>
                </div>
                <div ref="pasteComponent" class="component-settings-button component-settings-button-paste btn">
                    <i class="bi bi-save"></i>
                </div>
                <div ref="editJSON" class="component-settings-button component-settings-button-edit-json btn">
                    <i class="bi bi-pencil"></i>
                </div>
                <div ref="moveComponent" class="component-settings-button component-settings-button-move btn">
                    <i class="bi bi-arrow-down-up"></i>
                </div>
                <div ref="editComponent" class="component-settings-button component-settings-button-edit btn btn-secondary">
                    <i class="bi bi-gear-fill"></i>
                </div>
            </div>
            ${ctx.html}
        </div>
    `;
}
