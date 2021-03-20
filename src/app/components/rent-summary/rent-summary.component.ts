import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { RentItem } from 'src/app/models/rentItem';
import { RentCartService } from 'src/app/services/rent-cart.service';

@Component({
  selector: 'app-rent-summary',
  templateUrl: './rent-summary.component.html',
  styleUrls: ['./rent-summary.component.css']
})
export class RentSummaryComponent implements OnInit {

  rentItems:RentItem[]=[];
  
  constructor(private rentCartService:RentCartService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getRentCart();
  }

  getRentCart(){
    this.rentItems = this.rentCartService.list();
  }

  removeFromRentCart(car:Car){
    this.rentCartService.removeFromRentCart(car);
    this.toastrService.error("Deleted",car.carDescription + " Deleted from RentCart")
  }
}
