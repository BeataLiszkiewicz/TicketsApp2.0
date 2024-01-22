import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersListService } from 'src/app/services/users-list.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  incorrectLogin: boolean = false;
  incorrectdata: boolean = false;
  login: string = '';
  onlyLogin: boolean = false;
  password: string = '';

  constructor(
    private readonly router: Router,
    private dialogRef: MatDialog,
    private readonly UserService: UsersListService
  ) {}

  ngOnInit() {
    this.onlyLogin = this.UserService.onlyLogIn;
  }

  ngOnDestroy() {
    this.incorrectLogin = false;
    this.incorrectdata = false;
    this.UserService.changeOnlyLogIn(false);
  }
  continue(param: NgForm) {
    if (this.login !== '' && this.password !== '') {
      this.UserService.logIn([this.login, this.password]);

      if (this.UserService.oneUser.length > 0) {
        this.incorrectLogin = false;
        
        if (!this.onlyLogin) {
          this.router.navigate(['/summary']);
        }

        this.dialogRef.closeAll();
      } else {
        this.incorrectLogin = true;
      }
    } else if (param.valid === true) {
      this.UserService.createTemporaryUser(param.value);
      this.router.navigate(['/summary']);
      this.dialogRef.closeAll();
    } else {
      this.incorrectdata = true;
    }
  }

  create() {
    const createUser = this.dialogRef.open(CreateUserComponent, {
      disableClose: false,
      autoFocus: false,
      hasBackdrop: true,
      backdropClass: '',
      width: '90vw',
      maxWidth:'576px',
      height: '',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: '',
      },
    });
  }
}
