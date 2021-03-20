import { Time } from "@angular/common";

export interface RentalToAdd{
    id?:number;
    carId:number;
    customerId?:number;
    rentDate?:Date;
    //rentStartDate:Date;
    //rentEndDate?:Date;
    returnDate?:Date;
    //totalRentPrice?:number;
}