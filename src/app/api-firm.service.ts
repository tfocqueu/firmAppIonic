import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ApiFirmService {
    static BASE_URL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&rows=500&start=0';
    static BASE_URL_MAP = 'https://public.opendatasoft.com/explore/embed/dataset/sirene/map/?q=';

    constructor(private http: HttpClient) {
    }

    listEnterprise = [];
    parameters = '';
    codeApe = '';
    categ = '';
    dep = '';
    municipality = '';
    creationDate = '';
    legalstatus = '';
    workforce = '';
    totalrevenue = '';
    region = '';
    bool=false;
    nbResult: number;
    private loadNbResultSource = new Subject<number>();
    loadNbResultReceived$ = this.loadNbResultSource.asObservable();
    ind = 0;
    reset = false;
    private loadResetSource = new Subject<number>();
    loadResetReceived$ = this.loadResetSource.asObservable();
    private loadResetAllSource = new Subject<boolean>();
    loadResetAllReceived$ = this.loadResetAllSource.asObservable();

    /* Verifies if the value already exists in an array in filter */
    checkValue(value, array): Boolean {
        let status = false;
        for (let i = 0; i < array.length; i++) {
            const name = array[i];
            if (name === value) {
                status = true;
                break;
            }
        }
        return status;
    }

    resetAll(): void {
        this.reset = true;
        this.loadResetAllSource.next(this.reset);
    }

    /* #SEB Update this function with your parameters. And go to the enterprise.componenent.ts */
    /* this function return entreprises with the selected filter */
    /* params : */
    /* listCodeApe : the list of ape Code filter */

    /* listCateg : the list of  enterprise categ filter */
    getEnterpriseByParameters(listCodeApe = [], listCategEnt = [], listDepartmentEnt = [], listMunicipalityEnt = [],
                              listCreationYearEnt = [], listLegalStatusEnt = [], listWorkforceEnt = [],
                              listTotalRevenueEnt = [], listRegion = []): Observable<Object> {
        this.parameters = '&q='; // init the list of parameters
        this.addFilter(listCodeApe, 'apet700', this.codeApe);
        this.addFilter(listCategEnt, 'categorie', this.categ);
        this.addFilter(listDepartmentEnt, 'depet', this.dep);
        this.addFilter(listMunicipalityEnt, 'libcom', this.municipality);
        this.addFilter(listCreationYearEnt, 'dcren', this.creationDate);
        this.addFilter(listLegalStatusEnt, 'nj', this.legalstatus);
        this.addFilter(listWorkforceEnt, 'tefen', this.workforce);
        this.addFilter(listTotalRevenueEnt, 'tca', this.totalrevenue);
        this.addFilter(listRegion, 'libreg_new', this.region);
        return this.http.get(ApiFirmService.BASE_URL + this.parameters);
    }

    /* Update this function with your parameters. And go to the map.componenent.ts */
    /* this function return map value with the selected filter */
    /* params : */
    /* listCodeApe : the list of ape Code filter */

    /* listCateg : the list of  enterprise categ filter */
    getMapByParameters(listCodeApe = [], listCategEnt = [], listDepartmentEnt = [], listMunicipalityEnt = [],
                       listCreationYearEnt = [], listLegalStatusEnt = []): Observable<any> {
        this.parameters = '&q='; // init the list of parameters
        this.addFilter(listCodeApe, 'apet700', this.codeApe);
        this.addFilter(listCategEnt, 'categorie', this.categ);
        this.addFilter(listDepartmentEnt, 'depet', this.dep);
        this.addFilter(listMunicipalityEnt, 'libcom', this.municipality);
        this.addFilter(listCreationYearEnt, 'dcren', this.creationDate);
        this.addFilter(listLegalStatusEnt, 'nj', this.legalstatus);
        return this.http.get(ApiFirmService.BASE_URL_MAP + this.parameters);
    }

    getAllEnterprises(): Observable<Object> {
        return this.http.get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=base-sirene%40datanova&rows=10&start=50');
    }

    /* this function add filter */
    /* params : */
    /* list : the list of filter value */
    /* fieldName : the name of the field in the API */

    /* paramName : the variable string who concat params */
    addFilter(list, fieldName, paramName) {
        this.ind = 0;
        list.forEach((item, index) => {
            if (index !== 0) {
                paramName += '+OR+';
            }
            if (item !== '') {
                paramName += fieldName + ':';
                paramName += item;
                this.ind++;
            }
        });
        if (list.length > 0) {
            this.parameters += paramName;
            if (this.ind >= list.length) {
                this.parameters += '&';
            }

        }
    }
    updateNbResult(data) {
        this.nbResult = data;
        this.loadNbResultSource.next(this.nbResult);
    }
}
