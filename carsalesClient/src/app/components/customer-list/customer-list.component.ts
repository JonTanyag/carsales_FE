import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CustomerModel } from 'src/app/shared/models/customer-model';
import { StoreService } from 'src/app/shared/service/store.service';
import {Customer} from '../../shared/models/customer';
import {CarSalesService} from '../../shared/service/carsales.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  customerDataList: CustomerModel;
  currentCustomer = null;
  currentIndex = -1;

  constructor(
    private _carSalesService: CarSalesService,
    private _storeService: StoreService
  ) { 
    this.customerDataList = new CustomerModel;
  }

  ngOnDestroy(): void {
    this._storeService.$CustomerSubject.unsubscribe();
  }

  ngOnInit(): void {
    // this.getCustomers();
    this._storeService.$CustomerSubject.pipe(mergeMap(() => this._carSalesService.getCustomers())).subscribe(list => {
      this.customerDataList = list;
    });
  }

}
