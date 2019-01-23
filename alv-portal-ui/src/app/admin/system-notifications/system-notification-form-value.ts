import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export interface SystemNotificationFormValue {
  title: string;
  text_de: string;
  text_fr: string;
  text_it: string;
  text_en: string;
  type: string;
  startDate: NgbDateStruct;
  startTimeHours: string;
  startTimeMinutes: string;
  endDate: NgbDateStruct;
  endTimeHours: string;
  endTimeMinutes: string;
  active: boolean;
}
