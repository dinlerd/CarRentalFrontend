import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarImageAddComponent } from './components/car/car-image-add/car-image-add.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:carBrandId", component:CarComponent},
  {path:"cars/color/:carColorId", component:CarComponent},
  {path: "car/details/:carId", component: CarDetailComponent },
  {path:"cars/filter/:carBrandId/:carColorId",component:CarComponent},
  {path: "car/rentals/:carId", component: RentalComponent },
  {path: "car/add", component: CarAddComponent },
  {path: "car/addCarImage", component: CarImageAddComponent },
  {path: "rental/payment/:carId", component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
