import { Injectable } from '@angular/core';
import { Flight } from '../interfaces/flight';
import { Passenger } from '../interfaces/flight';
import { People } from '../interfaces/flight';
import { UsersListService } from './users-list.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  flightDetails: any = {
    from: '',
    to: '',
    date: new Date(1999),
    month: 1,
    price: 0,
    currency: '',
    passengersTotal: {
      adults: 0,
      children: 0,
      infants: 0,
    },
    passengers: [],
  };

  loggedPerson: any = '';

  constructor(userService: UsersListService) {}

  fillDetails(
    option: string,
    detail: string | number | Date | Array<Passenger> | People
  ) {
    this.flightDetails[option] = detail;
  }

  returnDetails(): Flight {
    return this.flightDetails;
  }

  getOptionDetails(option: string) {
    return this.flightDetails[option];
  }

  createPassengersList() {
    
    for (let i = 0; i < this.flightDetails.passengersTotal.adults; i++) {
      this.flightDetails.passengers.push({
        name: '',
        surname: '',
        ticketClass: 'Adult',
        seat: '',
        luggage: 0,
        price: this.flightDetails.price,
      });
    }

    for (let j = 0; j < this.flightDetails.passengersTotal.children; j++) {
      this.flightDetails.passengers.push({
        name: '',
        surname: '',
        ticketClass: 'Child',
        seat: '',
        luggage: 0,
        price: Math.round(this.flightDetails.price * 0.75),
      });
    }

    for (let k = 0; k < this.flightDetails.passengersTotal.infants; k++) {
      this.flightDetails.passengers.push({
        name: '',
        surname: '',
        ticketClass: 'Infant',
        seat: '',
        luggage: 0,
        price: 0,
      });
    }

    this.flightDetails.month = this.flightDetails.date.getMonth();
  }

  flightDetailsUpdate(newDetails: Flight) {
    this.resetDetails();
    this.flightDetails = newDetails;
  }

  resetDetails() {
    this.flightDetails = {
      from: '',
      to: '',
      date: new Date(1999),
      month: 1,
      price: 0,
      currency: '',
      passengersTotal: {
        adults: 0,
        children: 0,
        infants: 0,
      },
      passengers: [],
    };

    
  }
}
