import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLogged:boolean=false;

  constructor() { }

  changeAuthentication(param:boolean){
    this.isLogged=param
  }

  isAuthenticated(){
    return this.isLogged
  }
}
