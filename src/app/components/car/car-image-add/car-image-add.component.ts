import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})
export class CarImageAddComponent implements OnInit {

  imageAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, 
    private carImageService:CarImageService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createImageAddForm();
  }

  createImageAddForm(){
    this.imageAddForm = this.formBuilder.group({
      carId:["",Validators.required],
      imagePath:["",Validators.required],
      date:["",Validators.required],
    })
  }

  addImage(){
    if(this.imageAddForm.valid){
      let imageModel =  Object.assign({},this.imageAddForm.value) 
      console.log(imageModel)
      this.carImageService.addImage(imageModel).subscribe(response=>{
        this.toastrService.success(response.message,"Successful")
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
