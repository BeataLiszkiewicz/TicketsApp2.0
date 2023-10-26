import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookPlaneService {

  constructor() { }

  mouseoverBooking = new BehaviorSubject<string>('');

  getHover() {
    return this.mouseoverBooking.asObservable();
  }

  setHover(el: any) {
    this.mouseoverBooking.next(el);
  }
}
