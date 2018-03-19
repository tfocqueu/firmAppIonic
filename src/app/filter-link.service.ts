import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FilterLinkService {
    private loadCodeApeSource = new Subject<[string]>();
    loadCodeApeReceived$ = this.loadCodeApeSource.asObservable();
    private loadCategEntSource = new Subject<[string]>();
    loadLoaderReceived$ = this.loadCategEntSource.asObservable();
    private loadDepartmentEntSource = new Subject<[string]>();
    loadDepartmentEntReceived$ = this.loadDepartmentEntSource.asObservable();
    private loadMunicipalityEntSource = new Subject<[string]>();
    loadMunicipalityEntReceived$ = this.loadMunicipalityEntSource.asObservable();
    private loadCreationYearEntSource = new Subject<[string]>();
    loadCreationDateEntReceived$ = this.loadCreationYearEntSource.asObservable();
    private loadLegalStatusEntSource = new Subject<[string]>();
    loadLegalStatusEntReceived$ = this.loadLegalStatusEntSource.asObservable();
    private loadWorkforceEntSource = new Subject<[string]>();
    loadWorkforceEntReceived$ = this.loadWorkforceEntSource.asObservable();
    private loadTotalRevenueEntSource = new Subject<[string]>();
    loadTotalRevenueEntReceived$ = this.loadTotalRevenueEntSource.asObservable();
    private loadRegionSource = new Subject<[string]>();
    loadRegionEntReceived$ = this.loadRegionSource.asObservable();
    private loadNbResultSource = new Subject<number>();
    loadNbResultReceived$ = this.loadNbResultSource.asObservable();
    private loadSearchSource = new Subject<string>();
    loadSearchEntReceived$ = this.loadSearchSource.asObservable();

    constructor() {
    }

    LoadCodeApe(codeApe): void {
        this.loadCodeApeSource.next(codeApe);
    }

    /* #SEB */
    LoadCategEnterprise(categEnt): void {
        this.loadCategEntSource.next(categEnt);
    }

    LoadDepartmentEntreprise(DepartmentEnt): void {
        this.loadDepartmentEntSource.next(DepartmentEnt);
    }

    LoadMunicipalityEntreprise(municipalityEnt): void {
        this.loadMunicipalityEntSource.next(municipalityEnt);
    }

    LoadCreationYearEntreprise(creationYearEnt): void {
        this.loadCreationYearEntSource.next(creationYearEnt);
    }

    LoadLegalStatusEntreprise(legalStatusEnt): void {
        this.loadLegalStatusEntSource.next(legalStatusEnt);
    }

    LoadWorkforceEntreprise(workforceEnt): void {
        this.loadWorkforceEntSource.next(workforceEnt);
    }

    LoadTotalRevenue(totalRevEnt): void {
        this.loadTotalRevenueEntSource.next(totalRevEnt);
    }

    LoadRegion(regionEnt): void {
        this.loadRegionSource.next(regionEnt);
    }
    LoadNbResult(nbResult): void {
        this.loadNbResultSource.next(nbResult);
    }
    LoadSearch(search): void {
        this.loadSearchSource.next(search);
    }
}
