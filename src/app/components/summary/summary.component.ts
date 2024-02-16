import { Component, ViewChildren, QueryList } from '@angular/core';
import { BookPlaneService } from 'src/app/services/book-plane.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { Flight } from 'src/app/interfaces/flight';
import { Router } from '@angular/router';
import { PlaneService } from 'src/app/services/plane.service';
import FlyDistance from '../../../assets/data/flyDistance.json';
import { Subscription, fromEvent } from 'rxjs';
import { UsersListService } from 'src/app/services/users-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  allDetails!: Flight;
  arrival!: string;
  distance!: any;
  extraLuggage!: number;
  extraLuggagePlus!: number;
  firstPerson!: Array<string>;
  flyDistance!: any;
  openId!: number;
  planeVisible: boolean = false;
  seatSubscription!: Subscription;
  totalCost: number = 0;



  constructor(
    private bookService: BookPlaneService,
    private passengerService: PassengerService,
    private planeService: PlaneService,
    private router: Router,
    private readonly userService: UsersListService
  ) {}

  @ViewChildren('seat') buttons!: QueryList<any>;

  ngOnInit() {
    this.bookService.setBookingButton(true);
    this.bookService.setUserButton(false);
    this.allDetails = this.passengerService.returnDetails();
    this.firstPerson = this.userService.getFirstperson();
    this.allDetails.passengers[0].name = this.firstPerson[0];
    this.allDetails.passengers[0].surname = this.firstPerson[1];
    this.availableLuggageType();

    this.arrival = this.passengerService.getOptionDetails('to');
    this.flyDistance = FlyDistance;

    if (this.arrival) {
      this.distance = this.flyDistance[0][this.arrival];
    }

    this.calculateTotalCost('first');


  }

  ngOnDestroy() {
    this.passengerService.flightDetailsUpdate(this.allDetails);
    this.bookService.setUserButton(true);
  }

  go() {
    console.log(this.allDetails);
  }

  availableLuggageType() {
    switch (this.allDetails.currency) {
      case 'PLN':
        this.extraLuggage = 150;
        this.extraLuggagePlus = 175;
        break;
      case 'EUR':
        this.extraLuggage = 33;
        this.extraLuggagePlus = 39;
        break;
      case 'USD':
        this.extraLuggage = 35;
        this.extraLuggagePlus = 41;
        break;
    }
  }

  choseSeat(position: number) {
    this.planeVisible = true;
    this.openId = position;
    console.log(position);
    this.seatSubscription = fromEvent(
      document.getElementsByClassName('seat'),
      'click'
    ).subscribe({
      next: (el: any) => {
        this.allDetails.passengers[position].seat = el.target.innerHTML;

        if (el.target.name === 'clear') {
          el.target.name = 'checked';
        } else {
          this.allDetails.passengers.every((person, index) => {
            if (person.seat === el.target.innerHTML) {
              person.seat = '';
              if (position === index) {
                el.target.name = 'clear';
              }

              return false;
            }
            return true;
          });
        }
      },
      error: (err) => console.log('Wystąpił błąd', err),
    });

    
  }

  seatClicked() {
    this.planeVisible = false;
    setTimeout(() => {
      {
        this.seatSubscription!.unsubscribe();
      }
    }, 10);
  }

  addCost() {
    this.calculateTotalCost('optional');
  }

  calculateTotalCost(option: string) {
    this.totalCost = 0;
    for (let i = 0; i < this.allDetails.passengers.length; i++) {
      this.totalCost += this.allDetails.passengers[i].price;
      this.totalCost += Number(this.allDetails.passengers[i].luggage);
    }
  }

  changeName(position:number, value:string){
    this.allDetails.passengers[position].name=value
  }
  changeSurname(position:number, value:string){
    this.allDetails.passengers[position].surname=value
  }
}
