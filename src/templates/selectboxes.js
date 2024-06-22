import checkboxTemplate from './checkbox';

export default function (ctx) {
    let theHTML = `<div id="${ctx.component._id}" class="selectboxes">`;
    for (const value of ctx.component.values) {
        value._id = ctx.component._id + value.value;
        theHTML += checkboxTemplate(value);
    }
    theHTML += '</div>';
    return theHTML;
}
