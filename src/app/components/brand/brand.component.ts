import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand:Brand | null;;
  dataLoaded=false;
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded=true;
    });
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(this.currentBrand==brand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active list-group-item-success"
    }else{
      return "list-group-item list-group-item-success"
    }
  }

  clearCurrentBrand(){
    this.currentBrand = null;
  }
}

// brands: Brand[] = [];
// currentBrand: Brand =  {id:-1,brandName:""};
// dataLoaded = false;
// filterText:String;
// constructor(private brandService: BrandService) { }

// ngOnInit(): void {
//   this.getBrands();
// }

// getBrands(){
//     this.brandService.getBrands().subscribe(response => {
//     this.brands = response.data;
//     this.dataLoaded = true;
//   })
// }
// setCurrentBrand(brand:Brand){
//   this.currentBrand = brand;
// }
// removeCurrentBrand(){
//   this.filterText = "";
//   this.currentBrand = {id:-1,brandName:""};
// }
// getCurrentBrandClass(brand:Brand){
//   if(brand == this.currentBrand)
//   {
//     return "list-group-item cursorPointer active";
//   } else {
//     return "list-group-item cursorPointer";
//   }
// }
// getAllBrandClass(){
//   let defaultBrand:Brand ={id:-1,brandName:""};
//   if(this.currentBrand.id == defaultBrand.id){ 
//     return "list-group-item active cursorPointer";
//   } else {
//     return "list-group-item cursorPointer";
//   }
// }
