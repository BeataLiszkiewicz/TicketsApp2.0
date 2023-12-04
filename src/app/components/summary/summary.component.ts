import { Component } from '@angular/core';
import { BookPlaneService } from 'src/app/services/book-plane.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { Flight } from 'src/app/interfaces/flight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  allDetails!:Flight;
  extraLuggage!:number;
  extraLuggagePlus!:number;

  constructor(private bookService: BookPlaneService,
    private passengerService:PassengerService,
    private router: Router
    ){}

  ngOnInit(){
    this.bookService.setBookingButton(true);
    this.allDetails=this.passengerService.returnDetails();
    this.availableLuggageType();
  }

  go(){
    this.router.navigate(['/plane'])
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
}
