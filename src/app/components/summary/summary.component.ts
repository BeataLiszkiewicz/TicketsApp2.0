import { Component } from '@angular/core';
import { BookPlaneService } from 'src/app/services/book-plane.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { Flight } from 'src/app/interfaces/flight';
import { Router } from '@angular/router';
import { PlaneService } from 'src/app/services/plane.service';
import FlyDistance from '../../../assets/data/flyDistance.json';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  allDetails!:Flight;
  arrival!: string;
  distance!: any;
  extraLuggage!:number;
  extraLuggagePlus!:number;
  flyDistance!: any;
  planeVisible:boolean=false;

  constructor(private bookService: BookPlaneService,
    private passengerService:PassengerService,
    private planeService:PlaneService,
    private router: Router
    ){}

  ngOnInit(){
    this.bookService.setBookingButton(true);
    this.allDetails=this.passengerService.returnDetails();
    this.availableLuggageType();

    this.arrival = this.passengerService.getOptionDetails('to');
    this.flyDistance = FlyDistance;

    if (this.arrival) {
      this.distance = this.flyDistance[0][this.arrival];
    }
  }

  go(){
   
    console.log(this.allDetails)
  }

  availableLuggageType(){
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

  choseSeat(position:number){
    this.planeVisible=true;
    console.log(position)
  }

  seatClicked(){
    this.planeVisible=false;
  }
}
