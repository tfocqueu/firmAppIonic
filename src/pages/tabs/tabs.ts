import { Component } from '@angular/core';
import { EnterprisesPage} from "../enterprises/enterprises";
import {MapPage} from "../map/map";
import {ExportPage} from "../export/export";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

    enterprises: any = EnterprisesPage;
    map: any = MapPage;
    export: any = ExportPage;

  constructor() {

  }
}
