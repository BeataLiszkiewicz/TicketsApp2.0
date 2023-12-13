import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersList:Array<User>=[]

  constructor() { }

  createUser(user:User){
    this.usersList.push(user)
  }

  isUserCreated(){

  }

  isPasswordCorrect(){

  }
}
