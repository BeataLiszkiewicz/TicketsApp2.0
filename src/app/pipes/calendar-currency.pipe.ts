import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calendarCurrency'
})
export class CalendarCurrencyPipe implements PipeTransform {

  transform(value: number, exchangeRate: number): string {
    if (value){
      if (exchangeRate===1){
        return `${value}`
      }else{
        return `${Math.round(value/exchangeRate)}`
      }
    }else{
      return ''
    }
  }

}
