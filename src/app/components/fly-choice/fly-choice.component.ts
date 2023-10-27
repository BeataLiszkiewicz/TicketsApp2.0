import { Component } from '@angular/core';
import { BookPlaneService } from 'src/app/services/book-plane.service';
import { FormBuilder } from '@angular/forms';
import Airports from '../../../assets/data/departureAirports.json';
import { ALLAirports } from 'src/app/interfaces/allairports';

@Component({
  selector: 'app-fly-choice',
  templateUrl: './fly-choice.component.html',
  styleUrls: ['./fly-choice.component.scss'],
})
export class FlyChoiceComponent {
  allAirports!: ALLAirports[];
  allDepartureAirports: number = 0;
  availableArrivals: string[] = [];
  availableDepartures: string[] = [];

  constructor(
    private bookService: BookPlaneService,
    private readonly form: FormBuilder
  ) {}
  ngOnInit() {
    this.bookService.setBookingButton(true);
    this.allAirports = Airports;
    this.setAirports();
  }

  setAirports() {
    for (let i = 0; i < this.allAirports.length; i++) {
      this.availableDepartures.push(this.allAirports[i].departureAirport);
      console.log(this.allAirports[i].departureAirport);
      for (let j = 0; j < this.allAirports[i].arrivalAirports.length; j++) {
        if (
          !this.availableArrivals.includes(
            this.allAirports[i].arrivalAirports[j]
          )
        ) {
          this.availableArrivals.push(this.allAirports[i].arrivalAirports[j]);
        }
      }
      this.sort(this.availableArrivals);
      this.sort(this.availableDepartures);
      this.allDepartureAirports = this.availableDepartures.length;
    }
  }

  sort(param: Array<string>) {
    param.sort();
  }
}
