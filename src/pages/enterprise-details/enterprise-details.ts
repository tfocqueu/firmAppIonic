import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Enterprise } from "../../app/Model/enterprise";

@Component({
    selector: 'page-enterprise-details',
    templateUrl: 'enterprise-details.html',
})
export class EnterpriseDetailsPage {
    enterprise: Enterprise;

    constructor(public navParams: NavParams) {
        this.enterprise = navParams.data;
    }

}
