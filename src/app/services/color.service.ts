import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = 'https://localhost:44316/api/colors/getall';
  
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl)
  }

  getColorById(colorId: number): Observable<ItemResponseModel<Color>>{
    return this.httpClient.get<ItemResponseModel<Color>>(environment.apiUrl + "colors/getbycolorid?colorid=" + colorId);
  }

  addColor(color: Color) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "colors/add", color);
  }

  updateColor(color: Color) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "colors/update", color);
  }

  deleteColor(color: Color) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "colors/delete", color);
  }
}
