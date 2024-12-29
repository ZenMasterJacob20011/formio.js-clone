import NestedArrayComponent from '../_classes/nestedarray/NestedArrayComponent.js';
import Template from '../../templates/Template.js';
import Components from '../_classes/components/Components.js';

export default class DataGrid extends NestedArrayComponent {
    static schema(...extend) {
        return NestedArrayComponent.schema({
            key: 'datagrid',
            type: 'datagrid',
            label: 'Data Grid'
        }, ...extend);
    }

    static get builderInfo() {
        return {
            title: 'DataGrid',
            group: 'layout',
            icon: 'tbd',
            schema: DataGrid.schema()
        };
    }

    constructor(component, options, data) {
        super(component, options, data);
        if (!this.component.components) {
            this.component.components = [];
        }
    }

    attach(element) {
        super.attach(element);
        this.loadRefs(element, {
            'datagrid-container': 'multiple'
        });
        const containers = this.refs['datagrid-container'];
        containers.forEach((container) => {
            container.formioContainer = this.component.components;
            container.component = this;
            this.hook('attachDragula', container);
        });
        this.rows.forEach(() => {
            this.getColumns().forEach((column, columnIndex) => {
                this.attachComponents(containers[columnIndex], [this.components[columnIndex]]);
            });
        });
    }

    /**
     * Create an array representing the rows in the data grid
     * @returns {{[key: string]: import('../_classes/component/Component.js'), }[]} an array of objects with the key being the components key and the value being the component class
     */
    createRows() {
        const rows = [{}];
        this.components.forEach((component) => {
            const componentKey = component.component.key;
            rows[0][componentKey] = component;
        });
        return rows;
    }

    get defaultSchema() {
        return DataGrid.schema();
    }

    getColumns() {
        return this.columns;
    }

    getRows() {
        return this.rows.map((row) => {
            const rowObj = {};
            for (const tempRow in row) {
                rowObj[tempRow] = row[tempRow].render();
            }
            return rowObj;
        });
    }


    init() {
        this.components = Components.convertComponentArrayToClassArray(this.component.components, this.options);
        this.rows = this.createRows();
        this.columns = [...this.component.components];
    }


    render() {
        this.init();
        return super.render(Template.renderTemplate('datagrid', {
            rows: this.getRows(),
            columns: this.getColumns(),
            label: this.component.label,
            componentType: this.component.type,
            builder: this.options.builderMode,
            placeholder: Template.renderTemplate('builderplaceholder', {
                position: this.components.length
            })
        }));
    }
}
