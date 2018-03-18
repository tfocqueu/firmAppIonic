import { NgModule } from '@angular/core';
import { FilterComponent } from './filter/filter';
import { CodeApeFilterComponent } from './code-ape-filter/code-ape-filter';
import {BusinessCategoriesFilterComponent} from "./business-categories-filter/business-categories-filter";
@NgModule({
	declarations: [FilterComponent,
    CodeApeFilterComponent,
    BusinessCategoriesFilterComponent],
	imports: [],
	exports: [FilterComponent,
    CodeApeFilterComponent,
    BusinessCategoriesFilterComponent]
})
export class ComponentsModule {}
