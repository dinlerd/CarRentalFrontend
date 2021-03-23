import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalToAdd } from 'src/app/models/rentalToAdd';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  car:Car;
  customers:Customer[];
  rentals:Rental[]=[];
  startDate:Date;
  endDate:Date;
  userId:number;
  rentPrice:number = 0;
  rentalToAdd:RentalToAdd;
  customerId:number;
  rentable:Boolean = false;
  dataLoaded=false;
  carRented=false;

  constructor(private rentalService:RentalService, 
    private activatedRoute:ActivatedRoute, 
    private carService:CarService,
    private customerService:CustomerService, 
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getRentalDetailsByCarId(params["carId"]);
      }
    });
    //this.getRentals();

    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
      }
    });
    this.getCustomer();
  }

  getCustomer(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      //this.dataLoaded = true;
    })
  }

  getCarDetailsByCarId(carId:number) {
    this.carService.getCarDetail(carId).subscribe((response) => {
      this.car = response.data[0];
      console.log(this.car);
      this.dataLoaded=true;
    });
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{ 
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }

  getRentalsByCarId(carId:number){
    this.rentalService.getRentalsByCarId(carId).subscribe(response=>{
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }

  getRentalDetailsByCarId(carId:number){
    this.rentalService.getRentalDetailsByCarId(carId).subscribe(response=>{
      this.rentals=response.data;
      this.dataLoaded=true;
    })
  }

  addRental(rentalToAdd:RentalToAdd){
      this.rentalService.addRental(rentalToAdd);
      console.log(this.rentalToAdd);
      this.carRented=true;
  //    this.reloadComponent();
 
  }

  addRentalCheck(rentalToAdd:RentalToAdd){
    console.log("rentals length " + this.rentals.length)
    console.log("rentalToAdd rentDate " + rentalToAdd.rentDate)
    console.log("rentals last one returnDate " + this.rentals[this.rentals.length-1].returnDate)
    if(this.rentals.length>0 && rentalToAdd.rentDate > this.rentals[this.rentals.length-1].returnDate)
    {
      this.addRental(rentalToAdd);
      this.toastrService.success("Car Rented !","Success")
      
    }else{
      this.toastrService.error("Car is not available to rent between these dates","!")
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

    getSelectedCustomer(id: Number) {
      if (this.customerId == id){
        return true;
      }else
        return false;
    }

  calculatePrice(){
    if (this.customerId === undefined) {
      this.toastrService.warning('Please select customer!');
    } else if (this.startDate === undefined) {
      this.toastrService.warning('Lütfen Kira Başlangıç Tarihini seçin.');
    } else if (this.endDate === undefined) {
      this.toastrService.warning('Lütfen Kira Bitiş Tarihini seçin.');
    }else if(this.startDate && this.endDate){
      let endDate = new Date(this.endDate.toString())
      let startDate = new Date(this.startDate.toString())
      let endDay = Number.parseInt(endDate.getDate().toString())
      let endMonth = Number.parseInt(endDate.getMonth().toString())
      let endYear = Number.parseInt(endDate.getFullYear().toString())
      let startDay = Number.parseInt(startDate.getDate().toString())
      let startMonth = Number.parseInt(startDate.getMonth().toString())
      let startYear = Number.parseInt(startDate.getFullYear().toString())
      let result =  ((endDay - startDay) + ((endMonth - startMonth)*30) + ((endYear - startYear)*365) + 1) * this.car.dailyPrice
      if (result>0){
        this.rentalToAdd = {
          carId:this.car.carId,
          customerId:parseInt(this.customerId.toString()),
          rentDate:this.startDate,
          returnDate:this.endDate
        };
        console.log(result)
        this.rentPrice = result
        //this.setRentable()
      }else{
        this.rentPrice = 0
        this.toastrService.info("Car cannot be rented between these dates: " + this.startDate + " and " + this.endDate,"!")
      }
    }
    else{
      this.rentPrice = 0
      this.toastrService.info("Car cannot be rented between these dates: " + this.startDate + " and " + this.endDate,"!")
    }
  }
}
