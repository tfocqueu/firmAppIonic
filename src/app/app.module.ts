import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { HttpClientModule } from '@angular/common/http';

import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

import { EnterprisesPage } from '../pages/enterprises/enterprises';
import { EnterpriseDetailsPage } from '../pages/enterprise-details/enterprise-details';
import { FilterComponent } from "../components/filter/filter";
import { MenuPage } from '../pages/menu/menu';
import { MapPage} from "../pages/map/map";
import { ExportPage} from "../pages/export/export";
import { TabsPage } from '../pages/tabs/tabs';

import { ApiFirmService } from './api-firm.service';
import { FilterLinkService} from "./filter-link.service";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import {CodeApeFilterComponent} from "../components/code-ape-filter/code-ape-filter";
import {BusinessCategoriesFilterComponent} from "../components/business-categories-filter/business-categories-filter";

registerLocaleData(localeFr, 'fr');
@NgModule({
    declarations: [
        MyApp,
        FilterComponent,
        CodeApeFilterComponent,
        BusinessCategoriesFilterComponent,
        EnterprisesPage,
        EnterpriseDetailsPage,
        MenuPage,
        MapPage,
        ExportPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TagInputModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp,{
            menuType: 'push',
            platforms: {
                ios: {
                    menuType: 'overlay',
                }
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        FilterComponent,
        CodeApeFilterComponent,
        BusinessCategoriesFilterComponent,
        EnterprisesPage,
        EnterpriseDetailsPage,
        MenuPage,
        MapPage,
        ExportPage,
        TabsPage
    ],
    providers: [
        ApiFirmService,
        FilterLinkService,
        BusinessCategoriesFilterComponent,
        StatusBar,
        SplashScreen,
        File,
        FileTransfer,
        FileTransferObject,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
