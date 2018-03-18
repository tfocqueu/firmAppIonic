import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ApiFirmService} from '../../app/api-firm.service';
import { Enterprise } from '../../app/Model/enterprise';
import { EnterpriseDetailsPage } from "../enterprise-details/enterprise-details";
import 'rxjs/add/operator/map';
import {FilterLinkService} from "../../app/filter-link.service";

@Component({
    selector: 'app-enterprise',
    templateUrl: './enterprises.html'
})
export class EnterprisesPage implements OnInit {
    listEnterprises = [];
    listCodeApe = [];
    listCategEnterprise = [];
    listAreaEnt = [];
    listMunicipalityEnt = [];
    listCreationYearEnt = [];
    listLegalStatus = [];
    listWorkforceEnt = [];
    listTotalRevenue = [];
    listRegion = [];
    nbResult: number;

    constructor(public navCtrl: NavController,private apiFirmService: ApiFirmService, private filterLinkService: FilterLinkService) {
        filterLinkService.loadCodeApeReceived$.subscribe(codeApe => {
            this.listCodeApe = codeApe;
            this.fetchEnterprises();
            console.log(codeApe);
        });
    }

    ngOnInit(): void {
        this.fetchEnterprises();
    }

    /* this function load enteprises with loader when user wait */
    fetchEnterprises() {
        this.apiFirmService.getEnterpriseByParameters(this.listCodeApe, this.listCategEnterprise, this.listAreaEnt,
            this.listMunicipalityEnt, this.listCreationYearEnt, this.listLegalStatus, this.listWorkforceEnt,
            this.listTotalRevenue, this.listRegion).subscribe(data => {
            this.listEnterprises = [];
            data['records'].forEach((value) => {
                const enterprise = new Enterprise
                    (value.fields.siren,
                    value.fields.name,
                    value.fields.nic,
                    value.fields.l1_normalisee,
                    value.fields.l2_normalisee,
                    value.fields.l3_normalisee,
                    value.fields.l4_normalisee);
                this.listEnterprises.push(enterprise);
            });
            console.log(this.listEnterprises);
            this.nbResult = this.listEnterprises.length;
            this.apiFirmService.updateNbResult(this.nbResult);
        });
    }
    openEnterpriseDetails(enterprise: Enterprise) {
        this.navCtrl.push(EnterpriseDetailsPage, enterprise);
    }
    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this.apiFirmService.getEnterpriseByParameters(this.listCodeApe, this.listCategEnterprise, this.listAreaEnt,
                this.listMunicipalityEnt, this.listCreationYearEnt, this.listLegalStatus, this.listWorkforceEnt,
                this.listTotalRevenue, this.listRegion).subscribe(data => {
                for (let i = 0; i < 30; i++) {
                    this.listEnterprises.push(this.listEnterprises.length);
                }
                infiniteScroll.complete();
            })
        }, 500);
    }
}
