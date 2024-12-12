import itemplates from './index.js';

export default class Template {

    static templates = itemplates;

    /**
     * Gets a template from templates directory based on its name
     * @param {string} templateName the template name to lookup
     * @returns {(ctx:object)=>string} a function to render template
     */
    static getTemplate(templateName) {
        if (!Template.templates[`${templateName}`]){
            console.warn(`Template: ${templateName} not found`);
            return ()=>{
              return '';
            };
        }
        return Template.templates[`${templateName}`];
    }

    /**
     * Returns the html given the templateName and the context
     * @param {string} templateName the name for the template
     * @param {object} ctx the context for the template
     * @returns {string} the html string of the template
     */
    static renderTemplate(templateName, ctx) {
        let template = '';
        const fn = this.getTemplate(templateName);
        template += fn(ctx);
        return template;
    }
}
