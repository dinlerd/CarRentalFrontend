import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarToUpdate } from 'src/app/models/carToUpdate';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-operations',
  templateUrl: './car-operations.component.html',
  styleUrls: ['./car-operations.component.css']
})
export class CarOperationsComponent implements OnInit {

  cars: CarToUpdate[] = [];

  constructor(
    private carService: CarService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getAllCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  goToUpdateForm(car: CarToUpdate) {
    this.router.navigate(['car/update/' + car.id]);
  }

  goToAddForm() {
    this.router.navigate(['car/add/']);
  }

  delete(car: CarToUpdate) {
    this.carService.delete(car).subscribe((response) => {
      this.toastrService.success(response.message,"Car deleted");
      this.getCars();
    },(responseError)=>{
      if(responseError.error.ValidationErrors.length>0)
      {
        console.log(responseError.error.ValidationErrors)
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
        }
      }
    })
  }

}
