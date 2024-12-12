export default class TextArea extends Input {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    editorReady: {};
    editor: any;
    getValue(): any;
    normalizeValue(value: any): string;
    setValue(value: any): void;
}
import Input from '../_classes/input/Input.js';
//# sourceMappingURL=TextArea.d.ts.map