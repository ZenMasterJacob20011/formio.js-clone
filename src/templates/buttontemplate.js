import formiocss from '../formio.css'

/**
 * function for creating the html for button
 * @param {object} ctx
 */
export default function(ctx){
    return `
        <div class="component">
            <button type="button" class="btn btn-primary">${ctx.label}</button>
        </div>
    `
}
