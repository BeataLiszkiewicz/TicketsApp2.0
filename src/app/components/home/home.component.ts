import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import listOfCities from '../../../assets/data/allCities.json';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  fromEvent,
  interval,
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  cityList: any;
  cityName: string = 'Antalya';
  cityNumber: number = 0;
  cityPosition!: Number;
  interval: any;
  intervalWorks: boolean = false;
  picturePosition!: number;
  intervalSubscription: Subscription = new Subscription();
  placePicture: string = 'assets/pictures/Antalya.jpg';
  placePictureAgain: string = 'assets/pictures/Antalya.jpg';

  @ViewChild('destinationBackground', { static: true })
  destinationBackground!: ElementRef;

  @ViewChild('homeContainer', { static: true })
  homeContainer!: ElementRef;

  ngOnInit() {
    this.changeCityBackground();
    this.cityList = listOfCities;
  }

  changeCityBackground() {
    this.intervalSubscription = fromEvent(window, 'scroll').subscribe({
      next: (res: any) => {
        this.picturePosition =
          this.destinationBackground.nativeElement.getBoundingClientRect().top;

        if (
          !this.intervalWorks &&
          this.picturePosition < 500 &&
          this.picturePosition > -800
        ) {
          this.interval = setInterval(() => {
            this.cityName="";
            this.placePicture = `assets/pictures/${
              this.cityList[this.cityNumber].picture
            }.jpg`;

            setTimeout(() => {
              this.cityName = this.cityList[this.cityNumber].city;
            }, 3000);

            setTimeout(() => {
              this.placePictureAgain = `assets/pictures/${
                this.cityList[this.cityNumber].picture
              }.jpg`;

              if (this.cityNumber === 10) {
                this.cityNumber = 0;
              } else {
                this.cityNumber += 1;
              }
            }, 4000);

            // setTimeout(() => {
            //   this.cityName = '';
            // }, 7900);
          }, 8000);

          this.intervalWorks = true;
        } else if (
          this.intervalWorks &&
          (this.picturePosition > 500 || this.picturePosition < -800)
        ) {
          clearInterval(this.interval);
          this.interval = null;
          this.intervalWorks = false;
        }
      },
    });
  }
}
