import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, Subscriber, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  
  usersList:User[]=[];
  
  constructor() { }

  createUser(user:User){
    this.usersList.push({
      login:user.login,
      name:user.name,
      surname:user.surname,
      password:user.password,
      email:user.email
    })

    console.log(this.usersList)
  }

  checkLogin(login: string): Observable<boolean> {
    const foundUser = this.usersList.find((u:any) => u.login.toLowerCase() === login.toLowerCase());
    const isFound = foundUser ? true : false;  return new Observable((observe: Subscriber<boolean>) => {
      observe.next(isFound);
    }).pipe(delay(500));
  }
}
