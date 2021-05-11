import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CustomerModel } from '../models/customer-model';
import { SalesPersonModel } from '../models/sales-person-model';


@Injectable({
    providedIn: 'root',
})

export class StoreService {
    $CustomerSubject = new BehaviorSubject<CustomerModel | null>(null);
    $SalesPersonSubject = new BehaviorSubject<SalesPersonModel | null>(null);
}