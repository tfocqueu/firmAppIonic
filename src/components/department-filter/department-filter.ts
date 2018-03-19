import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiFirmService} from "../../app/api-firm.service";

@Component({
    selector: 'department-filter',
    templateUrl: 'department-filter.html'
})
export class DepartmentFilterComponent implements OnInit {
    department = [];
    displayDepartmentForm = false;
    depError = false;
    resetAll: boolean;
    @Output() outputListDepartment = new EventEmitter<{}>();

    constructor(private apiFirmService: ApiFirmService) {
        apiFirmService.loadResetAllReceived$.subscribe(data => {
            this.resetAll = data;
            if (this.resetAll === true) {
                this.department = [];
                this.updateParentListDepartment();
                this.displayDepartmentForm = false;
            }
        });
    }

    ngOnInit() {
    }

    addDepartment(code: string): void {
        const status = this.apiFirmService.checkValue(code, this.department);
        if (status === false && code !== '') {
            this.department.push(code);
            this.depError = false;
            this.updateParentListDepartment();
        } else {
            this.depError = true;
        }
    }

    deleteDepartment(idCode): void {
        console.log(idCode);
        this.depError = false;
        this.department.splice(idCode, 1);
        this.updateParentListDepartment();

    }

    onSelectDepartment(): void {
        if (this.displayDepartmentForm) {
            this.displayDepartmentForm = false;
            this.depError = false;
        } else {
            this.displayDepartmentForm = true;
        }
    }

    /* #SEB  this functon update the value in the app.component.ts */
    updateParentListDepartment() {
        this.outputListDepartment.emit(this.department);
    }

}
