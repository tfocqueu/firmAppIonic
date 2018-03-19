import { Component } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { IonicPage } from 'ionic-angular';
import { ApiFirmService} from "../../app/api-firm.service";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
    listEnterprises = [];
    listCodeApe = [];
    listCategEnterprise = [];
    listDepartmentEnt = [];
    listMunicipalityEnt = [];
    listCreationYearEnt = [];
    listLegalStatus = [];
    url: SafeResourceUrl;
    subscription: Subscription;

  constructor(private sanitizer: DomSanitizer, private apiFirmService: ApiFirmService) {
      this.getMap();
  }

  getMap() {
      this.subscription = this.apiFirmService.getMapByParameters(this.listCodeApe, this.listCategEnterprise, this.listDepartmentEnt,
      this.listMunicipalityEnt, this.listCreationYearEnt, this.listLegalStatus).subscribe(data => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(data);
      });
  }

}
