import TextAreaForm from './TextArea.form';
import Input from '../_classes/input/Input';
import {requireLibrary} from '../../utils/utils';

export default class TextArea extends Input {

    static editInfo = TextAreaForm;

    static schema(...extend) {
        return Input.schema({
            label: 'Text Area',
            key: 'textArea',
            type: 'textarea',
            editor: ''
        }, ...extend);
    }

    static get builderInfo() {
        return {
            title: 'Text Area',
            group: 'basic',
            icon: 'tbd',
            schema: TextArea.schema()
        };
    }


    constructor(component, options, data) {
        super(component, options, data);
        this.editorReady = {};
    }

    attach(element) {
        super.attach(element);
        if (this.component.editor === 'ace') {
            this.editorReady.ace = new Promise((resolve, reject) => {
                requireLibrary('https://www.unpkg.com/ace-builds@1.36.2/src-noconflict/ace.js', 'ace').then((ace) => {
                    this.editor = ace.edit(this.refs.input, {
                        mode: 'ace/mode/json',
                        selectionStyle: 'text'
                    });
                    resolve(this.editor);
                }).catch(reject);
            });
        }
    }

    get defaultSchema() {
        return TextArea.schema();
    }

    getValue() {
        if (this.component.editor === 'ace') {
            return this.editor.getValue();
        }
        return super.getValue();
    }

    normalizeValue(value) {
        if (typeof value === 'object') {
            return JSON.stringify(value, null, 2);
        }
    }


    setValue(value) {
        if (this.component.editor === 'ace') {
            this.editorReady.ace.then((editor) => {
                editor.setValue(this.normalizeValue(value));
            });
        } else {
            super.setValue(value);
        }
    }
}
