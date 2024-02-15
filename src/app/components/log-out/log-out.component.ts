import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersListService } from 'src/app/services/users-list.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss'],
})
export class LogOutComponent {
  constructor(private authService:AuthenticationService,
    private userService:UsersListService) {}

  logOut(){
    this.authService.changeAuthentication(false)
    this.userService.logOut()
  }
}
