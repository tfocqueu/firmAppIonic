import { Component } from '@angular/core';
import {MenuController} from "ionic-angular";
import {FilterLinkService} from "../../app/filter-link.service";

/**
 * Generated class for the FilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterComponent {
    text: string;

    constructor(public menuCtrl: MenuController, private filterLinkService: FilterLinkService) {

    }

    outputCodeApe(codeApe) {
        this.filterLinkService.LoadCodeApe(codeApe);
    }

    /* #SEB this function update the value in the service to easy access in the enterprise component */

    /* Don't forget to call this function in the app.component.html */
    outputListCateg(categEnt) {
        this.filterLinkService.LoadCategEnterprise(categEnt);
    }

    outputListDepartment(departmentEnt) {
        this.filterLinkService.LoadDepartmentEntreprise(departmentEnt);
    }

    outputListMunicipality(municipalityEnt) {
        this.filterLinkService.LoadMunicipalityEntreprise(municipalityEnt);
    }

    outputListCreationDate(creationDateEnt) {
        this.filterLinkService.LoadCreationYearEntreprise(creationDateEnt);
    }

    outputListLegalStatus(legalStatusEnt) {
        this.filterLinkService.LoadLegalStatusEntreprise(legalStatusEnt);
    }

    outputWorkforceStatus(workforceEnt) {
        this.filterLinkService.LoadWorkforceEntreprise(workforceEnt);
    }

    outputTotalRevenueStatus(totalRevenueEnt) {
        this.filterLinkService.LoadTotalRevenue(totalRevenueEnt);
    }

    outputRegion(regionEnt) {
        this.filterLinkService.LoadRegion(regionEnt);
    }

    outputNbResult(nbResult) {
        console.log(nbResult);
        this.filterLinkService.LoadNbResult(nbResult);
    }
    outputSearch(search) {
        this.filterLinkService.LoadSearch(search);
    }
}