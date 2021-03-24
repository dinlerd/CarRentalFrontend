import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm: FormGroup;
  brand: Brand;
  brands:Brand[];
  dataLoaded:boolean=false;
  
  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carBrandId"]) {
        this.createBrandUpdateForm();
        this.getCurrentBrand(params["carBrandId"]);
        console.log(this.brandUpdateForm.get('carBrandId'))
        console.log(this.brandUpdateForm.get('carBrandName'))
      }
    });

    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded=true;
    });
  }

  getCurrentBrand(brandId: number){
    this.brandService.getBrandById(brandId).subscribe(response =>{
      this.brand = response.data;
      this.brandUpdateForm.get('carBrandId')?.setValue(this.brand.carBrandId);
      console.log(this.brand.carBrandId)
      this.brandUpdateForm.get('carBrandName')?.setValue(this.brand.carBrandName);
      console.log(this.brand.carBrandName)
    });
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      carBrandId: ["", Validators.required],
      carBrandName: ["", Validators.required]
    });
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      console.log("brandUpdateForm is Valid!")
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      console.log(brandModel)
      this.brandService.updateBrand(brandModel).subscribe(response => {
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
