import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiFirmService} from "../../app/api-firm.service";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";


@Component({
    selector: 'code-ape-filter',
    templateUrl: 'code-ape-filter.html'
})
export class CodeApeFilterComponent implements OnInit {

    codeApe = [];
    codeApeHard = [];
    displayCodeApeForm = false;
    apeError = false;
    displayButton = false;
    resetAll: boolean;
    @Output() outputCodeApe = new EventEmitter<{}>(); // #SEB  the value of this output is transmit to the app.componenent.ts
    constructor(private apiFirmService: ApiFirmService, private http: HttpClient) {
        /* we load the legal status in the select list of legal status in the html code with the data of openDataDof api */
        this.getCodeApe().subscribe(data => {
            data['facet_groups'][0]['facets'].forEach((codeApe) => {
                this.codeApeHard.push(codeApe['name']);
            });
        });
        apiFirmService.loadResetAllReceived$.subscribe(data => {
            this.resetAll = data;
            if (this.resetAll === true) {
                this.codeApe = [];
                this.updateParentCodeApe();
                this.displayButton = false;
                this.displayCodeApeForm = false;
            }
        });
    }

    ngOnInit() {
    }

    /* this function add APE code in the list of filter code APE */
    addCodeApe(code: string): void {
        const status = this.apiFirmService.checkValue(code, this.codeApe); // call service to check if value exist
        if (status === false && code !== '') { // if doesn't exist
            this.codeApe.push(code); // we push the new APE filter in the list of APE filter
            this.apeError = false; // we have no error
            this.updateParentCodeApe(); // #SEB update list code APE
        } else {
            this.apeError = true; // else we have an error
        }
        this.displayButton = true;
    }

    /* this function delete APE code in the list of filter code APE */
    deleteCodeApe(idCode): void {
        this.apeError = false;
        this.codeApe.splice(idCode, 1);
        this.updateParentCodeApe();
    }

    /* this function display on click the form to add code APE */
    onSelectCodeApe(): void {
        if (this.displayCodeApeForm) {
            this.displayCodeApeForm = false;
            this.apeError = false;
        } else {
            this.displayCodeApeForm = true;
        }
    }

    updateParentCodeApe() { // #SEB  this function update the value in the app.component.ts
        this.outputCodeApe.emit(this.codeApe);
    }

    /* this function return the municiality information of the api */
    getCodeApe(): Observable<Object> {
        return this.http.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&facet=apet700');
    }
}
