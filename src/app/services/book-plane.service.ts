import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookPlaneService {

  constructor() { }
  bookPlane=new BehaviorSubject<string>('');
  letPlaneBooking=new BehaviorSubject<boolean>(false);
  mouseoverBooking = new BehaviorSubject<string>('');
  seeUser=new BehaviorSubject<boolean>(true);
  
  

  getHover() {
    return this.mouseoverBooking.asObservable();
  }

  setHover(el: any) {
    this.mouseoverBooking.next(el);
  }

  getFlying(){
    return this.bookPlane.asObservable();
  }

  setFlying(fly:string){
    this.bookPlane.next(fly)
  }

  getBookingButton(){
    return this.letPlaneBooking.asObservable();
  }

  setBookingButton(el:boolean){
    this.letPlaneBooking.next(el);
    
  }
  getUserButton(){
    return this.seeUser.asObservable();
  }

  setUserButton(el:boolean){
    this.seeUser.next(el);
    
  }
}
