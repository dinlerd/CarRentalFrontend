import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  
  cars: Car[] = [];
  dataLoaded = false;
  imageBasePath = environment.baseUrl;

  constructor(private carService: CarService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carBrandId"]){
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
}
