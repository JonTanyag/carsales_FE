import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { SalesPerson } from '../models/sales-person';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Configuration } from './config';
import { PayloadModel } from '../models/payloadModel';

let carSalesServiceUrl = Configuration.serviceUrl;


@Injectable()
export class CarSalesService {
    private _customers: BehaviorSubject<Array<Customer>>;
    private _salesPerson: BehaviorSubject<Array<SalesPerson>>;

    private _dataStore: {
        customers: Array<Customer>;
        salesPerson: Array<SalesPerson>;
    };

    constructor(
        private http: HttpClient
    ) {
        this._dataStore = {
            customers: [],
            salesPerson: []
        };

        this._customers = new BehaviorSubject(this._dataStore.customers);
        this._salesPerson = new BehaviorSubject(this._dataStore.salesPerson);
    }

    get customers() {
        return this._customers.asObservable();
    }

    get salesPerson() {
        return this._salesPerson.asObservable();
    }

    getCustomers(): Observable<any> {
        return this.http.get(carSalesServiceUrl + Configuration.baseUrls.customer);
    }

    getSalesPerson(): Observable<any> {
        return this.http.get(carSalesServiceUrl + Configuration.baseUrls.sales)
    }

    assignSalesPerson(payload: PayloadModel){
        console.log('service: ', payload)
        console.log(carSalesServiceUrl + Configuration.baseUrls.sales)
        return this.http.post(carSalesServiceUrl + Configuration.baseUrls.sales, payload);
    }

}
