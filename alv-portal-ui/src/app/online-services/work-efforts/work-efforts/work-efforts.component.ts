import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import {
  ControlPeriod,
  WorkEffortForm,
  WorkEffortResult,
  WorkEffortStatus,
  WorkEffortType,
  WorkEffortWorkload
} from '../../../shared/backend-services/work-efforts/work-efforts.types';

@Component({
  selector: 'alv-work-efforts',
  templateUrl: './work-efforts.component.html',
  styleUrls: ['./work-efforts.component.scss']
})
export class WorkEffortsComponent implements OnInit {

  readonly SEARCH_QUERY_MAX_LENGTH = 1000;

  IconKey = IconKey;

  form: FormGroup;

  controlPeriods: ControlPeriod[];

  private today = new Date();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['']
    });

    this.controlPeriods = [
      {
        date: '2019-05-01',
        filePath: 'https://www.google.com',
        status: WorkEffortStatus.EDITED,
        type: WorkEffortType.DURING_UNEMPLOYMENT,
        workEfforts: [
          {
            company: {
              name: 'Example Company',
              city: 'Zurich',
              contactPerson: 'Some Dude',
              country: 'CH',
              email: 'mail@address.com',
              houseNumber: '22b',
              phone: '+41 33 322 34 41',
              street: 'Evergreen Terrace',
              url: 'www.example-company.com',
              zipCode: '8098'
            },
            date: '2019-05-24',
            form: WorkEffortForm.TELEPHONE,
            occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
            ravJob: false,
            results: [WorkEffortResult.PENDING, WorkEffortResult.INTERVIEW],
            workload: WorkEffortWorkload.FULL_TIME,
            status: WorkEffortStatus.EDITED,
            createdTime: '2019-05-17T13:17:41.981',
            updatedTime: '2019-05-17T13:17:41.981'
          }
        ]
      },
      {
        date: '2019-04-01',
        filePath: 'https://www.google.com',
        status: WorkEffortStatus.SENT,
        type: WorkEffortType.DURING_UNEMPLOYMENT,
        workEfforts: [
          {
            company: {
              name: 'Example Company',
              city: 'Zurich',
              contactPerson: 'Some Dude',
              country: 'CH',
              email: 'mail@address.com',
              houseNumber: '22b',
              phone: '+41 33 322 34 41',
              street: 'Evergreen Terrace',
              url: 'www.example-company.com',
              zipCode: '8098'
            },
            date: '2019-05-24',
            form: WorkEffortForm.TELEPHONE,
            occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
            ravJob: false,
            results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
            workload: WorkEffortWorkload.FULL_TIME,
            status: WorkEffortStatus.SENT,
            createdTime: '2019-05-17T13:17:41.981',
            updatedTime: '2019-05-17T13:17:41.981'
          }
        ]
      },
      {
        date: '2019-04-01',
        filePath: 'https://www.google.com',
        status: WorkEffortStatus.SENT,
        type: WorkEffortType.DURING_UNEMPLOYMENT,
        workEfforts: [
          {
            company: {
              name: 'Example Company',
              city: 'Zurich',
              contactPerson: 'Some Dude',
              country: 'CH',
              email: 'mail@address.com',
              houseNumber: '22b',
              phone: '+41 33 322 34 41',
              street: 'Evergreen Terrace',
              url: 'www.example-company.com',
              zipCode: '8098'
            },
            date: '2019-05-24',
            form: WorkEffortForm.TELEPHONE,
            occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
            ravJob: false,
            results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
            workload: WorkEffortWorkload.FULL_TIME,
            status: WorkEffortStatus.SENT,
            createdTime: '2019-05-17T13:17:41.981',
            updatedTime: '2019-05-17T13:17:41.981'
          }
        ]
      },
      {
        date: '2019-04-01',
        filePath: 'https://www.google.com',
        status: WorkEffortStatus.SENT,
        type: WorkEffortType.DURING_UNEMPLOYMENT,
        workEfforts: [
          {
            company: {
              name: 'Example Company',
              city: 'Zurich',
              contactPerson: 'Some Dude',
              country: 'CH',
              email: 'mail@address.com',
              houseNumber: '22b',
              phone: '+41 33 322 34 41',
              street: 'Evergreen Terrace',
              url: 'www.example-company.com',
              zipCode: '8098'
            },
            date: '2019-05-24',
            form: WorkEffortForm.TELEPHONE,
            occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
            ravJob: false,
            results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
            workload: WorkEffortWorkload.FULL_TIME,
            status: WorkEffortStatus.SENT,
            createdTime: '2019-05-17T13:17:41.981',
            updatedTime: '2019-05-17T13:17:41.981'
          }
        ]
      },
      {
        date: '2019-04-01',
        filePath: 'https://www.google.com',
        status: WorkEffortStatus.SENT,
        type: WorkEffortType.DURING_UNEMPLOYMENT,
        workEfforts: [
          {
            company: {
              name: 'Example Company',
              city: 'Zurich',
              contactPerson: 'Some Dude',
              country: 'CH',
              email: 'mail@address.com',
              houseNumber: '22b',
              phone: '+41 33 322 34 41',
              street: 'Evergreen Terrace',
              url: 'www.example-company.com',
              zipCode: '8098'
            },
            date: '2019-05-24',
            form: WorkEffortForm.TELEPHONE,
            occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
            ravJob: false,
            results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
            workload: WorkEffortWorkload.FULL_TIME,
            status: WorkEffortStatus.SENT,
            createdTime: '2019-05-17T13:17:41.981',
            updatedTime: '2019-05-17T13:17:41.981'
          }
        ]
      },
      {
        date: '2019-04-01',
        filePath: 'https://www.google.com',
        status: WorkEffortStatus.SENT,
        type: WorkEffortType.DURING_UNEMPLOYMENT,
        workEfforts: [
          {
            company: {
              name: 'Example Company',
              city: 'Zurich',
              contactPerson: 'Some Dude',
              country: 'CH',
              email: 'mail@address.com',
              houseNumber: '22b',
              phone: '+41 33 322 34 41',
              street: 'Evergreen Terrace',
              url: 'www.example-company.com',
              zipCode: '8098'
            },
            date: '2019-05-24',
            form: WorkEffortForm.TELEPHONE,
            occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
            ravJob: false,
            results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
            workload: WorkEffortWorkload.FULL_TIME,
            status: WorkEffortStatus.SENT,
            createdTime: '2019-05-17T13:17:41.981',
            updatedTime: '2019-05-17T13:17:41.981'
          }
        ]
      },
      {
        date: '2019-04-01',
        filePath: 'https://www.google.com',
        status: WorkEffortStatus.SENT,
        type: WorkEffortType.DURING_UNEMPLOYMENT,
        workEfforts: [
          {
            company: {
              name: 'Example Company',
              city: 'Zurich',
              contactPerson: 'Some Dude',
              country: 'CH',
              email: 'mail@address.com',
              houseNumber: '22b',
              phone: '+41 33 322 34 41',
              street: 'Evergreen Terrace',
              url: 'www.example-company.com',
              zipCode: '8098'
            },
            date: '2019-05-24',
            form: WorkEffortForm.TELEPHONE,
            occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
            ravJob: false,
            results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
            workload: WorkEffortWorkload.FULL_TIME,
            status: WorkEffortStatus.SENT,
            createdTime: '2019-05-17T13:17:41.981',
            updatedTime: '2019-05-17T13:17:41.981'
          }
        ]
      },
      {
        date: '2019-04-01',
        filePath: 'https://www.google.com',
        status: WorkEffortStatus.SENT,
        type: WorkEffortType.DURING_UNEMPLOYMENT,
        workEfforts: [
          {
            company: {
              name: 'Example Company',
              city: 'Zurich',
              contactPerson: 'Some Dude',
              country: 'CH',
              email: 'mail@address.com',
              houseNumber: '22b',
              phone: '+41 33 322 34 41',
              street: 'Evergreen Terrace',
              url: 'www.example-company.com',
              zipCode: '8098'
            },
            date: '2019-05-24',
            form: WorkEffortForm.TELEPHONE,
            occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
            ravJob: false,
            results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
            workload: WorkEffortWorkload.FULL_TIME,
            status: WorkEffortStatus.SENT,
            createdTime: '2019-05-17T13:17:41.981',
            updatedTime: '2019-05-17T13:17:41.981'
          }
        ]
      },
      {
        date: '2019-04-01',
        filePath: 'https://www.google.com',
        status: WorkEffortStatus.SENT,
        type: WorkEffortType.DURING_UNEMPLOYMENT,
        workEfforts: [
          {
            company: {
              name: 'Example Company',
              city: 'Zurich',
              contactPerson: 'Some Dude',
              country: 'CH',
              email: 'mail@address.com',
              houseNumber: '22b',
              phone: '+41 33 322 34 41',
              street: 'Evergreen Terrace',
              url: 'www.example-company.com',
              zipCode: '8098'
            },
            date: '2019-05-24',
            form: WorkEffortForm.TELEPHONE,
            occupation: 'SRF - Schweizer Radio und Fernsehen Systemadministrator Informatiker',
            ravJob: false,
            results: [WorkEffortResult.REJECTED, WorkEffortResult.EMPLOYED],
            workload: WorkEffortWorkload.FULL_TIME,
            status: WorkEffortStatus.SENT,
            createdTime: '2019-05-17T13:17:41.981',
            updatedTime: '2019-05-17T13:17:41.981'
          }
        ]
      }
    ];
  }

  onFilterClick() {
    alert('not implemented yet');
  }

  isCurrentControlPeriod(controlPeriod: ControlPeriod): boolean {
    const date = new Date(controlPeriod.date);
    return this.today.getFullYear() === date.getFullYear() && this.today.getMonth() === date.getMonth();
  }

}
