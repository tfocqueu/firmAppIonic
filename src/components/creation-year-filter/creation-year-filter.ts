import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {ApiFirmService} from "../../app/api-firm.service";

@Component({
    selector: 'creation-year-filter',
    templateUrl: 'creation-year-filter.html'
})
export class CreationYearFilterComponent implements OnInit {

    creationYear = [];
    creationYearHard = []
    displayCreationYearForm = false;
    creationYearError = false;
    resetAll: boolean;
    @Output() outputListCreationDate = new EventEmitter<{}>();

    constructor(private apiFirmService: ApiFirmService, private http: HttpClient) {
        /* we load in the select list the data of creation year */
        this.getCreationYear().subscribe(data => {
            data['facet_groups'][0]['facets'].forEach((year) => {
                this.creationYearHard.push(year['name']);
            });
        });
        apiFirmService.loadResetAllReceived$.subscribe(data => {
            this.resetAll = data;
            if (this.resetAll === true) {
                this.creationYear = [];
                this.updateParentListCreationDate();
                this.displayCreationYearForm = false;
            }
        });
    }

    ngOnInit() {
    }

    /** Start up year **/
    addCreationYear(code: string): void {
        const status = this.apiFirmService.checkValue(code, this.creationYear)
        if (status === false) {
            this.creationYear.push(code);
            this.creationYearError = false;
            this.updateParentListCreationDate();
        } else {
            this.creationYearError = true;
        }
    }

    deleteCreationYear(idCode): void {
        console.log(idCode);
        this.creationYear.splice(idCode, 1);
        this.updateParentListCreationDate();
        this.creationYearError = false;
    }

    onSelectCreationYear(): void {
        if (this.displayCreationYearForm) {
            this.displayCreationYearForm = false;
            this.creationYearError = false;
        } else {
            this.displayCreationYearForm = true;
        }
    }

    /* #SEB  this functon update the value in the app.component.ts */
    updateParentListCreationDate() {
        this.outputListCreationDate.emit(this.creationYear);
    }

    /* this function return the creation year of the api */
    getCreationYear(): Observable<Object> {
        return this.http.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&facet=dcren');
    }
}
