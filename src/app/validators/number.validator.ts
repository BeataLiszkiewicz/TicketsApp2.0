import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function numberValidator(): ValidatorFn{
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value){
      return null
    }

    const isNumeric = /[0-9]/.test(value) 

    return isNumeric?null:{appContainNumber:true}
  }
}