import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44316/api/brands/getall';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }

  getBrandById(brandId: number): Observable<ItemResponseModel<Brand>>{
    return this.httpClient.get<ItemResponseModel<Brand>>(environment.apiUrl + "brands/getbybrandid?brandid=" + brandId);
  }

  addBrand(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "brands/add", brand);
  }

  updateBrand(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "brands/update", brand);
  }

  deleteBrand(brand: Brand) : Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "brands/delete", brand);
  }
}
