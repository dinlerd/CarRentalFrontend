import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from 'src/environments/environment';
import { CarToAdd } from '../models/carToAdd';
import { ResponseModel } from '../models/responseModel';
import { CarToUpdate } from '../models/carToUpdate';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44316/api/';

  constructor(private httpClient: HttpClient) {}

  getAllCars():Observable<ListResponseModel<CarToUpdate>>{
    let newPath=this.apiUrl+"cars/getall";
    return this.httpClient.get<ListResponseModel<CarToUpdate>>(newPath);
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails():Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + "cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarDetailsByBrandId(carBrandId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetailsbybrandid?brandid=" + carBrandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsByColorId(carColorId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetailsbycolorid?colorid=" + carColorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByBrandAndColor(brandId:Number,colorId:Number):Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl +`cars/getbybrandandcolor?brandId=${brandId}&colorid=${colorId}`;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetail(carId:number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetailsbyid?carid=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId:number): Observable<ItemResponseModel<CarToUpdate>> {
    let newPath = this.apiUrl + "cars/getbyid?id=" + carId;
    return this.httpClient.get<ItemResponseModel<CarToUpdate>>(newPath);
  }

  add(car:CarToAdd):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }

  update(car:CarToUpdate):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }

  delete(car:CarToUpdate):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/delete",car)
  }
}
