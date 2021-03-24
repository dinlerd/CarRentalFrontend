import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private router:Router
  ) { }

    ngOnInit(): void {
      this.createBrandAddForm()
    }
    
    createBrandAddForm() {
      this.brandAddForm = this.formBuilder.group({
        carBrandName: ['', Validators.required]
      });
    }

  addBrand(){
    if(this.brandAddForm.valid){
      let carModel =  Object.assign({},this.brandAddForm.value) 
      this.brandService.addBrand(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Add Process Successful")
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
