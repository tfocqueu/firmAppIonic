import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {ApiFirmService} from "../../app/api-firm.service";

@Component({
    selector: 'workforce-filter',
    templateUrl: 'workforce-filter.html'
})
export class WorkforceFilterComponent implements OnInit {
    effectifs = [];
    effectifsHard = [];
    displayEffectifsForm = false;
    effectifsError = false;
    resetAll: boolean;
    @Output() outputWorkforceStatus = new EventEmitter<{}>(); // the value of this output is transmit to the

    constructor(private apiFirmService: ApiFirmService, private http: HttpClient) {
        /* we load in the select list the data of workforce */
        this.getWorkforce().subscribe(data => {
            data['facet_groups'][0]['facets'].forEach((effectif) => {
                let nameEffectif = effectif['name'];
                let lengthName = nameEffectif.length;
                nameEffectif = nameEffectif.substr(5, lengthName);
                this.effectifsHard.push(nameEffectif);
            });
        });
        apiFirmService.loadResetAllReceived$.subscribe(data => {
            this.resetAll = data;
            if (this.resetAll === true) {
                this.effectifs = [];
                this.updateParentWorkforce();
                this.displayEffectifsForm = false;
            }
        });
    }

    ngOnInit() {
    }

    addEffectifs(code: string): void {
        const status = this.apiFirmService.checkValue(code, this.effectifs);
        if (status === false) {
            this.effectifs.push(code);
            this.effectifsError = false;
            this.updateParentWorkforce();
        } else {
            this.effectifsError = true;
        }
    }

    deleteEffectifs(idCode): void {
        this.effectifsError = false;
        console.log(idCode);
        this.effectifs.splice(idCode, 1);
        this.updateParentWorkforce();
    }

    onSelectEffectifs(): void {
        if (this.displayEffectifsForm) {
            this.effectifsError = false;
            this.displayEffectifsForm = false;
        } else {
            this.displayEffectifsForm = true;
        }
    }

    /* this function update the value in the app.component.ts */
    updateParentWorkforce() {
        this.outputWorkforceStatus.emit(this.effectifs);
    }

    /* this function return the workforce information of the api */
    getWorkforce(): Observable<Object> {
        return this.http.get('https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&facet=libtefet');
    }
}
