import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {ApiFirmService} from "../../app/api-firm.service";

@Component({
    selector: 'municipality-filter',
    templateUrl: 'municipality-filter.html',
})
export class MunicipalityFilterComponent implements OnInit {

    municipality = [];
    apiFacetMunicipality = this.http.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&facet=libcom');
    displayMunicipalityForm = false;
    munError = false;
    municipalityHard = [];
    @Output() outputListMunicipality = new EventEmitter<{}>();
    resetAll: boolean;

    constructor(private apiFirmService: ApiFirmService, private http: HttpClient) {
        /* we  load the munipality of the api in municipalityHard to complete the select in the html code */
        this.getMunicipality().subscribe(data => {
            data['facet_groups'][0]['facets'].forEach((municipality) => {
                this.municipalityHard.push(municipality['name']);
            });
        });
        /* this function listen the resetAll variable */
        apiFirmService.loadResetAllReceived$.subscribe(data => {
            this.resetAll = data;
            if (this.resetAll === true) {
                this.municipality = [];
                this.updateParentMunicipality();
                this.displayMunicipalityForm = false;
            }
        });
    }

    ngOnInit() {
    }
    addMunicipality(code: string): void {
        const status = this.apiFirmService.checkValue(code, this.municipality);
        if (status === false) {
            this.municipality.push(code);
            this.munError = false;
            this.updateParentMunicipality();
        } else {
            this.munError = true;
        }
    }

    deleteMunicipality(idCode): void {
        this.munError = false;
        this.municipality.splice(idCode, 1);
        this.updateParentMunicipality();
    }

    onSelectMunicipality(): void {
        if (this.displayMunicipalityForm) {
            this.displayMunicipalityForm = false;
            this.munError = false;
        } else {
            this.displayMunicipalityForm = true;
        }
    }

    /* this function update the value in the app.component.ts */
    updateParentMunicipality() {
        this.outputListMunicipality.emit(this.municipality);
    }

    /* this function return the municiality information of the api */
    getMunicipality(): Observable<Object> {
        return this.http.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&facet=libcom');
    }
}
