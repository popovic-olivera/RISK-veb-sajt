import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serbianDate'
})
export class SerbianDatePipe implements PipeTransform {

  transform(dateStr: string | Date): string {
    let date: Date;
    if (dateStr instanceof Date) {
      date = dateStr;
    } else {
      date = new Date(dateStr);
    }
    let newDate = date.getDate() + '. ';

    const month = date.getMonth();
    switch (month) {
      case 0: newDate += 'Januar ';
              break;
      case 1: newDate += 'Februar ';
              break;
      case 2: newDate += 'Mart ';
              break;
      case 3: newDate += 'April ';
              break;
      case 4: newDate += 'Maj ';
              break;
      case 5: newDate += 'Jun ';
              break;
      case 6: newDate += 'Jul ';
              break;
      case 7: newDate += 'Avgust ';
              break;
      case 8: newDate += 'Septembar ';
              break;
      case 9: newDate += 'Oktobar';
              break;
      case 10: newDate += 'Novembar ';
               break;
      case 11: newDate += 'Decembar ';
               break;
    }

    return newDate + date.getFullYear() + '.';
  }

}
