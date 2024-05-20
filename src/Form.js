export class Form{
    /**
     *
     * @param {Component[]} components
     */
    components
    constructor(components) {
        this.components = components
    }

    render(){
        const self = this
        return `<div class="form">
                    ${(function(){
                        let componentsHTML = ''
                        for (const component of self.components) {
                            componentsHTML += component.render()
                        }
                        return componentsHTML
                    })()}
                </div>
                `
    }
}
