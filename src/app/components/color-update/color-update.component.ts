import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm: FormGroup;
  color: Color;
  colors:Color[];
  dataLoaded:boolean=false;
  
  constructor(
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    // this.activatedRoute.params.subscribe((params) => {
    //   if (params['carColorId']) {
    //     this.getCurrentBrand(params['carColorId']);
    //     this.createColorUpdateForm();
    //   }
    // });
    this.activatedRoute.params.subscribe(params => {
      if (params["carColorId"]) {
        this.createColorUpdateForm();
        this.getCurrentColor(params["carColorId"]);
        console.log(this.colorUpdateForm.get('carColorId'))
        console.log(this.colorUpdateForm.get('carColorName'))
      }
    });

    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded=true;
    });
  }

  getCurrentColor(colorId: number){
    this.colorService.getColorById(colorId).subscribe(response =>{
      this.color = response.data;
      this.colorUpdateForm.get('carColorId')?.setValue(this.color.carColorId);
      console.log(this.color.carColorId)
      this.colorUpdateForm.get('carColorName')?.setValue(this.color.carColorName);
      console.log(this.color.carColorName)
    });
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      carColorId: ["", Validators.required],
      carColorName: ["", Validators.required]
    });
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      console.log("colorUpdateForm is Valid!")
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      console.log(colorModel)
      this.colorService.updateColor(colorModel).subscribe(response => {
        this.toastrService.success(response.message,"Update Process Successful");
        // this.router.navigate(['/']);
        // this.toastrService.info("Directing to main page");
      }, responseError=>{
        if(responseError.error.ValidationErrors.length>0)
        {
          console.log(responseError.error.ValidationErrors)
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
          }
        }
      })
    } else {
      this.toastrService.warning("Form is missing","Attention");
    }
  }


}
