  
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/car-detail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  cars: Car[] = [];
  carDetail: CarDetail[];
  dataLoaded = false;
  imageBasePath = environment.baseUrl;

  constructor(private carDetailService:CarDetailService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCarDetail(params["carId"]);
      }
     
    });
  }

  getCarDetail(carId:number) {
    this.carDetailService.getCarDetail(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
    });
  }
}
