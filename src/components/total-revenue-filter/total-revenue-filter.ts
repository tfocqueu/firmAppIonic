import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiFirmService} from "../../app/api-firm.service";

@Component({
    selector: 'total-revenue-filter',
    templateUrl: 'total-revenue-filter.html'
})
export class TotalRevenueFilterComponent implements OnInit {

    /* /!\ /!\  this filter have no logic so we wait to question administrator about this filter. Do nothing in this component !!!!!!! */
    ca = [];
    resetAll: boolean;
    caHard = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    displayCaForm = false;
    caError = false;
    @Output() outputTotalRevenueStatus = new EventEmitter<{}>(); // #SEB  the value of this output is transmit to the
    constructor(private apiFirmService: ApiFirmService) {
        apiFirmService.loadResetAllReceived$.subscribe(data => {
            this.resetAll = data;
            if (this.resetAll === true) {
                this.ca = [];
                this.updateParentTotalRevenu();
                this.displayCaForm = false;
            }
        });
    }

    ngOnInit() {
    }

    addCa(code: string): void {
        const status = this.apiFirmService.checkValue(code, this.ca);
        if (status === false) {
            this.ca.push(code);
            this.caError = false;
            this.updateParentTotalRevenu();
        } else {
            this.caError = true;
        }
    }

    deleteCa(idCode): void {
        this.caError = false;
        console.log(idCode);
        this.ca.splice(idCode, 1);
        this.updateParentTotalRevenu();
    }

    onSelectCa(): void {
        if (this.displayCaForm) {
            this.caError = false;
            this.displayCaForm = false;
        } else {
            this.displayCaForm = true;
        }
    }

    /* #SEB  this functon update the value in the app.component.ts */
    updateParentTotalRevenu() {
        this.outputTotalRevenueStatus.emit(this.ca);
    }
}
