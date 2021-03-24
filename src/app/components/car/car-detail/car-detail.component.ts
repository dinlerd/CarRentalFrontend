  
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { CarImage } from 'src/app/models/car-image';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentCartService } from 'src/app/services/rent-cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car: Car;
  carDetail: CarDetail;
  images:CarImage[];
  dataLoaded = false;
  imageBasePath = environment.baseUrl;

  constructor(private carDetailService:CarDetailService, private carImageService:CarImageService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService,private rentCartService:RentCartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
        this.getImageDetail(params["carId"]);
      }
     
    });
  }

  getCarDetail(carId:number) {
    this.carDetailService.getCarDetail(carId).subscribe((response) => {
      this.carDetail = response.data;
      //console.log(this.carDetail.carImages);
      this.dataLoaded = true;
    });
  }

  getImageDetail(carId:number) {
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.images = response.data;
      console.log(this.images);
      this.dataLoaded = true;
    });
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }

  addToRentCart(car:Car){
    this.toastrService.success("Added ",car.carDescription + "added to RentCart")
    this.rentCartService.addToRentCart(car);
    this.dataLoaded = true;
    console.log(car);
  }
}
