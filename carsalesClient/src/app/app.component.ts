import { Component } from '@angular/core';
import {CarSalesService} from '../app/shared/service/carsales.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CarSalesService]
})
export class AppComponent {
  title = 'carsalesClient';
}
