import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DateParserFormatter {

  parse(value: string): NgbDateStruct {
    const dateParts = value.split('.');
    return <NgbDateStruct>{
      day: parseInt(dateParts[0], 10),
      month: parseInt(dateParts[1], 10),
      year: parseInt(dateParts[2], 10)
    };
  }

  format(date: NgbDateStruct): string {
    return date ? `${date.day}.${date.month}.${date.year}` : '';
  }
}
