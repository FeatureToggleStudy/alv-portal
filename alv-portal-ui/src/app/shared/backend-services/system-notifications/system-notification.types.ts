import {NgbDate} from "@ng-bootstrap/ng-bootstrap";

export interface SystemNotification {
  id: number;
  title: string;
  text_de: string;
  text_fr: string;
  text_it: string;
  text_en: string;
  type: string;
  startDate: NgbDate;
  endDate: NgbDate;
  active: boolean;
}
