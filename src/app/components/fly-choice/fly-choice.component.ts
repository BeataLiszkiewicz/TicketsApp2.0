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
  availableArrivals: string[]= [];
  availableDepartures: string[] = [];
  departure:string='';
  oneAirport!:ALLAirports|undefined;

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
    if(direction==='departure'){
      
      if (chosedAirport !== '' && this.departure !== chosedAirport) {
        
        // this.dailyWeatherForecast = [];
        this.oneAirport = this.allAirportsArray.find(
          (el: any) => el.departureAirport === chosedAirport
        );

        if(this.oneAirport!==undefined){
          this.availableArrivals = this.oneAirport.arrivalAirports;
        }
        
  
        this.departure = chosedAirport;
        // this.flyChoiceService.setDeparture(this.departure);
  
        // get coordinates of departure airport
        // this.city = coordinates.filter((item) => item.airport === this.departure);
        // this.weatherService.weather(this.city).subscribe({
        //   next: (data: any) => {
        //     this.dailyWeatherForecast.push({
        //       day: new Date(data.list[0].dt_txt).getDate(),
        //       date: new Date(data.list[0].dt_txt),
        //       temp: Math.round(data.list[0].main.feels_like),
        //       weather: data.list[0].weather[0].main,
        //     });
        //     for (let i = 1; i < data.list.length; i++) {
        //       if (
        //         new Date(data.list[i].dt_txt).getDate() !==
        //         this.dailyWeatherForecast[this.dailyWeatherForecast.length - 1]
        //           .day
        //       ) {
        //         this.dailyWeatherForecast.push({
        //           day: new Date(data.list[i].dt_txt).getDate(),
        //           date: new Date(data.list[i].dt_txt),
        //           temp: Math.round(data.list[i].main.feels_like),
        //           weather: data.list[i].weather[0].main,
        //         });
        //       }
        //     }
        //   },
        //   error: (err: any) => console.error(err),
        // });
        // this.choiceOfWeatherPlace();
        // if (this.arrival===''||this.weatherPlace!==this.arrival){
        //   this.weatherPlace=param;
        // }
        
      }
    }else if(direction==='arrival'){
      // this.dailyWeatherForecastArrival = [];
    if (chosedAirport !== '') {
      if (this.departure !== '') {
        this.availableDepartures = [this.departure];
      } else {
        this.availableDepartures = [];
        
      }
      for (let i = 0; i < this.allDepartureAirports; i++) {
        if (
          this.allAirportsArray[i].arrivalAirports.includes(chosedAirport) &&
          !this.availableDepartures.includes(
            this.allAirportsArray[i].departureAirport
          )
        ) {
          this.availableDepartures.push(this.allAirportsArray[i].departureAirport);
        }
      }
      this.arrival = chosedAirport;
      // this.flyChoiceService.setArrival(this.arrival);

      // this.cityArrival = coordinates.filter(
      //   (item) => item.airport === this.arrival
      // );
      // this.weatherService.weather(this.cityArrival).subscribe({
      //   next: (data: any) => {
      //     this.dailyWeatherForecastArrival.push({
      //       day: new Date(data.list[0].dt_txt).getDate(),
      //       date: new Date(data.list[0].dt_txt),
      //       temp: Math.round(data.list[0].main.feels_like),
      //       weather: data.list[0].weather[0].main,
      //     });

      //     for (let i = 1; i < data.list.length; i++) {
      //       if (
      //         new Date(data.list[i].dt_txt).getDate() !==
      //         this.dailyWeatherForecastArrival[
      //           this.dailyWeatherForecastArrival.length - 1
      //         ].day
      //       ) {
      //         this.dailyWeatherForecastArrival.push({
      //           day: new Date(data.list[i].dt_txt).getDate(),
      //           date: new Date(data.list[i].dt_txt),
      //           temp: Math.round(data.list[i].main.feels_like),
      //           weather: data.list[i].weather[0].main,
      //         });
      //       }
      //     }
      //   },
      //   error: (err: any) => console.error(err),
      // });
      // this.choiceOfWeatherPlace();
    }
    
    // if (this.departure===''||this.weatherPlace!==this.departure){
    //   this.weatherPlace=param;
    // }

    }
  }
}
