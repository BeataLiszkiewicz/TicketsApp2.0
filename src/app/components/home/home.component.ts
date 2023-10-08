import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import listOfCities from '../../../assets/data/allCities.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  cityName: string = 'Antalya';
  cityNumber: number = 1;
  cityList: any;
  placePicture: string = 'assets/pictures/Antalya.jpg';
  placePictureAgain: string = 'assets/pictures/Antalya.jpg';

  ngOnInit() {
    this.cityList = listOfCities;
    setInterval(() => {
      this.changeBackgroundCity(this.cityNumber);
    }, 8000);
  }

  changeBackgroundCity(param: number) {
    this.cityName =""
    this.placePictureAgain = `assets/pictures/${this.cityList[param].picture}.jpg`;
    

    setTimeout(() => {
      this.cityName = this.cityList[param].city;
    },1000);

    setTimeout(() => {
      this.placePicture = `assets/pictures/${this.cityList[param].picture}.jpg`;
    },4000);

    setTimeout(() => {
      this.cityName = "";
      console.log('usunięcie nazwy miasta', this.cityList[param].city)
    }, 7900);

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
