import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';
import { RentalToAdd } from '../models/rentalToAdd';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  //apiUrl="https://localhost:44316/api/rentals/getrentaldetails";
  
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = environment.apiUrl + "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(rental:RentalToAdd){
    let newPath = environment.apiUrl + "rentals/add"
    this.httpClient.post(newPath,rental).subscribe()
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = environment.apiUrl + "rentals/getallbycarid?carid=" + carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalDetailsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = environment.apiUrl + "rentals/getrentaldetailsbycarid?carid=" + carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

}
