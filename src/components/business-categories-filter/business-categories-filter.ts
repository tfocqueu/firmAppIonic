import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiFirmService} from "../../app/api-firm.service";

@Component({
    selector: 'business-categories-filter',
    templateUrl: 'business-categories-filter.html'
})
export class BusinessCategoriesFilterComponent implements OnInit {

    categEnt = [];
    categEntHard = ['PME', 'ETI', 'GE'];
    categError = false;
    displayCategEnt = false;
    @Output() outputListCateg = new EventEmitter<{}>(); // #SEB  the value of this output is transmit to the app.componenet.ts
    resetAll: boolean;

    constructor(private apiFirmService: ApiFirmService) {
        apiFirmService.loadResetAllReceived$.subscribe(data => {
            this.resetAll = data;
            if (this.resetAll === true) {
                this.categEnt = [];
                this.updateParentListCateg();
                this.displayCategEnt = false;
            }
        });
    }

    ngOnInit() {
    }

    /* this function add categ enterprise in the list of filter categ enterprise */
    addCategEnt(code: string): void {
        const status = this.apiFirmService.checkValue(code, this.categEnt);
        if (status === false) {
            this.categEnt.push(code);
            this.categError = false;
            this.updateParentListCateg();
        } else {
            this.categError = true;
        }
    }

    /* this function delete categ enterprise in the list of filter categ enterprise */
    deleteCategEnt(idCode): void {
        this.categError = false;
        this.categEnt.splice(idCode, 1);
        this.updateParentListCateg();
    }


    /* this function display or not the form categ enterprise */
    onSelectCategEnt(): void {
        if (this.displayCategEnt) {
            this.displayCategEnt = false;
            this.categError = false;
        } else {
            this.displayCategEnt = true;
        }
    }

    /* #SEB  this functon update the value in the app.component.ts */
    updateParentListCateg() {
        this.outputListCateg.emit(this.categEnt);
    }
}
