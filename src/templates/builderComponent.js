/**
 * the function to create the html for builder components
 * @param {object} ctx context for the function
 * @returns {string} html for a builder component
 */
export default function (ctx) {
    return `
        <div class="builder-component">
            <div class="component-button-group">
                <div class="component-settings-button component-settings-button-remove btn btn-danger">
                    <i class="fa fa-remove"></i>
                </div>
                <div class="component-settings-button component-settings-button-copy btn">
                    <i class="fa fa-copy"></i>
                </div>
                <div class="component-settings-button component-settings-button-paste btn">
                    <i class="fa fa-save"></i>
                </div>
                <div class="component-settings-button component-settings-button-edit-json btn">
                    <i class="fa fa-wrench"></i>
                </div>
                <div class="component-settings-button component-settings-button-move btn">
                    <i class="fa-solid fa-up-down-left-right"></i>
                </div>
                <div class="component-settings-button component-settings-button-edit btn btn-secondary">
                    <i class="fa fa-cog"></i>
                </div>
            </div>
            ${ctx.html}
        </div>
    `;
}
