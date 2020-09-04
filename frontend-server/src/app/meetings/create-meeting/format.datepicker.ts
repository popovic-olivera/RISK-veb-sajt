import { NativeDateAdapter, MatDateFormats } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {

    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      let month: string = (date.getMonth() + 1).toString();
      let year = date.getFullYear();

      return `${day}.${month}.${year}`;
    }

    return date.toDateString();
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};