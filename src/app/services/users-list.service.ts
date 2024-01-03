import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, Subscriber, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  oneUser: User[] = [];
  onlyLogIn: boolean = false;
  temporaryUser: any;
  usersList: User[] = [];

  constructor() {}

  createUser(user: User) {
    this.usersList.push({
      login: user.login,
      name: user.name,
      surname: user.surname,
      password: user.password,
      email: user.email,
    });
  }

  checkLogin(login: string): Observable<boolean> {
    const foundUser = this.usersList.find(
      (u: any) => u.login.toLowerCase() === login.toLowerCase()
    );
    const isFound = foundUser ? true : false;
    return new Observable((observe: Subscriber<boolean>) => {
      observe.next(isFound);
    }).pipe(delay(500));

    
  }

  changeOnlyLogIn(param: boolean) {
    this.onlyLogIn = param;
  }

  logIn(param: any) {
    this.oneUser = this.usersList.filter(
      (el: any) =>
        el.login.toLowerCase() === param[0].toLowerCase() &&
        el.password === param[1]
    );
    console.log(
      'one user:',
      this.oneUser,
      'temporary user:',
      this.temporaryUser
    );
  }

  createTemporaryUser(param: any) {
    this.temporaryUser = param;
    console.log(this.temporaryUser);
  }

  getFirstperson(): string[] {
    if (this.oneUser.length === 1) {
      return [this.oneUser[0].name, this.oneUser[0].surname];
    } else if (this.temporaryUser) {
      return [this.temporaryUser.name, this.temporaryUser.surname];
    }
    return [];
  }
}
