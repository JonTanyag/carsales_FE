import { Component, OnDestroy, OnInit } from '@angular/core';
import { SalesPersonModel } from 'src/app/shared/models/sales-person-model';
import {CarSalesService} from '../../shared/service/carsales.service';
import { StoreService } from 'src/app/shared/service/store.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.scss']
})
export class SalesPersonListComponent implements OnInit, OnDestroy {

  salesPersonDataList: SalesPersonModel;
  currentSalesPerson = null;
  currentIndex = -1;

  constructor(
    private _carSalesService: CarSalesService,
    private _storeService: StoreService
  ) { 
    this.salesPersonDataList = new SalesPersonModel;
  }
  ngOnDestroy(): void {
    this._storeService.$SalesPersonSubject.unsubscribe();
  }

  ngOnInit(): void {
    this._storeService.$SalesPersonSubject.pipe(mergeMap(() => this._carSalesService.getSalesPerson())).subscribe(s => {
      this.salesPersonDataList = s;
    })
  }

}
