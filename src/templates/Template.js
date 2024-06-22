import templates from './index';

export default class Template {
    /**
     * Gets a template from templates directory based on its name
     * @param {string} templateName
     * @return (ctx:object)=>string
     */
    static getTemplate(templateName) {
        if (!templates[`${templateName}`]){
            console.warn(`Template: ${templateName} not found`);
            return ()=>{
              return '';
            };
        }
        return templates[`${templateName}`];
    }

    /**
     * Returns the html given the templateName and the context
     * @param {string} templateName
     * @param {object} ctx
     */
    static renderTemplate(templateName, ctx) {
        let template = '';
        const fn = this.getTemplate(templateName);
        template += fn(ctx);
        return template;
    }
}
