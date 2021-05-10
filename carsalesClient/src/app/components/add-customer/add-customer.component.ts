import { Component, OnInit } from '@angular/core';
import { PayloadModel } from '../../shared/models/payloadModel';
import { CarType, CarTypeMapping } from '../../shared/models/car-type';
import { CarSalesService } from '../../shared/service/carsales.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { CustomerModel } from 'src/app/shared/models/customer-model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  cars = CarType;
  payload = new PayloadModel;
  // carType = [
  //   "Not Specified",
  //   "Sports Car",
  //   "Family Car",
  //   "Tradie Vehicle",
  // ];
  carType = [
      {id: 0, name: "Sports Car"},
      {id: 1, name: "Family Car"},
      {id: 2, name: "Tradie Vehicle"},
      {id: 3, name: "Not Specified"},
    
  ]
  customerDataList: CustomerModel;
  customerForm!: FormGroup;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _carSalesService: CarSalesService
  ) {
    this.customerDataList = new CustomerModel;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.customerForm = this.fb.group({
      customer: ['', [Validators.required]],
      carType: [''],
      speaksGreek: [false]
    })

    this.customerForm.valueChanges.subscribe(newVal => console.log(newVal));
    console.log('PAYLOAD: ', this.payload)
  }
  onOptionsSelected(value: string){
    
    // this.payload.carType = CarType[value];
    console.log("the selected value is " + value);
  }
  assignSalesPerson() {
    console.log('PAYLOAD: ', this.payload)
    this._carSalesService.assignSalesPerson(this.payload)
    .subscribe(
      response => {
        this._carSalesService.getCustomers();
        console.log('SUCCESS: ', response);
        // this.showSuccess(response);
      },
      error => {
        console.log('ERROR: ',error);
        this._carSalesService.getCustomers().subscribe(
          cust => {
            this.customerDataList = cust;
            console.log('HAHAHAHAHA', this.customerDataList);
          },
          err => {
            console.log(err);
          }
        );
        // this.showSuccess(response);
      });


  }

  showSuccess(message: string){
    this.toastr.success(message)
    this._carSalesService.getCustomers();
  }

  
}
