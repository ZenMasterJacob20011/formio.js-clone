export default class Template {
    static templates: {
        button: typeof import("./button.js").default;
        input: typeof import("./input.js").default;
        label: typeof import("./label.js").default;
        checkbox: typeof import("./checkbox.js").default;
        selectboxes: typeof import("./selectboxes.js").default;
        select: typeof import("./select.js").default;
        radio: typeof import("./radio.js").default;
        formbuildersidebar: typeof import("./formbuildersidebar.js").default;
        formbuildersidebargroups: typeof import("./formbuildersidebargroups.js").default;
        formbuilder: typeof import("./formbuilder.js").default;
        builderComponent: typeof import("./builderComponent.js").default;
        dialog: typeof import("./dialog.js").default;
        buildereditform: typeof import("./builderEditForm.js").default;
        components: typeof import("./components.js").default;
        tabs: typeof import("./tabs.js").default;
    };
    /**
     * Gets a template from templates directory based on its name
     * @param {string} templateName the template name to lookup
     * @returns {(ctx:object)=>string} a function to render template
     */
    static getTemplate(templateName: string): (ctx: object) => string;
    /**
     * Returns the html given the templateName and the context
     * @param {string} templateName the name for the template
     * @param {object} ctx the context for the template
     * @returns {string} the html string of the template
     */
    static renderTemplate(templateName: string, ctx: object): string;
}
//# sourceMappingURL=Template.d.ts.map