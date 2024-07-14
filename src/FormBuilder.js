import Template from './templates/Template';
import 'dragula/dist/dragula.min.css';
import dragula from 'dragula';
import Form from './Form';
import Component from './components/_classes/component/Component';

export default class FormBuilder extends Component {
    /**
     * Constructor for form builder
     * @param {HTMLElement} htmlContainer the container for the form builder
     * @param {object} options options for the builder
     */
    constructor(htmlContainer, options) {
        super(null, options, null);
        this.htmlContainer = htmlContainer;
        this.options = options || {};
        this.options.builderMode = true;
        this.options.hooks = this.options.hooks || {};
        this.options.hooks.renderComponent = (html, component) => {
            return Template.renderTemplate('builderComponent', {
                html,
                childComponent: component
            });
        };
        this.form = new Form(document.createElement('div'), [{type: 'button', label: 'submit'}], this.options);
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
        let currentDragComponentPosition = undefined;
        dragula([document.querySelector('.accordion-body'), document.querySelector('.form')], {
            moves: (el, container, handle) => {
                return !handle.classList.contains('drag-and-drop-alert');
            },
            copy: (el, source) => {
                return source === document.querySelector('.accordion-body');
            },
            accepts: (el, target) => {
                return target !== document.querySelector('.accordion-body');
            }
        }).on('drop', (el, container) => {
            if (container) {
                const component = el.getAttribute('data-type') ? {
                    type: el.getAttribute('data-type')
                } : undefined;
                if (el.classList.contains('component') || el.classList.contains('builder-component')) {
                    this.form.removeComponent(currentDragComponentPosition);
                }
                this.form.addComponent(component || currentDragComponent, this.getComponentPosition(el));
                this.createBuilder();
            }
        }).on('drag', (el) => {
            if (el.classList.contains('component') || el.classList.contains('builder-component')) {
                currentDragComponentPosition = this.getComponentPosition(el);
                currentDragComponent = this.form.components[currentDragComponentPosition];
            }
        });
    }

    /**
     * renders the form builder
     * @returns {string} the html of the form builder
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
     * @param {HTMLElement} el the html element to find
     * @returns {number} the position of the component
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
