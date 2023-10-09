import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import listOfCities from '../../../assets/data/allCities.json';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';

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
  interval: number = 100000;
  placePicture: string = 'assets/pictures/Antalya.jpg';
  placePictureAgain: string = 'assets/pictures/Antalya.jpg';

  @ViewChild('destinationBackground', { static: true })
  destinationBackground!: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (
      this.destinationBackground.nativeElement.getBoundingClientRect().top <
        300 &&
      this.destinationBackground.nativeElement.getBoundingClientRect().top >
        -500
    ) {this.interval=1000
    }else{
      this.interval=100000
    }
  }

  ngOnInit() {
    
    console.log(this.interval);
    this.cityList = listOfCities;
    setInterval(() => {
      this.changeBackgroundCity(this.cityNumber);
    }, this.interval);
  }


  changeBackgroundCity(param: number) {
    this.placePictureAgain = `assets/pictures/${this.cityList[param].picture}.jpg`;

    setTimeout(() => {
      this.placePicture = `assets/pictures/${this.cityList[param].picture}.jpg`;
    }, 4000);

    if (this.cityNumber === 10) {
      this.cityNumber = 0;
    } else {
      this.cityNumber += 1;
    }
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(e:any) {
  //   console.log('window', e);
  // }
}
