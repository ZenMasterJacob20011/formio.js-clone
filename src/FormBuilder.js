import Template from './templates/Template';
import 'dragula/dist/dragula.min.css';
import dragula from 'dragula';
import Form from './Form';
import Component from './components/_classes/component/Component';
import Components from './components/_classes/components/Components';
import _ from 'lodash';
import {getRandomComponentId} from './utils/utils';

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
        this.options.hooks.attachDragula = this.attachDragula.bind(this);
        this.containers = [];
        this.form = new Form(document.createElement('div'), [{type: 'button'}], this.options);
    }


    attach(element) {
        element = element || this.htmlContainer;
        this.loadRefs(element, {
            'sidebarSearch': 'single',
            'sidebarGroups': 'single'
        });

        this.refs['sidebarSearch'].addEventListener('input', this.sidebarSearch.bind(this));
        this.form.attach(element);
        let currentDragComponent = undefined;
        let currentDragComponentPosition = undefined;
        this.drake = dragula({
            moves: (el) => {
                return !el.classList.contains('no-drag');
            },
            copy: (el) => {
                return el.classList.contains('drag-copy');
            },
            accepts: (el, target) => {
                return !el.contains(target) && !target.classList.contains('no-drop');
            }
        });
        document.querySelectorAll('.accordion-body').forEach((element) => {
            this.drake.containers.push(element);
        });
        this.drake.containers.push(document.querySelector('.form').querySelector('[ref="form-container"]'));
        this.containers = this.drake.containers;
        this.drake.on('drop', (el, target, source) => {
            if (target) {
                const originalContainerSchema = _.cloneDeep(target.formioContainer);
                const component = el.getAttribute('data-type') ? {
                    type: el.getAttribute('data-type'),
                    id: getRandomComponentId()
                } : undefined;
                if (el.classList.contains('component') || el.classList.contains('builder-component')) {
                    source.formioContainer.splice(currentDragComponentPosition, 1);
                }
                let componentPosition = this.getComponentPosition(el, target);
                target.formioContainer.splice(componentPosition, 0, component || currentDragComponent);
                this.redrawContainer(target);
                if (component) {
                    let classComponent = target.component.components.find((classComponent) => {
                        return component.id === classComponent.id;
                    });
                    this.editModal(classComponent, originalContainerSchema);
                }
            }
        }).on('drag', (el, source) => {
            if (el.classList.contains('component') || el.classList.contains('builder-component')) {
                currentDragComponentPosition = this.getComponentPosition(el, source);
                currentDragComponent = source.formioContainer[currentDragComponentPosition];
            }
        });
    }

    /**
     *
     * @param {HTMLElement} element the element to attach listeners to
     * @param {Component} component the component being modified by listeners
     */
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
                this.editModal(component);
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
     * Adds a container to the list of containers for dragula
     * @param {HTMLElement} container the container to be added
     */
    attachDragula(container) {
        this.containers.push(container);
    }

    /**
     * attaches event listeners to edit form
     * @param {HTMLElement} element parent container for edit form
     * @param {Component} component the component being edited
     * @param {Form} editForm the edit form
     * @param {object} originalContainerSchema the original schema of the component parent container
     */
    attachEditForm(element, component, editForm, originalContainerSchema) {
        if (originalContainerSchema == null) {
            originalContainerSchema = _.cloneDeep(component.parent.formioContainer);
        }
        window.addEventListener('click', (e) => {
            if (e.target.getAttribute('ref') === 'dialog' || e.target.getAttribute('ref') === 'dialogClose') {
                component.parent.formioContainer.splice(0, component.parent.formioContainer.length);
                _.assign(component.parent.formioContainer, originalContainerSchema);
                this.redrawContainer(component.parent);
                this.closeModal(element);
            }
        });
        element.querySelector('[ref="saveButton"]').addEventListener('click', () => {
            _.assign(component.component, editForm.submission.data);
            this.redrawContainer(component.parent);
            this.closeModal(element);
        });
        element.querySelector('[ref="cancelButton"]').addEventListener('click', () => {
            component.parent.formioContainer.splice(0, component.parent.formioContainer.length);
            _.assign(component.parent.formioContainer, originalContainerSchema);
            this.redrawContainer(component.parent);
            this.closeModal(element);
        });
        element.querySelector('[ref="removeButton"]').addEventListener('click', () => {
            this.removeComponent(component);
            this.redrawContainer(component.parent);
            this.closeModal(element);
        });
    }

    attachEditJSONForm(element, component, editForm, originalContainerSchema) {
        if (originalContainerSchema == null) {
            originalContainerSchema = _.cloneDeep(component.parent.formioContainer);
        }
        window.addEventListener('click', (e) => {
            if (e.target.getAttribute('ref') === 'dialog' || e.target.getAttribute('ref') === 'dialogClose') {
                component.parent.formioContainer.splice(0, component.parent.formioContainer.length);
                _.assign(component.parent.formioContainer, originalContainerSchema);
                this.redrawContainer(component.parent);
                this.closeModal(element);
            }
        });
        element.querySelector('[ref="saveButton"]').addEventListener('click', () => {
            _.assign(component.component, JSON.parse(editForm.components[0].refs.input.value));
            this.redrawContainer(component.parent);
            this.closeModal(element);
        });
        element.querySelector('[ref="cancelButton"]').addEventListener('click', () => {
            this.closeModal(element);
        });
        element.querySelector('[ref="removeButton"]').addEventListener('click', () => {
            this.removeComponent(component);
            this.createBuilder();
            this.closeModal(element);
        });
    }

    closeModal(modal) {
        modal.remove();
    }

    createBuilder() {
        this.containers = [];
        this.redraw();
        this.attach();
    }

    /**
     * Creates a modal edit form that will render edit form, attach listeners, and modify the component object, and then rerender on save
     * @param {string} modalContents the content to be inserted into the modal
     * @returns {HTMLElement} the modal element
     */
    createModal(modalContents) {
        let modal = document.createElement('div');
        modal.innerHTML = modalContents;
        document.body.appendChild(modal);
        return modal;
    }

    editJSON(component) {
        const editJSONForm = new Form(document.createElement('div'), [
                {
                    type: 'textarea',
                    label: 'Component JSON',
                    key: 'component'
                }
            ]
            , {});
        const editJSONContents = Template.renderTemplate('dialog', {
            dialogContents: Template.renderTemplate('buildereditform', {
                form: editJSONForm.render(),
                label: `${component.defaultSchema.label} Component`
            })
        });
        const modal = this.createModal(editJSONContents);
        editJSONForm.attach(modal);
        editJSONForm.submission = {
            data: component
        };
        this.attachEditJSONForm(modal, component, editJSONForm);
    }

    /**
     * attaches listeners to the edit modal
     * @param {Component} component the component of the edit modal
     * @param {object} originalContainerSchema the original parent container of the component
     */
    editModal(component, originalContainerSchema) {
        const editForm = new Form(document.createElement('div'), Components.editInfo(component.component.type).components, {});
        const editFormContents = Template.renderTemplate('dialog', {
            dialogContents: Template.renderTemplate('buildereditform', {
                form: editForm.render(),
                label: `${component.defaultSchema.label} Component`
            })
        });
        const modal = this.createModal(editFormContents);
        editForm.attach(modal);
        editForm.submission = {
            data: component.component
        };
        this.attachEditForm(modal, component, editForm, originalContainerSchema);
    }

    /**
     * get the position of a component in a container
     * @param {HTMLElement | Component} el the html element or component to find
     * @param {HTMLElement | Component[]} container the list of elements or list of components
     * @returns {number} the position of the component
     */
    getComponentPosition(el, container) {
        if (el instanceof Component) {
            let componentPosition = container.indexOf(el);
            if (componentPosition === -1) {
                throw Error('Could not find component position');
            }
            return componentPosition;
        } else {
            let componentContainer = container.children;
            const offset = componentContainer.item(0).classList.contains('drag-and-drop-alert') ? 1 : 0;
            for (let i = 0; i < componentContainer.length; i++) {
                if (componentContainer[i] === el) {
                    return i - offset;
                }
            }
        }
        throw Error('Could not find component position');
    }

    redraw() {
        this.htmlContainer.innerHTML = this.render();
    }

    /**
     * redraws the builders form
     * @param {HTMLElement} container the container element to redraw
     */
    redrawContainer(container) {
        container.querySelectorAll('[ref*="-container"]').forEach((element) => {
            this.drake.containers.splice(this.drake.containers.indexOf(element), 1);
        });
        container.component.redraw();
    }

    /**
     * removes component from form
     * @param {Component} component the component to remove
     */
    removeComponent(component) {
        const parentContainer = component.element.parentElement.formioContainer;
        const componentPosition = parentContainer.findIndex((element) => component.component === element);
        parentContainer.splice(componentPosition, 1);
    }

    /**
     * renders the form builder
     * @returns {string} the html of the form builder
     */
    render() {
        return Template.renderTemplate('formbuilder', {
            formbuildersidebar: Template.renderTemplate('formbuildersidebar', {sidebarGroups: Template.renderTemplate('formbuildersidebargroups', this.sideBarComponents(''))}),
            form: this.form.render()
        });
    }

    set setBuilder(data) {
        this.createBuilder();
    }


    /**
     * Gets the sidebar components based on a filter value
     * @param {string} value the value to filter
     * @returns {object} an object of groups and components in those groups
     */
    sideBarComponents(value) {
        let groups = {};
        for (let componentsKey in Components.components) {
            const component = Components.components[componentsKey];
            if (componentsKey.toLowerCase().includes(value.toLowerCase())) {
                _.set(groups, `${component.builderInfo.group}.${componentsKey}`, component);
            }
        }
        return groups;
    }


    sidebarSearch(event) {
        const input = event.target.value;
        this.refs['sidebarGroups'].innerHTML = Template.renderTemplate('formbuildersidebargroups', this.sideBarComponents(input));
        this.attach();
    }


}
