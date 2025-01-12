import Template from './templates/Template.js';
import 'dragula/dist/dragula.min.css';
import dragula from 'dragula';
import Form from './Form.js';
import Component from './components/_classes/component/Component.js';
import Components from './components/_classes/components/Components.js';
import _ from 'lodash';
import {getRandomComponentId} from './utils/utils.js';
import Formio from './Formio.js';

export default class FormBuilder extends Component {
    /**
     * Static class to hold edit form creation
     * @param {string} componentType The type of the component
     * @returns {Form} the edit form
     */
    static createEditForm = (componentType) => {
        return new Form(document.createElement('div'), {
            components:
                [{
                    type: 'tabs',
                    key: 'editFormTabs',
                    components: Components.editInfo(componentType)
                }]
        }, {});
    };

    static createEditJSONForm = () => {
        return new Form(document.createElement('div'), {
                components: [
                    {
                        type: 'textarea',
                        label: 'Component JSON',
                        key: 'component',
                        editor: 'ace',
                        width: '730px',
                        height: '200px'
                    }
                ]
            }
            , {});
    };

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
        this.form = new Form(document.createElement('div'), {components: [{type: 'button'}]}, this.options);
    }


    attach(element) {
        element = element || this.htmlContainer;
        this.loadRefs(element, {
            'sidebarSearch': 'single',
            'sidebarGroups': 'single'
        });

        this.refs['sidebarSearch'].addEventListener('input', this.sidebarSearch.bind(this));
        this.form.attach(element);
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
        this.drake.on('drop', (el, target, source, sibling) => {
            if (target) {
                const originalContainerSchema = _.cloneDeep(target.formioContainer);
                const component = el.getAttribute('data-type') ? {
                    type: el.getAttribute('data-type'),
                    id: getRandomComponentId()
                } : undefined;
                if (el.classList.contains('component') || el.classList.contains('builder-component')) {
                    source.formioContainer.splice(this.getComponentPosition(target.formioContainer, el.formioComponent.component), 1);
                }
                let componentPosition = -1;
                if (sibling) {
                    if (sibling.getAttribute('data-position') !== null) {
                        componentPosition = Number(sibling.getAttribute('data-position'));
                    } else {
                        componentPosition = this.getComponentPosition(target.formioContainer, sibling.formioComponent.component);
                    }
                }
                if (componentPosition === -1) {
                    componentPosition = target.formioContainer.length;
                }
                target.formioContainer.splice(componentPosition, 0, component || el.formioComponent.component);
                this.redrawContainer(target.component);
                if (component) {
                    let classComponent = target.component.components.find((classComponent) => {
                        return component.id === classComponent.id;
                    });
                    this.editModal(classComponent, FormBuilder.createEditForm(component.type), component, originalContainerSchema);
                }
            }
        });
    }

    /**
     *
     * @param {HTMLElement} element the element to attach listeners to
     * @param {Component} component the component being modified by listeners
     */
    attachComponent(element, component) {
        if (component.component.type === 'form') {
            return;
        }

        element.formioComponent = component;
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
                this.redrawContainer(component.parent);
            });
        }
        if (component.refs.editComponent) {
            component.refs.editComponent.addEventListener('click', () => {
                this.editModal(component, FormBuilder.createEditForm(component.component.type), component.component);
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
                this.editModal(component, FormBuilder.createEditJSONForm(), component);
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
        document.querySelector('[ref="dialog"]').addEventListener('click', (e) => {
            if (e.target.getAttribute('ref') === 'dialog' || e.target.getAttribute('ref') === 'dialogClose') {
                component.parent.formioContainer.splice(0, component.parent.formioContainer.length);
                _.assign(component.parent.formioContainer, originalContainerSchema);
                delete Formio.forms[editForm.component._id];
                this.redrawContainer(component.parent);
                this.closeModal(element);
            }
        });
        element.querySelector('[ref="saveButton"]').addEventListener('click', () => {
            _.assign(component.component, editForm.submission.data);
            delete Formio.forms[editForm.component._id];
            this.redrawContainer(component.parent);
            this.closeModal(element);
        });
        element.querySelector('[ref="cancelButton"]').addEventListener('click', () => {
            component.parent.formioContainer.splice(0, component.parent.formioContainer.length);
            _.assign(component.parent.formioContainer, originalContainerSchema);
            delete Formio.forms[editForm.component._id];
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
            _.assign(component.component, JSON.parse(editForm.components[0].getValue()));
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

    /**
     * attaches listeners to the edit modal
     * @param {Component} component the component of the edit modal
     * @param {Form} editForm The form to edit the component properties
     * @param {object} data The data to fill the edit form
     * @param {object=} originalContainerSchema the original parent container of the component
     */
    editModal(component, editForm, data, originalContainerSchema) {
        const componentsClass = Components.components[component.component.type];
        const editFormContents = Template.renderTemplate('dialog', {
            dialogContents: Template.renderTemplate('buildereditform', {
                form: editForm.render(),
                label: `${componentsClass.builderInfo.title} Component`
            })
        });
        const modal = this.createModal(editFormContents);
        editForm.attach(modal);
        editForm.submission = {
            data: data
        };
        this.attachEditForm(modal, component, editForm, originalContainerSchema);
    }

    /**
     * get the position of a component in a container
     * @param {Component[]} container the list of elements or list of components
     * @param {object} component the sibling component in the container
     * @returns {number} the position of the component
     */
    getComponentPosition(container, component) {
        return _.findIndex(container, {key: component.key});
    }

    redraw() {
        this.htmlContainer.innerHTML = this.render();
    }

    /**
     * redraws the builders form
     * @param {import('./components/_classes/nestedcomponent/NestedComponent.js').NestedComponent} container the container element to redraw
     */
    redrawContainer(container) {
        container.element.querySelectorAll('[ref*="-container"]').forEach((element) => {
            this.drake.containers.splice(this.drake.containers.indexOf(element), 1);
        });
        container.init();
        container.redraw();
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

    /**
     * sets and creates the builder
     * @param {object} form the form definition
     */
    set setBuilder(form) {
        if (!_.isEmpty(form)) {
            this.form = new Form(document.createElement('div'), form, this.options);
        }
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
            if (componentsKey.toLowerCase().includes(value.toLowerCase()) && component?.builderInfo?.group) {
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
