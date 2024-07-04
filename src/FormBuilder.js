import Template from './templates/Template';
import 'dragula/dist/dragula.min.css';
import dragula from 'dragula';

export default class FormBuilder {

    /**
     * Constructor for form builder
     * @param {HTMLElement} htmlContainer
     * @param {object} options
     * @param {Form} form
     * @param {HTMLElement} formarea
     */
    constructor(htmlContainer, options, form) {
        this.htmlContainer = htmlContainer;
        this._options = options;
        this.form = form;
    }


    set setBuilder(data) {
        this.createBuilder();
    }

    createBuilder() {
        this.redraw();
        this.attach();
    }

    attach() {
        let currentDragComponent = undefined;
        dragula([document.querySelector('.accordion-body'), document.querySelector('.form')], {
            moves: (el, container, handle) => {
                return !handle.classList.contains('drag-and-drop-alert');
            },
            copy: (el, source)=>{
                return source === document.querySelector('.accordion-body');
            },
            accepts: (el, target) => {
                return target !== document.querySelector('.accordion-body');
            }
        }).on('drop', (el, container) => {
            console.log(container);
            if (container) {
                const component = {
                    type: el.getAttribute('data-type')
                };
                this.form.addComponent(currentDragComponent || component, this.getComponentPosition(el));
                this.createBuilder();
            }
        }).on('drag', (el) => {
            if (el.classList.contains('component')) {
                const componentPosition = this.getComponentPosition(el);
                currentDragComponent = this.form.components[componentPosition];
                this.form.removeComponent(componentPosition);
            }
        });
    }

    /**
     * renders the form builder
     */
    render() {
        return Template.renderTemplate('formbuilder', {
            formbuildersidebar: Template.renderTemplate('formbuildersidebar', {}),
            form: this.form.render()
        });
    }

    redraw() {
        this.htmlContainer.innerHTML = this.render();
    }

    /**
     * get the position of a component in the form builder
     * @param {HTMLElement} el
     * @return {number}
     */
    getComponentPosition(el) {
        const componentContainer = document.querySelector('.form').children;
        for (let i = 0; i < componentContainer.length; i++) {
            if (componentContainer[i] === el) {
                return i;
            }
        }
        return -1;
    }
}
