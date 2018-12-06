import { Component, Input } from '@angular/core';
import { Location } from '../../shared/backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-job-location',
  template: `
    <span *ngIf="location"
          [ngClass]="classes">
            {{ location.postalCode }} {{ location.city }}
      <ng-container *ngIf="location.cantonCode || location.countryIsoCode">
                ({{ location.cantonCode || location.countryIsoCode }})
            </ng-container>
        </span>
  `,
})
export class JobLocationComponent {

  @Input()
  location: Location;

  @Input()
  classes: string


}
