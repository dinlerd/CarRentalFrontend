import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router:Router
  ) { }

    ngOnInit(): void {
      this.createColorAddForm()
    }
    
    createColorAddForm() {
      this.colorAddForm = this.formBuilder.group({
        carColorName: ['', Validators.required]
      });
    }

  addColor(){
    if(this.colorAddForm.valid){
      let carModel =  Object.assign({},this.colorAddForm.value) 
      this.colorService.addColor(carModel).subscribe(response=>{
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
