import { Component, Input } from '@angular/core';
import { Location } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-job-location',
  templateUrl: `./job-location.component.html`,
})
export class JobLocationComponent {

  @Input()
  location: Location;

}
