import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandOperationsComponent } from './components/brand-operations/brand-operations.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarOperationsComponent } from './components/car-operations/car-operations.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarImageAddComponent } from './components/car/car-image-add/car-image-add.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorOperationsComponent } from './components/color-operations/color-operations.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
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
  {path: "car/operations", component: CarOperationsComponent },
  {path: "car/add", component: CarAddComponent },
  {path: "car/update/:carId", component: CarUpdateComponent },
  {path: "brand/update/:carBrandId", component: BrandUpdateComponent },
  {path: "brand/operations", component: BrandOperationsComponent },
  {path: "brand/add", component: BrandAddComponent },
  {path: "color/operations", component: ColorOperationsComponent },
  {path: "color/add", component: ColorAddComponent },
  {path: "color/update/:carColorId", component: ColorUpdateComponent },
  {path: "car/addCarImage", component: CarImageAddComponent },
  {path: "rental/payment/:carId", component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
