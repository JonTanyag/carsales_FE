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

    constructor(
        private http: HttpClient
    ) { }

    getCustomers(): Observable<any> {
        return this.http.get(carSalesServiceUrl + Configuration.baseUrls.customer);
    }

    getSalesPerson(): Observable<any> {
        return this.http.get(carSalesServiceUrl + Configuration.baseUrls.sales)
    }

    assignSalesPerson(payload: PayloadModel): Observable<any> {
        console.log('service: ', payload)
        console.log(carSalesServiceUrl + Configuration.baseUrls.sales)
        return this.http.post(carSalesServiceUrl + Configuration.baseUrls.sales, payload, {responseType: 'text'});
    }

}
