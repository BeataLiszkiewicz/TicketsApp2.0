import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function specialCharacterValidator(): ValidatorFn{
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value){
      return null
    }

    const specialCharacter = /[!?~'@#$%^&*()-_+={};:"<>,.]/.test(value) 

    
    return specialCharacter?null:{appSpecialCharacter:true}
  }
}