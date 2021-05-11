import { Component, OnDestroy, OnInit } from '@angular/core';
import { PayloadModel } from '../../shared/models/payloadModel';
import { CarType } from '../../shared/models/car-type';
import { CarSalesService } from '../../shared/service/carsales.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { CustomerModel } from 'src/app/shared/models/customer-model';
import { StoreService } from '../../shared/service/store.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit, OnDestroy {

  cars = CarType;
  payload = new PayloadModel;
  carType = [
    { id: 0, name: "Sports Car" },
    { id: 1, name: "Family Car" },
    { id: 2, name: "Tradie Vehicle" },
    { id: 3, name: "Not Specified" },

  ]
  customerDataList: CustomerModel;
  customerForm!: FormGroup;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _carSalesService: CarSalesService,
    private _storeService: StoreService
  ) {
    this.customerDataList = new CustomerModel;
    this.createForm();
  }

  ngOnDestroy(): void {
    this._storeService.$CustomerSubject.unsubscribe();
  }

  ngOnInit(): void {
    
  }

  createForm() {
    this.customerForm = this.fb.group({
      customer: ['', [Validators.required]],
      carType: [''],
      speaksGreek: [false]
    })

    // this.customerForm.valueChanges.subscribe(newVal => console.log(newVal));
  }

  assignSalesPerson() {
    this._carSalesService.assignSalesPerson(this.payload)
      .subscribe(
        response => {
          this.getCustomers();
          this.getSalesPersons();
          console.log('SUCCESS: ', response);
          this.showSuccess(response);
        },
        error => {
          console.log('ERROR: ', error);

        });
  }

  showSuccess(message: string) {
    console.log('TOAST')
    this.toastr.success(message)
  }

  getCustomers() {
    this._carSalesService.getCustomers()
      .subscribe(
        cust => {
          this._storeService.$CustomerSubject.next(cust);
          console.log('Customer Details: ', cust);
        },
        err => {
          console.log(err);
        }
      )
  }

  getSalesPersons() {
    this._carSalesService.getSalesPerson()
      .subscribe(
        cust => {
          this._storeService.$SalesPersonSubject.next(cust);
          console.log('Sales Person Details: ', cust);
        },
        err => {
          console.log(err);
        }
      )
  }
}
