import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    let filter = filterText?filterText.toLocaleLowerCase():null;
    let filteredBrands = value.filter(
      (p) => p.brandName.toLocaleLowerCase().indexOf(filter) !== -1
    );
    if (filteredBrands.length > 0) return filteredBrands;

    let filteredColors = value.filter(
      (p) => p.colorName.toLocaleLowerCase().indexOf(filter) !== -1
    );
    if (filteredColors.length > 0) return filteredColors;

    let filteredDescriptions = value.filter(
      (p) => p.carDescription.toLocaleLowerCase().indexOf(filter) !== -1
    );
    if (filteredDescriptions.length > 0) return filteredDescriptions;

    let filteredModelYears = value.filter((p) =>
      p.modelYear.toString().startsWith(filter)
    );
    if (filteredModelYears.length > 0) return filteredModelYears;

    let filteredDailyPrice = value.filter((p) =>
      p.dailyPrice.toString().startsWith(filter)
    );
    if (filteredDailyPrice.length > 0) return filteredDailyPrice;

    return value;
  }
    // return filterText?value.filter((c:Car)=>c.carDescription.toLocaleLowerCase().indexOf(filterText)!==-1):value;
  }




// let filteredBrands = value.filter(
//   (p) => p.brandName.toLocaleLowerCase().indexOf(filter) !== -1
// );
// if (filteredBrands.length > 0) return filteredBrands;

// let filteredColors = value.filter(
//   (p) => p.colorName.toLocaleLowerCase().indexOf(filter) !== -1
// );
// if (filteredColors.length > 0) return filteredColors;

// let filteredDescriptions = value.filter(
//   (p) => p.description.toLocaleLowerCase().indexOf(filter) !== -1
// );
// if (filteredDescriptions.length > 0) return filteredDescriptions;

// let filteredModelYears = value.filter((p) =>
//   p.modelYear.toString().startsWith(filter)
// );
// if (filteredModelYears.length > 0) return filteredModelYears;

// let filteredDailyPrice = value.filter((p) =>
//   p.dailyPrice.toString().startsWith(filter)
// );
// if (filteredDailyPrice.length > 0) return filteredDailyPrice;

// return value;

