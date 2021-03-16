import { Car } from "./car";
import { CarImage } from "./car-image";

export interface CarDetail{
    carId:number;
    carDescription:string;
    brandName:string;
    colorName:string;
    dailyPrice:number;
    modelYear:number;
    imagePath:string;
    carImageDate:Date;
    //carImage:CarImage[];
}