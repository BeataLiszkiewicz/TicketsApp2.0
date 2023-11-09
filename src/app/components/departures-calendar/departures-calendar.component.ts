import { Component } from '@angular/core';
import { FromFlyChoiceService } from 'src/app/services/from-fly-choice.service';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
import { DataFromCalendarService } from 'src/app/services/data-from-calendar.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Calendar } from 'src/app/interfaces/calendar';
import { TicketPriceService } from 'src/app/services/ticket-price.service';

@Component({
  selector: 'app-departures-calendar',
  templateUrl: './departures-calendar.component.html',
  styleUrls: ['./departures-calendar.component.scss'],
})
export class DeparturesCalendarComponent {
  arrival$: string = '';
  calendar: Calendar[] = [];
  calendarMonth: number = 0;
  container: Array<number>=[];
  currencyRate: [number, string] = [1, 'PLN'];
  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  public data: any;
  departure$: string = '';
  emptyDays: number = 0;
  finalPrice: Array<any> = [];
  lastDay: number = 0;
  price: number = 0;
  priceList: Array<number> = [];
  pricePosition:number=0;
  storedCurrency: string | null = sessionStorage.getItem('currency');
  today: number = new Date().getDate();
  waiting: boolean = false;
  week: any = ['Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.', 'Sun.'];

  constructor(
    private flyChoiceService: FromFlyChoiceService,
    private exchangeService: ExchangeRateService,
    private dataServise: DataFromCalendarService,
    private dialogRef: MatDialog,
    private SpinnerService: SpinnerService,
    private priceService: TicketPriceService
  ) {}

  ngOnInit() {
    this.getDepartureAndArrival();

    if (this.storedCurrency !== null) {
      this.changeCurrency(this.storedCurrency);
    }

    this.priceList = this.priceService.ticketsPriceList;
    this.createDataForCalendar();

    console.log(this.calendar)
  }

  getDepartureAndArrival() {
    this.flyChoiceService.getArrival().subscribe({
      next: (el: string) => {
        this.arrival$ = el;
      },
      error: (err: any) => console.log(err),
    });
    this.flyChoiceService.getDeparture().subscribe({
      next: (el: string) => {
        this.departure$ = el;
      },
      error: (err: any) => console.log(err),
    });
  }

  changeCurrency(param: string) {
    if (param !== 'PLN') {
      this.waiting = true;
      this.exchangeService.exchanegeRate(param).subscribe({
        next: (data: any) => {
          this.currencyRate[0] = data.rates[0].mid;
          this.currencyRate[1] = data.code;
          this.waiting = false;
        },
        error: (err: any) => console.error(err),
      });
    } else {
      this.currencyRate[0] = 1;
      this.currencyRate[1] = 'PLN';
    }
  }

  createDataForCalendar() {
    // prepare base for calendar
    for (let i = 0; i < 3; i++) {
      this.calendar.push({
        year: this.currentYear,
        month: this.currentMonth,
        today: this.today,
        firstDayOfMonth: 0,
        days: [],
      });
    }

    // define year and month for calendar current+1 and curent+2
    switch (this.currentMonth) {
      case 11:
        this.calendar[2].year = this.currentYear + 1;
        this.calendar[1].month = this.currentMonth + 1;
        this.calendar[2].month = 1;
        break;
      case 12:
        this.calendar[1].year = this.currentYear + 1;
        this.calendar[2].year = this.currentYear + 1;
        this.calendar[1].month = 1;
        this.calendar[2].month = 2;
        break;
      default:
        this.calendar[1].month = this.currentMonth + 1;
        this.calendar[2].month = this.currentMonth + 2;
    }

    // get information about length of each month
    for (let i = 0; i < 3; i++) {
      this.lastDay = new Date(
        this.calendar[i].year,
        this.calendar[i].month,
        0
      ).getDate();
    }

    for (let i = 0; i < 3; i++) {
      this.lastDay = new Date(
        this.calendar[i].year,
        this.calendar[i].month,
        0
      ).getDate();
      // push empty "days" when month is not starting on Monday
      this.calendar[i].firstDayOfMonth = new Date(
        this.calendar[i].year,
        this.calendar[i].month - 1,
        1
      ).getDay();
      for (let j = 1; j < this.calendar[i].firstDayOfMonth; j++) {
        this.calendar[i].days.push(this.container);
      }
      // generate price for each day
      for (let k = 1; k < this.lastDay + 1; k++) {
        this.container = [
          k,
          this.priceList[this.pricePosition]
        ];
        this.calendar[i].days.push(this.container);
        this.container = [];

        this.pricePosition++
      }
    }

    // delete price from the past
    for (let i = 0; i < this.calendar[0].days.length; i++) {
      if (this.calendar[0].days[i][1] === undefined) {
        this.emptyDays += 1;
      }
    }
    for (let j = 0; j < this.emptyDays + (this.calendar[0].today - 1); j++) {
      this.calendar[0].days[j][1] = 0;
    }
  }

  // change month in a calendar
  changeMonth(param: number) {
    this.calendarMonth += param;
  }

  load() {
    this.SpinnerService.getData().subscribe((data: any) => {
      this.data = data;
    });
  }

  choseDate(param: any) {
    if (param[1] === '') {
      alert('Sorry, chosen date falls in the past.');
    } else {
      this.finalPrice = this.calendar[this.calendarMonth].days.filter(
        (el: any) => el[0] === param[0]
      );
      this.dataServise.setData({
        departureDate: new Date(
          this.calendar[this.calendarMonth].year,
          this.calendar[this.calendarMonth].month - 1,
          param[0]
        ),
        price: Math.round(this.finalPrice[0][1] / this.currencyRate[0]),
        currency: this.currencyRate[1],
      });

      sessionStorage.setItem('currency', this.currencyRate[1]);
    }
    this.dialogRef.closeAll();
  }
}
