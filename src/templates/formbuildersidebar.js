import '../formbuilder.css';
export default function (ctx) {
    return `
        <div class="formcomponents">
            <input placeholder="Search field(s)" type="search" name="searchcomponent" id="searchcomponent" class="form-control builder-sidebar-search">
            <div class="sidebar-groups accordion" id="formBuilderSidebar">
                  <div class="sidebar-group-basic accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBasic">Basic</button>
                    </h2>
                    <div id="collapseBasic" class="accordion-collapse collapse show" data-bs-parent="#formBuilderSidebar">
                        <div class="accordion-body">
                            <span class="btn btn-primary form-component d-block">
                                Text Field
                            </span>
                            <span class="btn btn-primary form-component d-block">
                                Text Area
                            </span>
                            <span class="btn btn-primary form-component d-block">
                                Number
                            </span>
                            <span class="btn btn-primary form-component d-block">
                                Password
                            </span>
                            <span class="btn btn-primary form-component d-block">
                                Checkbox
                            </span>
                            <span class="btn btn-primary form-component d-block">
                                Select Boxes
                            </span>
                            <span class="btn btn-primary form-component d-block">
                                Select
                            </span>
                            <span class="btn btn-primary form-component d-block">
                                Radio
                            </span>
                            <span class="btn btn-primary form-component d-block">
                                Button
                            </span>
                        </div>
                    </div>
                  </div>
                  <div class="sidebar-group-advanced accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdvanced">Advanced</button>
                    </h2>
                    <div id="collapseAdvanced" class="accordion-collapse collapse" data-bs-parent="#formBuilderSidebar">
                        <div class="accordion-body">
                            <span>Test</span>
                        </div>
                    </div>
                  </div>
                  <div class="sidebar-group-layout accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLayout">Layout</button>
                    </h2>
                    <div id="collapseLayout" class="accordion-collapse collapse" data-bs-parent="#formBuilderSidebar">
                        <div class="accordion-body">
                            <span>Test</span>
                        </div>
                    </div>
                  </div>
                  <div class="sidebar-group-data accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseData">Data</button>
                    </h2>
                    <div id="collapseData" class="accordion-collapse collapse" data-bs-parent="#formBuilderSidebar">
                        <div class="accordion-body">
                            <span>Test</span>
                        </div>
                    </div>
                  </div>
                  <div class="sidebar-group-premium accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePremium">Premium</button>
                    </h2>
                    <div id="collapsePremium" class="accordion-collapse collapse" data-bs-parent="#formBuilderSidebar">
                        <div class="accordion-body">
                            <span>Test</span>
                        </div>
                    </div>
                  </div>
            </div>
        </div>
    `;
}
