import { Component } from '@angular/core';
import { BookPlaneService } from 'src/app/services/book-plane.service';
import { FormBuilder } from '@angular/forms';
import Airports from '../../../assets/data/departureAirports.json';
import { ALLAirports } from 'src/app/interfaces/allairports';
import { CityCoordinates } from 'src/app/interfaces/city-coordinates';
import coordinates from './../../../assets/data/cityCoordinates.json';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { MatDialog } from '@angular/material/dialog';
import { DeparturesCalendarComponent } from '../departures-calendar/departures-calendar.component';
import { DataFromCalendarService } from 'src/app/services/data-from-calendar.service';
import { PassengerSelectionComponent } from '../passenger-selection/passenger-selection.component';
import { PassengerService } from 'src/app/services/passenger.service';
import { TicketPriceService } from 'src/app/services/ticket-price.service';
import { Router } from '@angular/router';
import { UsersListService } from 'src/app/services/users-list.service';
import { LogInComponent } from '../log-in/log-in.component';

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
  clearCalendar: boolean = false;
  dailyWeatherForecast: any = [];
  dataFromCalendar: any;
  departure: string = '';
  oneAirport!: ALLAirports | undefined;
  passengersNumber: number = 0;
  weatherPlace: string = '';
  weatherPlaceBefore: string = '';
  weatherPlaceCoordinates: CityCoordinates[] = [];

  constructor(
    private bookService: BookPlaneService,
    private readonly form: FormBuilder,
    private weatherService: WeatherApiService,
    private dialogRef: MatDialog,
    private fromCalendarService: DataFromCalendarService,
    private passengerService: PassengerService,
    private ticketsService: TicketPriceService,
    private router: Router,
    private readonly userService:UsersListService
  ) {}
  ngOnInit() {
    this.bookService.setBookingButton(true);
    this.allAirportsArray = Airports;
    this.setAirports();
    this.airportsList = [
      ...this.availableArrivals,
      ...this.availableDepartures,
    ];
    this.passengerService.resetDetails()
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
      this.fromCalendarService.getData().subscribe({
        next: (el: any) => {
          this.dataFromCalendar = el;
        },
        error: (err: any) => console.log(err),
      });
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

          if (
            this.clearCalendar === true &&
            this.dataFromCalendar.departureDate !== undefined
          ) {
            this.dataFromCalendar.departureDate = undefined;
            this.ticketsService.createPriceList();
          }

          this.departure = chosedAirport;
          this.passengerService.fillDetails('from', this.departure);
        }
      } else if (direction === 'arrival') {
        if (this.departure !== '') {
          if (
            this.clearCalendar === true &&
            this.dataFromCalendar.departureDate !== undefined
          ) {
            this.dataFromCalendar.departureDate = undefined;
            this.ticketsService.createPriceList();
          }

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
        this.passengerService.fillDetails('to', this.arrival);
      }
      if (this.arrival !== '' && this.departure !== '') {
        this.clearCalendar = true;
      }
    }

    if (
      this.weatherPlace === '' ||
      this.weatherPlace !== this.weatherPlaceBefore
    ) {
      this.changeWeather(chosedAirport);
    }
  }

  changeWeather(city: string) {
    if (city !== this.weatherPlaceBefore) {
      this.dailyWeatherForecast = [];
      this.weatherPlaceCoordinates = coordinates.filter(
        (item: CityCoordinates) => item.airport === city
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
              this.dailyWeatherForecast[this.dailyWeatherForecast.length - 1]
                .day
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
    this.weatherPlaceBefore = city;
  }

  buy() {
    if (this.userService.oneUser.length>0){
      this.router.navigate(['/summary'])
    }else{
      this.openLogIn()
    }
    this.passengerService.createPassengersList();
    
  }

  openCalendar() {
    this.dialogRef.open(DeparturesCalendarComponent, {
      disableClose: false,
      autoFocus: false,
      hasBackdrop: true,
      backdropClass: '',
      maxWidth: '100vw',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
    });
  }

  openPassengerChoice() {
    const passengersInfo = this.dialogRef.open(PassengerSelectionComponent, {
      disableClose: false,
      autoFocus: false,
      hasBackdrop: true,
      backdropClass: '',
      maxWidth: '100vw',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
    });

    passengersInfo.afterClosed().subscribe((result) => {
      this.passengersNumber = result.adults + result.children + result.infants;
      this.passengerService.fillDetails('passengersTotal', {
        adults: result.adults,
        children: result.children,
        infants: result.infants,
      });
    });
  }

  openLogIn(){
    this.dialogRef.open(LogInComponent, {
      disableClose: false,
      hasBackdrop: true,
      backdropClass: '',
      width: '90vw',
      maxWidth:'576px',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
    });
  }
}
