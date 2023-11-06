import { Component } from '@angular/core';
import { BookPlaneService } from 'src/app/services/book-plane.service';
import { FormBuilder } from '@angular/forms';
import Airports from '../../../assets/data/departureAirports.json';
import { ALLAirports } from 'src/app/interfaces/allairports';
import { CityCoordinates } from 'src/app/interfaces/city-coordinates';
import coordinates from './../../../assets/data/cityCoordinates.json';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-fly-choice',
  templateUrl: './fly-choice.component.html',
  styleUrls: ['./fly-choice.component.scss'],
})
export class FlyChoiceComponent {
  airportsList: Array<string> = [];
  allAirportsArray!: ALLAirports[];
  allDepartureAirports: number = 0;
  arrival: string = '';
  availableArrivals: string[] = [];
  availableDepartures: string[] = [];
  dailyWeatherForecast: any = [];
  // dailyWeatherForecastDeparture: any = [];
  departure: string = '';
  oneAirport!: ALLAirports | undefined;
  weatherPlace: string = '';
  weatherPlaceBefore:string='';
  weatherPlaceCoordinates:CityCoordinates[]=[];

  constructor(
    private bookService: BookPlaneService,
    private readonly form: FormBuilder,
    private weatherService: WeatherApiService
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
      for (
        let j = 0;
        j < this.allAirportsArray[i].arrivalAirports.length;
        j++
      ) {
        if (
          !this.availableArrivals.includes(
            this.allAirportsArray[i].arrivalAirports[j]
          )
        ) {
          this.availableArrivals.push(
            this.allAirportsArray[i].arrivalAirports[j]
          );
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

  filterAvailableAirports(direction: string, chosedAirport: string) {
    if (chosedAirport !== '') {
      if (direction === 'departure') {
        if (chosedAirport !== this.departure) {
          this.oneAirport = this.allAirportsArray.find(
            (el: ALLAirports) => el.departureAirport === chosedAirport
          );

          if (this.oneAirport) {
            this.availableArrivals = this.oneAirport.arrivalAirports;
          }

          if (this.weatherPlace === this.departure) {
            this.weatherPlace = chosedAirport;
          }

          this.departure = chosedAirport;
          // this.flyChoiceService.setDeparture(this.departure);
        }
      } else if (direction === 'arrival') {
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
            this.availableDepartures.push(
              this.allAirportsArray[i].departureAirport
            );
          }
        }

        if (this.weatherPlace === this.arrival) {
          this.weatherPlace = chosedAirport;
        }

        this.arrival = chosedAirport;
        // this.flyChoiceService.setArrival(this.arrival);
      }
    }

    if(this.weatherPlace===''||this.weatherPlace!==this.weatherPlaceBefore){
      this.changeWeather(chosedAirport)
    }
  }

  changeWeather(city:string){
    
    if (city!==this.weatherPlaceBefore){
      this.dailyWeatherForecast=[];
      this.weatherPlaceCoordinates = coordinates.filter(
        (item:CityCoordinates) => item.airport === city
      );
      this.weatherService.weather(this.weatherPlaceCoordinates).subscribe({
        next: (data: any) => {
          this.dailyWeatherForecast.push({
            day: new Date(data.list[0].dt_txt).getDate(),
            date: new Date(data.list[0].dt_txt),
            temp: Math.round(data.list[0].main.feels_like),
            weather: data.list[0].weather[0].main,
          });

          for (let i = 1; i < data.list.length; i++) {
            if (
              new Date(data.list[i].dt_txt).getDate() !==
              this.dailyWeatherForecast[
                this.dailyWeatherForecast.length - 1
              ].day
            ) {
              this.dailyWeatherForecast.push({
                day: new Date(data.list[i].dt_txt).getDate(),
                date: new Date(data.list[i].dt_txt),
                temp: Math.round(data.list[i].main.feels_like),
                weather: data.list[i].weather[0].main,
              });
            }
          }
        },
        error: (err: any) => console.error(err),
      });
    }
    this.weatherPlaceBefore=city;
  }
}
