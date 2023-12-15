import { Directive } from '@angular/core';
import { AbstractControl,NG_VALIDATORS,ValidationErrors, Validator } from '@angular/forms';
import { numberValidator } from '../validators/number.validator';

@Directive({
  selector: '[appContainNumber]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting:ContainNumberDirective,
    multi: true}
  ],
})
export class ContainNumberDirective implements Validator{

  constructor() { }

  validate  (control: AbstractControl): ValidationErrors | null {
    
    return numberValidator()(control)
  }

}
