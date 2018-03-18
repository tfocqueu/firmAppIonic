import { Component } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { IonicPage } from 'ionic-angular';
import { ApiFirmService} from "../../app/api-firm.service";
import { FilterLinkService} from "../../app/filter-link.service";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

declare let google: any;

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
    listAreaEnt = [];
    listMunicipalityEnt = [];
    listCreationYearEnt = [];
    listLegalStatus = [];
    url: SafeResourceUrl;
    subscription: Subscription;

  constructor(private sanitizer: DomSanitizer, private apiFirmService: ApiFirmService, private filterLinkService: FilterLinkService) {
      filterLinkService.loadCodeApeReceived$.subscribe(codeApe => {
          this.listCodeApe = codeApe;
          this.getMap();
      });
      filterLinkService.loadLoaderReceived$.subscribe(categ => {
          this.listCategEnterprise = categ;
          this.getMap();
      });

      filterLinkService.loadAreaEntReceived$.subscribe(area => {
          this.listAreaEnt = area;
          this.getMap();
      });

      filterLinkService.loadMunicipalityEntReceived$.subscribe(area => {
          this.listMunicipalityEnt = area;
          this.getMap();
      });

      filterLinkService.loadCreationDateEntReceived$.subscribe(area => {
          this.listCreationYearEnt = area;
          this.getMap();
      });

      filterLinkService.loadLegalStatusEntReceived$.subscribe(area => {
          this.listLegalStatus = area;
          this.getMap();
      });
      this.getMap();
  }
  getMap() {

      this.subscription = this.apiFirmService.getMapByParameters(this.listCodeApe, this.listCategEnterprise, this.listAreaEnt,
      this.listMunicipalityEnt, this.listCreationYearEnt, this.listLegalStatus).subscribe(data => {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(data);
      });
  }

}
