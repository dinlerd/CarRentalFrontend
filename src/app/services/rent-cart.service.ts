import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { RentItem } from '../models/rentItem';
import { RentItems } from '../models/rentItems';

@Injectable({
  providedIn: 'root'
})
export class RentCartService {

  constructor() { }

  addToRentCart(car:Car){
    let item = RentItems.find(r=>r.car.carId===car.carId);
    if(item){
      item.quantity+=1;
    }else{
      let rentItem = new RentItem();
      rentItem.car = car;
      rentItem.quantity = 1;
      RentItems.push(rentItem);
    }
  }

  removeFromRentCart(car:Car){
    let item:RentItem = RentItems.find(r=>r.car.carId===car.carId);
    RentItems.splice(RentItems.indexOf(item),1);
  }

  list():RentItem[]{
    return RentItems;
  }

}
