import { Component, OnInit } from '@angular/core';
import { SalesPersonModel } from 'src/app/shared/models/sales-person-model';
import {CarSalesService} from '../../shared/service/carsales.service';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.scss']
})
export class SalesPersonListComponent implements OnInit {

  salesPersonDataList: SalesPersonModel;
  currentSalesPerson = null;
  currentIndex = -1;

  constructor(
    private _carSalesService: CarSalesService
  ) { 
    this.salesPersonDataList = new SalesPersonModel;
  }

  ngOnInit(): void {
    this.getSalesPerson();
  }

  getSalesPerson(): void {
    this._carSalesService.getSalesPerson()
    .subscribe(
      cust => {
        this.salesPersonDataList = cust;
        console.log('sales persons', this.salesPersonDataList);
      },
      err => {
        console.log(err);
      }
    )
  }

  refresh(): void {
    this.getSalesPerson();
    this.currentSalesPerson = null;
    this.currentIndex = -1;
  }

}
