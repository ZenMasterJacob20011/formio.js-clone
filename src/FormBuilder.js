import Template from './templates/Template';
import 'dragula/dist/dragula.min.css';
import dragula from 'dragula';
import Form from './Form';
import Component from './components/_classes/component/Component';
import Components from './components/_classes/components/Components';

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
        this.options.hooks.attachComponent = this.attachComponent.bind(this);
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
        this.form.attach(this.htmlContainer);
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
                let componentPosition = this.getComponentPosition(el);
                if (document.querySelector('.drag-and-drop-alert')) {
                    componentPosition = componentPosition - 1 < 0 ? 0 : 0;
                }
                this.form.addComponent(component || currentDragComponent, componentPosition);
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

    attachComponent(element, component) {
        component.loadRefs(element, {
            removeComponent: 'single',
            editComponent: 'single',
            moveComponent: 'single',
            copyComponent: 'single',
            pasteComponent: 'single',
            editJSON: 'single'
        });

        if (component.refs.removeComponent) {
            component.refs.removeComponent.addEventListener('click', () => {
                this.removeComponent(component);
                this.createBuilder();
            });
        }
        if (component.refs.editComponent) {
            component.refs.editComponent.addEventListener('click', () => {
                console.log('edit button has been clicked');
                const editForm = new Form(document.createElement('div'), Components.builderInfo(component.component.type).components, {});
                const editFormContents = Template.renderTemplate('dialog', {
                    dialogContents: Template.renderTemplate('buildereditform', {
                        form: editForm.render(),
                        label: component.component.label
                    })
                });
                const modal = this.createModal(editFormContents);
                editForm.attach(modal);
                editForm.submission = {
                    data: component.component
                };
                this.attachEditForm(modal, component, editForm);
            });
        }
        if (component.refs.moveComponent) {
            component.refs.moveComponent.addEventListener('click', () => {
                this.moveComponent(component);
            });
        }
        if (component.refs.copyComponent) {
            component.refs.copyComponent.addEventListener('click', () => {
                this.copyComponent(component);
            });
        }
        if (component.refs.pasteComponent) {
            component.refs.pasteComponent.addEventListener('click', () => {
                this.pasteComponent(component);
            });
        }
        if (component.refs.editJSON) {
            component.refs.editJSON.addEventListener('click', () => {
                this.editJSON(component);
            });
        }
    }

    /**
     * Creates a modal edit form that will render edit form, attach listeners, and modify the component object, and then rerender on save
     * @param {string} modalContents the content to be inserted into the modal
     * @returns {HTMLElement} the modal element
     */
    createModal(modalContents) {
        // render the edit form
        let modal = document.createElement('div');
        modal.innerHTML = modalContents;
        document.body.appendChild(modal);
        this.attachModal(modal);
        return modal;
    }

    /**
     * attaches event listeners to edit form
     * @param {HTMLElement} element parent container for edit form
     * @param {Component} component the component being edited
     * @param {Form} editForm the edit form
     */
    attachEditForm(element, component, editForm) {
        element.querySelector('[ref="saveButton"]').addEventListener('click', () => {
            component.component = component.mergeSchema(editForm.submission.data);
            this.createBuilder();
            this.closeModal(element);
            console.log('I just ran');
        });
        element.querySelector('[ref="cancelButton"]').addEventListener('click', () => {

        });
        element.querySelector('[ref="removeButton"]').addEventListener('click', () => {
            this.removeComponent(component);
            this.createBuilder();
            this.closeModal(element);
        });
    }

    attachModal(modal) {
        window.addEventListener('click', (e) => {
            if (e.target.getAttribute('ref') === 'dialog' || e.target.getAttribute('ref') === 'dialogClose') {
                this.closeModal(modal);
            }
        });
    }

    closeModal(modal) {
        modal.remove();
    }

    /**
     * get the position of a component in the form builder
     * @param {HTMLElement | Component} el the html element or component to find
     * @returns {number} the position of the component
     */
    getComponentPosition(el) {
        if (el instanceof Component) {
            let componentPosition = this.form.components.indexOf(el);
            if (componentPosition === -1){
                throw Error('Could not find component position');
            }
            return componentPosition;
        } else {
            const componentContainer = document.querySelector('.form').children;
            for (let i = 0; i < componentContainer.length; i++) {
                if (componentContainer[i] === el) {
                    return i;
                }
            }
        }
        throw Error('Could not find component position');
    }

    /**
     * removes component from form
     * @param {Component} component the component to remove
     */
    removeComponent(component) {
        this.form.removeComponent(this.getComponentPosition(component));
    }
}
