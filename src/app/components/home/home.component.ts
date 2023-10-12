import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import listOfCities from '../../../assets/data/allCities.json';
import menu from '../../../assets/data/menu.json';
import { Menu } from 'src/app/interfaces/menu';
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
  cityNumber: number = 1;
  cityPosition!: Number;
  interval: any;
  intervalWorks: boolean = false;
  intervalSubscription: Subscription = new Subscription();
  planeMenu!:Menu[];
  picturePosition!: number;
  placePicture: string = 'assets/pictures/Antalya.jpg';
  placePictureAgain: string = 'assets/pictures/Antalya.jpg';

  @ViewChild('destinationBackground', { static: true })
  destinationBackground!: ElementRef;

  @ViewChild('foodMenu', { static: true })
  foodMenu!: ElementRef;

  @ViewChild('crew', { static: true })
  crew!: ElementRef;

  @ViewChild('insidePlane', { static: true })
  insidePlane!: ElementRef;

  ngOnInit() {
    this.changeCityBackground();
    this.cityList = listOfCities;
   this.planeMenu=menu;
  
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
            }, 1500);

            setTimeout(() => {
              this.placePictureAgain = `assets/pictures/${
                this.cityList[this.cityNumber].picture
              }.jpg`;

              if (this.cityNumber === 10) {
                this.cityNumber = 0;
              } else {
                this.cityNumber += 1;
              }
            }, 2500);

            
          }, 4000);

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

  goToCity(){
    this.destinationBackground.nativeElement.scrollIntoView();
  }
  goToFood(){
    this.foodMenu.nativeElement.scrollIntoView();
  }

  goToCrew(){
    this.crew.nativeElement.scrollIntoView();
  }

  seeInside(){
    this.insidePlane.nativeElement.scrollIntoView()
  }
}
