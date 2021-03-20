import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { RentCartService } from 'src/app/services/rent-cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  
  cars: Car[] = [];
  dataLoaded = false;
  filterText="";
  imageBasePath = environment.baseUrl;

  constructor(private carService: CarService, private activatedRoute:ActivatedRoute,private toastrService:ToastrService, private rentCartService:RentCartService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carColorId"] && params["carBrandId"]){
        this.getCarByFilter(params["carBrandId"],params["carColorId"]);
      }
      else if(params["carBrandId"]){
        this.getCarsByBrandId(params["carBrandId"])
      }
      else if(params["carColorId"]){
        this.getCarsByColorId(params["carColorId"])
      }
      else{
        this.getCars();
      }
    });
    
  }

  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrandId(brandId:number) {
    this.carService.getCarDetailsByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByColorId(colorId:number) {
  this.carService.getCarDetailsByColorId(colorId).subscribe(response=>{
    this.cars=response.data;
    this.dataLoaded = true;
  })
}

getCarByFilter(brandId:Number, colorId: Number) {
  this.carService.getCarByBrandAndColor(brandId,colorId).subscribe(response => {
    this.cars = response.data,
    this.dataLoaded = true
    if(this.cars.length == 0){
      this.toastrService.info('Car cannot be found', 'Search Result');
    }
  })
  
}

addToRentCart(car:Car){
  this.toastrService.success("Added ",car.carDescription + "added to RentCart")
  this.rentCartService.addToRentCart(car);
  console.log(car);
}
}
