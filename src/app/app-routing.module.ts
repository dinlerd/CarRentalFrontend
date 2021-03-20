import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:carBrandId", component:CarComponent},
  {path:"cars/color/:carColorId", component:CarComponent},
  {path: "car/details/:carId", component: CarDetailComponent },
  {path:"cars/filter/:carBrandId/:carColorId",component:CarComponent},
  {path: "car/rentals/:carId", component: RentalComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
