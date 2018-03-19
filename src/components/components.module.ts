import { NgModule } from '@angular/core';
import { FilterComponent } from './filter/filter';
import { CodeApeFilterComponent } from './code-ape-filter/code-ape-filter';
import {BusinessCategoriesFilterComponent} from "./business-categories-filter/business-categories-filter";
import { MunicipalityFilterComponent } from './municipality-filter/municipality-filter';
import { DepartmentFilterComponent } from './department-filter/department-filter';
import { CreationYearFilterComponent } from './creation-year-filter/creation-year-filter';
import { LegalStatusFilterComponent } from './legal-status-filter/legal-status-filter';
import { WorkforceFilterComponent } from './workforce-filter/workforce-filter';
@NgModule({
	declarations: [FilterComponent,
    CodeApeFilterComponent,
    BusinessCategoriesFilterComponent,
    MunicipalityFilterComponent,
    DepartmentFilterComponent,
    CreationYearFilterComponent,
    LegalStatusFilterComponent,
    WorkforceFilterComponent],
	imports: [],
	exports: [FilterComponent,
    CodeApeFilterComponent,
    BusinessCategoriesFilterComponent,
    MunicipalityFilterComponent,
    DepartmentFilterComponent,
    CreationYearFilterComponent,
    LegalStatusFilterComponent,
    WorkforceFilterComponent]
})
export class ComponentsModule {}
