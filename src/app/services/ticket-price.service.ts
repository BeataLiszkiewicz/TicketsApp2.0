import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicketPriceService {
  ticketsPriceList: Array<number> = [];
  constructor() {}

  createPriceList(): void {
    this.ticketsPriceList = [];

    for (let i = 1; i <= 93; i++) {
      this.ticketsPriceList.push(
        Math.floor(Math.random() * (1000 - 300) + 300)
      );
    }
  }
}
