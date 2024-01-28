import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import listOfCities from '../../../assets/data/allCities.json';
import menu from '../../../assets/data/menu.json';
import crew from '../../../assets/data/crew.json';
import { Menu } from 'src/app/interfaces/menu';
import { BookPlaneService } from 'src/app/services/book-plane.service';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  fromEvent,
  interval,
} from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('justFly', [
      state('start', style({ rotate: '0deg' })),
      state(
        'fly',
        style({
          transform: 'translate(0vw, -270vh)',
          scale: 0.5,
          rotate: '-45deg',
          transformOrigin: 'top left',
        })
      ),
      transition('*=>start', animate('800ms')),
      transition('start=>fly', animate('3000ms')),
    ]),
  ],
})
export class HomeComponent {
  cityList: any;
  cityName: string = 'Antalya';
  cityNumber: number = 1;
  clickToBook: boolean = false;
  crewCollection!: Array<object>;
  crewToggle: any;
  cityPosition!: Number;
  crewPosition: Array<string> = ['Fly attendant', 'Ground crew', 'Pilot'];
  flyStart: string = '';
  interval: any;
  intervalWorks: boolean = false;
  intervalSubscription: Subscription = new Subscription();
  picturePosition!: number;
  placePicture: string = 'assets/pictures/Antalya.jpg';
  placePictureAgain: string = 'assets/pictures/Antalya.jpg';
  planeMenu!: Menu[];
  screenSize!:number;
  upArrowVisible:boolean=false;

  @ViewChild('homeContainer', {static:true})
  homeContainer!:ElementRef;

  @ViewChild('upArrow', {static:true})
  upArrow!:ElementRef;

  @ViewChild('destinationBackground', { static: true })
  destinationBackground!: ElementRef;

  @ViewChild('foodMenu', { static: true })
  foodMenu!: ElementRef;

  @ViewChild('crew', { static: true })
  crew!: ElementRef;

  @ViewChild('insidePlane', { static: true })
  insidePlane!: ElementRef;

  constructor(private bookService: BookPlaneService, private router: Router) {}

  ngOnInit() {
    this.bookService.setBookingButton(false)
    this.changeCityBackground();
    this.cityList = listOfCities;
    this.planeMenu = menu;
    this.makeCrewCollection();
    this.bookService.getHover().subscribe({
      next: (el: any) => {
        this.clickToBook = el;
      },
      error: (err: any) => console.log(err),
    });

    this.bookService.getFlying().subscribe({
      next: (el: any) => {
        if(el==='start'){
          this.bookPlane();
        }
      },
      error: (err: any) => console.log(err),
    });

    this.screenSize=this.homeContainer.nativeElement.getBoundingClientRect().bottom-this.homeContainer.nativeElement.getBoundingClientRect().top
    
  }

  ngOnDestroy(){
    this.bookService.setBookingButton(true)
    this.flyStart='';
    this.clickToBook = false;
  }

  changeCityBackground() {
    this.intervalSubscription = fromEvent(window, 'scroll').subscribe({
      next: (res: any) => {
        this.picturePosition =
          this.homeContainer.nativeElement.getBoundingClientRect().top;
          
        if (this.picturePosition===0){
          this.upArrowVisible=false
        }else{
          this.upArrowVisible=true
        }  

        if (
          !this.intervalWorks &&
          this.picturePosition < -this.screenSize &&
          this.picturePosition > -((this.screenSize+40)*2)
        ) {
          this.interval = setInterval(() => {
            this.cityName = '';
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
          (this.picturePosition > -this.screenSize || this.picturePosition < -((this.screenSize+40)*2))
        ) {
          clearInterval(this.interval);
          this.interval = null;
          this.intervalWorks = false;
        }
      },
    });
  }

  goToCity() {
    this.destinationBackground.nativeElement.scrollIntoView();
  }
  goToFood() {
    this.foodMenu.nativeElement.scrollIntoView();
  }

  goToCrew() {
    this.crew.nativeElement.scrollIntoView();
  }

  seeInside() {
    this.insidePlane.nativeElement.scrollIntoView();
  }

  makeCrewCollection() {
    this.crewCollection = crew
      .filter((person) => this.crewPosition.includes(person.position))
      .map((persona) => ({
        image: `assets/pictures/crew/${persona.name}.jpg`,
        thumbImage: `assets/pictures/crew/${persona.name}.jpg`,
        title: `${persona.name}, ${persona.position} for ${persona.experience}`,
        alt: persona.name,
      }));
  }

  choseCrew() {
    this.crewPosition = this.crewToggle;
    if (this.crewPosition.length === 0) {
      this.crewPosition = ['Fly attendant', 'Ground crew', 'Pilot'];
    }
    this.makeCrewCollection();
  }

  fly(direction: string) {
    if (direction === 'on') {
      this.clickToBook = true;
      this.bookService.setHover(true);
    } else {
      this.clickToBook = false;
      this.bookService.setHover(false);
    }
  }

  bookPlane() {
    this.flyStart = 'start';
    this.clickToBook = true;
    setTimeout(() => {
      this.flyStart = 'fly';
    }, 800);
    setTimeout(() => {
      this.router.navigate(['/flyChoice']);
    }, 2200);
  }

  goUp(){
    this.homeContainer.nativeElement.scrollIntoView();
  }
}
