import { Component } from '@angular/core';
import { BookPlaneService } from 'src/app/services/book-plane.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { Flight } from 'src/app/interfaces/flight';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  allDetails!:Flight;
  constructor(private bookService: BookPlaneService,
    private passengerService:PassengerService
    ){}

  ngOnInit(){
    this.bookService.setBookingButton(true);
    this.allDetails=this.passengerService.returnDetails();
  }
}
