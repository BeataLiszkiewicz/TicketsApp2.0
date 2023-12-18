import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { UsersListService } from 'src/app/services/users-list.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  passwordAgain:any="";

  constructor(private dialogRef2: MatDialog,
    private readonly usersService:UsersListService){}

  haveUser(userInfo:NgForm){
    this.usersService.createUser(userInfo.value)
    this.dialogRef2.closeAll();
  }

  close(){
    this.dialogRef2.closeAll();
  }

}
