import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UsersListService } from '../services/users-list.service';
import { catchError, map, take } from 'rxjs/operators';

@Directive({
  selector: '[appLoginCheck]',
  providers: [{    
    provide: NG_ASYNC_VALIDATORS,    
    useExisting: LoginCheckDirective,    
    multi: true  
  }]
})
export class LoginCheckDirective implements AsyncValidator{

  constructor(private userService: UsersListService){}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.checkLogin(control.value).pipe(
      take(1),
      map((isTaken:any) => (isTaken ? { appUserExist: true } : null)),
      catchError(() => of(null))
    );
    
}

}
