import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cardNumber:number;
  firstName:string;
  lastName:string;
  expirationDate:string;
  cVV:number;
  //rental:Rental;

  constructor(
    private rentalService:RentalService,
    private paymentService:PaymentService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      // if (params["rental"]) {
      //   this.rental = JSON.parse(params["rental"]);
      // }
      if (params["carId"]) {
        this.rentalService.getRentalDetailsByCarId(params["carId"]);
      }
    })
  }

  addPayment(){
    let newPayment: Payment = {
      cardNumber:this.cardNumber,
      firstName:this.firstName,
      lastName:this.lastName,
      expirationDate:this.expirationDate,
      cVV: +this.cVV
    }
    this.paymentService.addPayment(newPayment).subscribe(response => {
      this.toastrService.success(response.message,"Successful")
      this.toastrService.info("You are directed to main page","Thank you for payment");
      this.router.navigate(["cars/"]);
    },responseError => {
      console.log(responseError.error)
      this.toastrService.error(responseError.error,"Attention")
    });
    //this.rentalService.addRental(this.rental);
  }
}
