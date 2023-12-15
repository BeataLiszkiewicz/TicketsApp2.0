import { Directive } from '@angular/core';
import { AbstractControl,NG_VALIDATORS,ValidationErrors, Validator } from '@angular/forms';
import { specialCharacterValidator } from '../validators/specialCharacter.validator';

@Directive({
  selector: '[appSpecialCharacter]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting:SpecialCharacterDirective,
    multi: true}
  ]
})
export class SpecialCharacterDirective implements Validator {

  constructor() { }

  validate  (control: AbstractControl): ValidationErrors | null {
    
    return specialCharacterValidator()(control)
  }

}
