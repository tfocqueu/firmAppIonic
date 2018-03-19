import { NgModule } from '@angular/core';
import { FilterComponent } from './filter/filter';
import { CodeApeFilterComponent } from './code-ape-filter/code-ape-filter';
import {BusinessCategoriesFilterComponent} from "./business-categories-filter/business-categories-filter";
import { MunicipalityFilterComponent } from './municipality-filter/municipality-filter';
import { DepartmentFilterComponent } from './department-filter/department-filter';
import { CreationYearFilterComponent } from './creation-year-filter/creation-year-filter';
import { LegalStatusFilterComponent } from './legal-status-filter/legal-status-filter';
import { WorkforceFilterComponent } from './workforce-filter/workforce-filter';
import { RegionFilterComponent } from './region-filter/region-filter';
import { TotalRevenueFilterComponent } from './total-revenue-filter/total-revenue-filter';
@NgModule({
	declarations: [FilterComponent,
    CodeApeFilterComponent,
    BusinessCategoriesFilterComponent,
    MunicipalityFilterComponent,
    DepartmentFilterComponent,
    CreationYearFilterComponent,
    LegalStatusFilterComponent,
    WorkforceFilterComponent,
    RegionFilterComponent,
    TotalRevenueFilterComponent],
	imports: [],
	exports: [FilterComponent,
    CodeApeFilterComponent,
    BusinessCategoriesFilterComponent,
    MunicipalityFilterComponent,
    DepartmentFilterComponent,
    CreationYearFilterComponent,
    LegalStatusFilterComponent,
    WorkforceFilterComponent,
    RegionFilterComponent,
    TotalRevenueFilterComponent]
})
export class ComponentsModule {}
