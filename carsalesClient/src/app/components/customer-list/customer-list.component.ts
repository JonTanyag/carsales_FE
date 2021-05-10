import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/shared/models/customer-model';
import {Customer} from '../../shared/models/customer';
import {CarSalesService} from '../../shared/service/carsales.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customerDataList: CustomerModel;
  currentCustomer = null;
  currentIndex = -1;

  constructor(
    private _carSalesService: CarSalesService
  ) { 
    this.customerDataList = new CustomerModel;
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this._carSalesService.getCustomers()
    .subscribe(
      cust => {
        this.customerDataList = cust;
        console.log('HAHAHAHAHA', this.customerDataList);
      },
      err => {
        console.log(err);
      }
    )
  }

  refresh(): void {
    this.getCustomers();
    this.currentCustomer = null;
    this.currentIndex = -1;
  }
}
