import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarToAdd } from 'src/app/models/carToAdd';
import { CarToUpdate } from 'src/app/models/carToUpdate';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  dataLoaded:boolean=false;
  carToUpdate:CarToUpdate;
  carId : number;
  carUpdateForm:FormGroup;
  brands:Brand[];
  colors:Color[];

  constructor(private formBuilder:FormBuilder, 
    private carService:CarService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        console.log("ngOnInit carId: " + params["carId"]);
        this.createCarUpdateForm();
        this.getCarById(params["carId"]);
        console.log("ngOnInit: " + this.carToUpdate);
        this.getBrands();
        this.getColors();
      }
      // if (params['carId']) {
      //   this.carId = parseInt(params['carId']);
      //   console.log(this.carId);
      // }
    });
    //this.createCarUpdateForm();
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      description:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      dailyPrice:["",Validators.required],
      modelYear:["",Validators.required],
    })
  }

  getCarById(carId:number) {
    console.log("GetCarById carId: "+ carId);
    this.carService.getCarById(carId).subscribe((response) => {
      this.carToUpdate = response.data;
      this.dataLoaded=true;
      // this.carUpdateForm.get('description')?.setValue(this.carToUpdate.description);
      // console.log(this.carToUpdate.description)
      // this.carUpdateForm.get('modelYear')?.setValue(this.carToUpdate.modelYear);
      // console.log(this.carToUpdate.modelYear)
      console.log("GetCarById: "+ this.carToUpdate);
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded=true;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel =  Object.assign({id:this.carToUpdate.id},this.carUpdateForm.value) 
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Update Process Successful")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0)
        {
          console.log(responseError.error.ValidationErrors)
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
          }
        }
      })
    }else{
      this.toastrService.error("Form is missing","Attention")
    }
  }


}
