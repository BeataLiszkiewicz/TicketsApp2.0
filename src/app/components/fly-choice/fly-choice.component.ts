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
  airportsList:Array<string>=[];
  allAirportsArray!: ALLAirports[];
  allDepartureAirports: number = 0;
  arrival:string='';
  availableArrivals: string[] = [];
  availableDepartures: string[] = [];
  departure:string='';

  constructor(
    private bookService: BookPlaneService,
    private readonly form: FormBuilder
  ) {}
  ngOnInit() {
    this.bookService.setBookingButton(true);
    this.allAirportsArray = Airports;
    this.setAirports();
    this.airportsList = [
      ...this.availableArrivals,
      ...this.availableDepartures,
    ];
  
  }

  setAirports() {
    for (let i = 0; i < this.allAirportsArray.length; i++) {
      this.availableDepartures.push(this.allAirportsArray[i].departureAirport);
      for (let j = 0; j < this.allAirportsArray[i].arrivalAirports.length; j++) {
        if (
          !this.availableArrivals.includes(
            this.allAirportsArray[i].arrivalAirports[j]
          )
        ) {
          this.availableArrivals.push(this.allAirportsArray[i].arrivalAirports[j]);
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

  filterAvailableAirports(direction:string, chosedAirport:string){
    
  }
}
