import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-operations',
  templateUrl: './color-operations.component.html',
  styleUrls: ['./color-operations.component.css']
})
export class ColorOperationsComponent implements OnInit {

  colors: Color[];

  constructor(
    private colorService: ColorService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColor();
  }

  getColor() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  goToUpdateForm(color: Color) {
    this.router.navigate(['color/update/' + color.carColorId]);
  }

  goToAddForm() {
    this.router.navigate(['color/add']);
  }

  delete(color: Color) {
    this.colorService.deleteColor(color).subscribe((response) => {
      this.toastrService.success(response.message,"Color deleted");
      this.getColor();
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
