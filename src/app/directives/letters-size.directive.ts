import { Directive } from '@angular/core';
import { AbstractControl,NG_VALIDATORS,ValidationErrors, Validator } from '@angular/forms';
import { letterValidator } from '../validators/letter.validator';

@Directive({
  selector: '[appLettersSize]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting:LettersSizeDirective,
    multi: true}
  ],
})
export class LettersSizeDirective implements Validator {

  constructor() { }

  validate  (control: AbstractControl): ValidationErrors | null {
    
    return letterValidator()(control)
  }

}
