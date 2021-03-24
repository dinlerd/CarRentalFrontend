import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-operations',
  templateUrl: './brand-operations.component.html',
  styleUrls: ['./brand-operations.component.css']
})
export class BrandOperationsComponent implements OnInit {

  brands: Brand[];

  constructor(
    private brandService: BrandService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  goToUpdateForm(brand: Brand) {
    this.router.navigate(['brand/update/' + brand.carBrandId]);
  }

  goToAddForm() {
    this.router.navigate(['brand/add']);
  }

  delete(brand: Brand) {
    this.brandService.deleteBrand(brand).subscribe((response) => {
      this.toastrService.success(response.message,"Delete Process Successful");
      this.getBrands();
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
