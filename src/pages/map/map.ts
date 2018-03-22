import { Component } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { IonicPage } from 'ionic-angular';
import { ApiFirmService} from "../../app/api-firm.service";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {FilterLinkService} from "../../app/filter-link.service";

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
    subscription: Subscription;
    mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private apiFirmService: ApiFirmService,private filterLinkService: FilterLinkService, private domSanitizer: DomSanitizer) {
      filterLinkService.loadCodeApeReceived$.subscribe(codeApe => {
          this.listCodeApe = codeApe;
          this.getMap();
      });
      filterLinkService.loadLoaderReceived$.subscribe(categ => {
          this.listCategEnterprise = categ;
          this.getMap();
      });

      filterLinkService.loadDepartmentEntReceived$.subscribe(dep => {
          this.listDepartmentEnt = dep;
          this.getMap();
      });

      filterLinkService.loadMunicipalityEntReceived$.subscribe(municipality => {
          this.listMunicipalityEnt = municipality;
          this.getMap();
      });

      filterLinkService.loadCreationDateEntReceived$.subscribe(creationDate => {
          this.listCreationYearEnt = creationDate;
          this.getMap();
      });

      filterLinkService.loadLegalStatusEntReceived$.subscribe(legalStatus => {
          this.listLegalStatus = legalStatus;
          this.getMap();
      });
  }
    ngOnInit() {
        this.mapUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://public.opendatasoft.com/explore/embed/dataset/sirene/map');
        this.getMap();
    }

  getMap(){
      let data: any;
      data = this.apiFirmService.getMapByParameters(this.listCodeApe, this.listCategEnterprise, this.listDepartmentEnt,
          this.listMunicipalityEnt, this.listCreationYearEnt, this.listLegalStatus);
      console.log(this.sanitizer.bypassSecurityTrustResourceUrl('https://public.opendatasoft.com/explore/embed/dataset/sirene/map/?q=&' + data));
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://public.opendatasoft.com/explore/embed/dataset/sirene/map/?q=' + data);
  }
}
