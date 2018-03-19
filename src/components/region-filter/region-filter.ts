import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {ApiFirmService} from "../../app/api-firm.service";

@Component({
    selector: 'region-filter',
    templateUrl: 'region-filter.html'
})
export class RegionFilterComponent implements OnInit {

    region = [];
    resetAll: boolean;
    regionHard = [];
    regionError = false;
    displayRegionForm = false;
    @Output() outputRegion = new EventEmitter<{}>(); // the value of this output is transmit to the

    constructor(private apiFirmService: ApiFirmService, private http: HttpClient) {
        /* we load in the select list the data of region */
        this.getRegion().subscribe(data => {
            data['facet_groups'][0]['facets'].forEach((region) => {
                this.regionHard.push(region['name']);
            });
        });
        apiFirmService.loadResetAllReceived$.subscribe(data => {
            this.resetAll = data;
            if (this.resetAll === true) {
                this.region = [];
                this.updateParentRegion();
                this.displayRegionForm = false;
            }
        });
    }

    ngOnInit() {
    }

    addRegion(code: string): void {
        const status = this.apiFirmService.checkValue(code, this.region);
        if (status === false) {
            this.region.push(code);
            this.regionError = false;
            this.updateParentRegion();
        } else {
            this.regionError = true;
        }
    }

    deleteRegion(idCode): void {
        this.regionError = false;
        console.log(idCode);
        this.region.splice(idCode, 1);
        this.updateParentRegion();
    }

    onSelectRegion(): void {
        if (this.displayRegionForm) {
            this.displayRegionForm = false;
            this.regionError = false;
        } else {
            this.displayRegionForm = true;
        }
    }

    /* #SEB  this functon update the value in the app.component.ts */
    updateParentRegion() {
        this.outputRegion.emit(this.region);
    }

    /* this function return the region information of the api */
    getRegion(): Observable<Object> {
        return this.http.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&facet=libreg_new');
    }

}
