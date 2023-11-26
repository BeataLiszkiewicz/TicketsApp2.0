import { Injectable } from '@angular/core';
import { Flight } from '../interfaces/flight';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  flightDetails:any={
    from:"",
    to:"",
    date:new Date(1999),
    price:0,
    currency:"",
    passengers:[]
  };


  constructor() { }

  fillDetails(option:string, detail:any){
    this.flightDetails[option]=detail;
  }

  returnDetails():Flight{
    return this.flightDetails;
  }
}
