import NestedArrayComponent from '../_classes/nestedarray/NestedArrayComponent.js';
import Template from '../../templates/Template.js';
import Components from '../Components.js';

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
        this.init();
    }

    get submission() {
        return this.rows.map((row) => {
            const rowObject = {};
            for (const rowKey in row) {
                rowObject[rowKey] = row[rowKey].submission;
            }
            return rowObject;
        });
    }

    set submission(submissionData) {
        if(!submissionData[this.component.key]) return;
        while(this.rows.length < submissionData[this.component.key].length){
            this.addRow();
        }
        this.rows.forEach((row, rowIndex) => {
            for (const rowKey in row) {
                row[rowKey].submission = submissionData[this.component.key][rowIndex];
            }
        });
    }

    /**
     * Adds a row to the data grid
     */
    addRow() {
        this.rows.push({});
        this.components.forEach((component) => {
            this.rows[this.rows.length - 1][component.component.key] = Components.createComponent(component.component, component.options, null, this.components);
        });
        this.redraw();
    }

    attach(element) {
        super.attach(element);
        this.loadRefs(element, {
            'datagrid-container': 'multiple',
            'add-another': 'single',
            'remove-row': 'multiple'
        });
        const containers = this.refs['datagrid-container'];
        containers.forEach((container) => {
            container.formioContainer = this.component.components;
            container.component = this;
            this.hook('attachDragula', container);
        });
        if (!this.options.builderMode) {
            this.refs['add-another'].addEventListener('click', this.addRow.bind(this));
            this.refs['remove-row'].forEach((row, rowIndex) => {
                row.addEventListener('click', this.removeRow.bind(this, rowIndex));
            });
        }
        const columns = this.getColumns();
        this.rows.forEach((row, rowIndex) => {
            columns.forEach((column, columnIndex) => {
                this.attachComponents(containers[rowIndex * columns.length + columnIndex], [this.rows[rowIndex][column.key]]);
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

    /**
     * Removes row from this.rows
     * @param {number} rowIndex the row index to be removed
     */
    removeRow(rowIndex) {
        if (this.rows.length === 1) {
            return;
        }
        this.rows.splice(rowIndex, 1);
        this.redraw();
    }

    render() {
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
