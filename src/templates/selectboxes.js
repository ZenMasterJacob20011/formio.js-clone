import checkboxTemplate from './checkbox';

export default function (ctx) {
    let theHTML = `<div id="${ctx._id}" class="selectboxes">`;
    for (const value of ctx.values) {
        value._id = ctx._id + value.value;
        theHTML += checkboxTemplate(value);
    }
    theHTML += '</div>';
    return theHTML;
}
