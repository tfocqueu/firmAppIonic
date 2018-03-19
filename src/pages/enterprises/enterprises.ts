import { Component, OnInit } from '@angular/core';
import { NavController, Loading,LoadingController } from 'ionic-angular';
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
    listCodeApeEnt = [];
    listCategEnt = [];
    listDepartmentEnt = [];
    listMunicipalityEnt = [];
    listCreationYearEnt = [];
    listLegalStatusEnt = [];
    listWorkforceEnt = [];
    listTotalRevenueEnt = [];
    listRegionEnt = [];
    nbResult: number;
    loader : Loading;

    constructor(public navCtrl: NavController, private apiFirmService: ApiFirmService, private filterLinkService: FilterLinkService, private loadingCtrl: LoadingController) {
        filterLinkService.loadCodeApeReceived$.subscribe(codeApe => {
            this.listCodeApeEnt = codeApe;
            this.fetchEnterprises();
        });
        filterLinkService.loadLoaderReceived$.subscribe(categ => {
            this.listCategEnt = categ;
            this.fetchEnterprises();
        });
        filterLinkService.loadDepartmentEntReceived$.subscribe(data => {
            this.listDepartmentEnt = data;
            this.fetchEnterprises();
        });
        filterLinkService.loadMunicipalityEntReceived$.subscribe(municipality => {
            this.listMunicipalityEnt = municipality;
            this.fetchEnterprises();
        });
        filterLinkService.loadCreationDateEntReceived$.subscribe( creationYear => {
            this.listCreationYearEnt = creationYear;
            this.fetchEnterprises();
        });
        filterLinkService.loadLegalStatusEntReceived$.subscribe( legalStatus =>{
            this.listLegalStatusEnt = legalStatus;
            this.fetchEnterprises();
        });
        filterLinkService.loadWorkforceEntReceived$.subscribe( workforce =>{
            this.listWorkforceEnt = workforce;
            this.fetchEnterprises();
        });
    }

    ngOnInit(): void {
        this.fetchEnterprises();
    }

    /* this function load enteprises with loader when user wait */
    fetchEnterprises() {
        this.createLoader();
        this.apiFirmService.getEnterpriseByParameters(this.listCodeApeEnt, this.listCategEnt, this.listDepartmentEnt,
            this.listMunicipalityEnt, this.listCreationYearEnt, this.listLegalStatusEnt, this.listWorkforceEnt,
            this.listTotalRevenueEnt, this.listRegionEnt).subscribe(data => {
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
            this.nbResult = this.listEnterprises.length;
            this.apiFirmService.updateNbResult(this.nbResult);
            this.loader.dismissAll();
        });
    }
    openEnterpriseDetails(enterprise: Enterprise) {
        this.navCtrl.push(EnterpriseDetailsPage, enterprise);
    }
    doInfinite(infiniteScroll) {
        setTimeout(() => {
            this.apiFirmService.getEnterpriseByParameters(this.listCodeApeEnt, this.listCategEnt, this.listDepartmentEnt,
                this.listMunicipalityEnt, this.listCreationYearEnt, this.listLegalStatusEnt, this.listWorkforceEnt,
                this.listTotalRevenueEnt, this.listRegionEnt).subscribe(data => {
                for (let i = 0; i < 30; i++) {
                    this.listEnterprises.push(this.listEnterprises.length);
                }
                infiniteScroll.complete();
            })
        }, 500);
    }

    createLoader(): void {
        this.loader = this.loadingCtrl.create({
            content: 'Veuillez Patienter ...',
        });
        this.loader.present();
    }
}
